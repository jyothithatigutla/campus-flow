"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Faculty starts a session with their current location
 */
export async function startAttendanceSession(classId: string | null, lat: number, lon: number) {
    const supabase = await createClient();

    // Get current user (faculty)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, message: "Unauthorized" };

    // Set expiry to 30 minutes from now
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    const { data, error } = await supabase
        .from("attendance_sessions")
        .insert({
            faculty_id: user.id,
            timetable_id: classId,
            lat,
            lon,
            expires_at: expiresAt
        })
        .select()
        .single();

    if (error) {
        console.error("Error starting session:", error);
        return { success: false, message: error.message };
    }

    return { success: true, sessionId: data.id };
}

/**
 * Student scans and sends their location
 */
export async function markAttendance(sessionId: string, studentLat: number, studentLon: number) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, message: "Login required" };

    // 1. Fetch the session
    const { data: session, error: sessionError } = await supabase
        .from("attendance_sessions")
        .select("*")
        .eq("id", sessionId)
        .eq("is_active", true)
        .gt("expires_at", new Date().toISOString())
        .single();

    if (sessionError || !session) {
        return { success: false, message: "Invalid or expired session" };
    }

    // 2. Geofence Check (100m tolerance)
    const dist = getDistanceFromLatLonInKm(session.lat, session.lon, studentLat, studentLon) * 1000;
    if (dist > 100) {
        return { success: false, message: `Too far! (${Math.round(dist)}m away)` };
    }

    // 3. Record Attendance
    const { error: attendanceError } = await supabase
        .from("attendance")
        .insert({
            student_id: user.id, // Using user ID for now, adjust if using roll_no
            timetable_id: session.timetable_id,
            session_id: session.id,
            faculty_id: session.faculty_id,
            status: "PRESENT"
        });

    if (attendanceError) {
        if (attendanceError.code === "23505") {
            return { success: true, message: "Attendance already marked!" };
        }
        return { success: false, message: attendanceError.message };
    }

    revalidatePath("/student/attendance");
    return { success: true, message: "Attendance Marked!", dist: Math.round(dist) };
}

/**
 * Export attendance for a session as CSV
 */
export async function exportAttendanceAction(sessionId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("attendance")
        .select(`
            id,
            status,
            created_at,
            students (name, roll_no)
        `)
        .eq("session_id", sessionId);

    if (error) return { success: false, message: error.message };

    // Format CSV
    const header = "Roll No,Name,Status,Time\n";
    const rows = data.map(record => {
        const student = (record as any).students;
        return `${student?.roll_no || 'N/A'},${student?.name || 'Unknown'},${record.status},${new Date(record.created_at).toLocaleTimeString()}`;
    }).join("\n");

    return { success: true, data: header + rows };
}

// Helper: Haversine
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}
