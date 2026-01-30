"use server";

import { differenceInSeconds } from "date-fns";

// Mock Database in memory
// In production, use Supabase/Postgres
declare global {
    var activeSessions: Map<string, {
        classId: string;
        lat: number;
        lon: number;
        startTime: number;
    }>;
}

if (!global.activeSessions) {
    global.activeSessions = new Map();
}

/**
 * Faculty starts a session with their current location
 */
export async function startAttendanceSession(classId: string, lat: number, lon: number) {
    const sessionId = Math.random().toString(36).substring(7);
    global.activeSessions.set(sessionId, {
        classId,
        lat,
        lon,
        startTime: Date.now(),
    });
    console.log(`Session started: ${sessionId} at ${lat}, ${lon}`);
    return { success: true, sessionId };
}

/**
 * Student scans and sends their location
 */
export async function markAttendance(sessionId: string, studentLat: number, studentLon: number) {
    const session = global.activeSessions.get(sessionId);
    if (!session) {
        return { success: false, message: "Invalid or expired session" };
    }

    // Calculate distance (Haversine formula simplified for small distances or just simple euclidean for demo?)
    // Let's use a basic distance check (approx meters)
    const dist = getDistanceFromLatLonInKm(session.lat, session.lon, studentLat, studentLon) * 1000; // meters

    console.log(`Checking attendance: Dist ${dist}m. Allowed: 100m`);

    if (dist > 100) { // 100 meters tolerance
        return { success: false, message: `Too far! You are ${Math.round(dist)}m away.` };
    }

    return { success: true, message: "Attendance Marked!", dist: Math.round(dist) };
}

// Helper: Haversine
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}
