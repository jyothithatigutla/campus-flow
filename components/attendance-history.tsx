"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

import { getClassesForDate } from "@/lib/timetable-data";

interface AttendanceRecord {
    id: string;
    date: Date;
    subject: string;
    status: "PRESENT" | "ABSENT" | "LATE";
    time: string;
    location: string;
}

export function AttendanceHistory({ role = "student" }: { role?: "student" | "admin" }) {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [selectedYear, setSelectedYear] = React.useState("3rd Year");
    const [selectedSection, setSelectedSection] = React.useState("Section A");

    // Initialize with mock data from Dec 15 to Jan 30
    const [attendanceData, setAttendanceData] = React.useState<AttendanceRecord[]>(() => {
        const records: AttendanceRecord[] = [];
        const start = new Date(2025, 11, 15); // Dec 15, 2025
        const end = new Date(2026, 0, 30);   // Jan 30, 2026
        let uniqueCounter = 0; // Ensure truly unique IDs

        // Simple mock population
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            // Skip Sundays
            if (d.getDay() === 0) continue;

            // Add 1-2 random records per day for different subjects
            const subjects = ["NLP", "DL LAB", "AI", "BDA", "SNA"];
            const count = Math.floor(Math.random() * 2) + 2; // 2-3 records
            for (let i = 0; i < count; i++) {
                records.push({
                    id: `attendance-${format(new Date(d), 'yyyy-MM-dd')}-${uniqueCounter++}`,
                    date: new Date(d),
                    subject: subjects[Math.floor(Math.random() * subjects.length)],
                    status: Math.random() > 0.2 ? "PRESENT" : "ABSENT",
                    time: `${9 + i * 2}:30`,
                    location: "B-401"
                });
            }
        }
        return records;
    });

    const [isEditing, setIsEditing] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    // Filtered records based on selected date and timetable
    const displayedRecords = React.useMemo(() => {
        if (!date) return [];

        // Date Restriction: No attendance after Jan 30, 2026
        const cutoff = new Date(2026, 0, 30);
        if (date > cutoff) return [];

        // 1. Get subjects scheduled for this day
        const scheduledClasses = getClassesForDate(date, selectedYear, selectedSection);

        // 2. Map scheduled classes to attendance status
        return scheduledClasses.map(p => {
            const dateStr = format(date, "yyyy-MM-dd");
            const existing = attendanceData.find(r =>
                format(r.date, "yyyy-MM-dd") === dateStr && r.subject === p.subject
            );

            const record = existing || {
                id: `temp-${p.id}`,
                date: date,
                subject: p.subject,
                status: "PRESENT" as "PRESENT" | "ABSENT" | "LATE",
                time: p.time.split(" - ")[0],
                location: p.room
            };

            return { record, periodId: p.id };
        });
    }, [date, selectedYear, selectedSection, attendanceData]);

    const handleStatusToggle = (id: string, currentStatus: "PRESENT" | "ABSENT" | "LATE") => {
        const nextStatus = currentStatus === "PRESENT" ? "ABSENT" : "PRESENT"; // Simple toggle for now
        setAttendanceData(prev => prev.map(record =>
            record.id === id ? { ...record, status: nextStatus } : record
        ));
    };

    const handleSync = async () => {
        setLoading(true);
        // Simulate API Payload
        const payload = {
            userId: "student-123",
            updates: displayedRecords
                .filter(item => item.record.id.startsWith("attendance-") || item.record.id.startsWith("temp-")) // Include all
                .map(item => ({
                    id: item.record.id,
                    date: format(item.record.date, "yyyy-MM-dd"),
                    status: item.record.status
                }))
        };
        console.log("Syncing Attendance Updates:", payload);

        // Simulate Network Request
        setTimeout(() => {
            setLoading(false);
            setIsEditing(false); // Return to view mode
            console.log("Attendance Sync Successful!");
        }, 1500);
    };

    return (
        <div className="grid gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-1 border-0 shadow-lg shadow-blue-500/5 bg-white overflow-hidden h-fit sticky top-6">
                <CardHeader className="bg-[#0047AB] text-white p-6 justify-between flex-row items-center space-y-0">
                    <CardTitle className="flex items-center gap-3 text-xl font-heading">
                        <Clock className="w-6 h-6" /> Select Date
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-6">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        fromDate={new Date(2025, 11, 15)}
                        toDate={new Date(2026, 0, 30)}
                        className="rounded-md border-0 w-full flex justify-center"
                        classNames={{
                            day_today: "bg-blue-50 text-blue-600 font-bold",
                            day_selected: "bg-[#0047AB] text-white hover:bg-[#003087] hover:text-white rounded-xl shadow-lg shadow-blue-200",
                        }}
                    />

                    <div className="pt-4 border-t border-blue-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">Admin Actions</span>
                        </div>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={cn(
                                "w-full py-3 rounded-xl font-bold text-sm transition-all border-2",
                                isEditing
                                    ? "bg-blue-100 text-blue-700 border-blue-200"
                                    : "bg-white text-[#0047AB] border-blue-100 hover:bg-blue-50"
                            )}
                        >
                            {isEditing ? "Exit Edit Mode" : "Bulk Update Records"}
                        </button>
                    </div>
                </CardContent>
            </Card>

            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        {isEditing ? `Editing: ${date ? format(date, "MMMM yyyy") : 'All Records'}` : (date ? format(date, "PPPP") : "Records")}
                    </h2>
                    <Badge variant="outline" className="border-blue-100 bg-blue-50 text-blue-600 px-4 py-1">
                        {displayedRecords.length} Classes Found
                    </Badge>
                </div>

                <div className="space-y-4">
                    {displayedRecords.length > 0 ? (
                        displayedRecords.map(({ record, periodId }) => (
                            <AttendanceRecordItem
                                key={`${record.id}-${periodId}`}
                                record={record}
                                isEditing={isEditing}
                                onToggle={() => handleStatusToggle(record.id, record.status)}
                            />
                        ))
                    ) : (
                        <Card className="border-dashed border-2 bg-blue-50/20 p-12 text-center rounded-2xl transform transition-all hover:scale-[1.01]">
                            <div className="flex flex-col items-center gap-4">
                                <div className="p-4 bg-blue-100/50 rounded-full text-[#0047AB]">
                                    <Clock className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-blue-900 font-black text-xl mb-1">No classes scheduled</p>
                                    <p className="text-blue-400 font-medium">Enjoy your day off!</p>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>

                {isEditing && (
                    <div className="sticky bottom-6 flex justify-end">
                        <button
                            onClick={handleSync}
                            disabled={loading}
                            className="bg-[#0047AB] hover:bg-[#003087] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/30 flex items-center gap-3 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>Syncing Updates...</>
                            ) : (
                                <>
                                    <CheckCircle2 className="w-5 h-5" /> Sync All Changes
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function AttendanceRecordItem({ record, isEditing, onToggle }: { record: AttendanceRecord, isEditing?: boolean, onToggle?: () => void }) {
    const isPresent = record.status === "PRESENT";
    const isAbsent = record.status === "ABSENT";

    return (
        <Card className="border-0 shadow-sm bg-white hover:bg-blue-50/20 transition-all group overflow-hidden rounded-2xl">
            <div className="flex">
                <div className={cn(
                    "w-2 transition-all group-hover:w-3",
                    isPresent ? "bg-green-500" : isAbsent ? "bg-red-500" : "bg-orange-500"
                )} />
                <CardContent className="p-6 flex-1 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-3 justify-center md:justify-start mb-1">
                            {isEditing && <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">{format(record.date, "MMM dd")}</span>}
                            <h3 className="text-lg font-black text-slate-900 group-hover:text-[#0047AB] transition-colors">{record.subject}</h3>
                        </div>

                        <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-blue-400 font-medium">
                            <span className="flex items-center gap-1.5 font-bold">
                                <Clock className="w-3.5 h-3.5" /> {record.time}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" /> {record.location}
                            </span>
                        </div>
                    </div>

                    {isEditing ? (
                        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                            <button
                                onClick={onToggle}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
                                    isPresent
                                        ? "bg-green-100 text-green-700 shadow-sm"
                                        : "text-slate-400 hover:bg-slate-100"
                                )}
                            >
                                Present
                            </button>
                            <button
                                onClick={onToggle}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
                                    isAbsent
                                        ? "bg-red-100 text-red-700 shadow-sm"
                                        : "text-slate-400 hover:bg-slate-100"
                                )}
                            >
                                Absent
                            </button>
                        </div>
                    ) : (
                        <div className={cn(
                            "flex items-center gap-2 px-6 py-2 rounded-full font-black text-[10px] border tracking-widest uppercase",
                            isPresent
                                ? "bg-green-50 text-green-600 border-green-100 shadow-sm shadow-green-100"
                                : isAbsent
                                    ? "bg-red-50 text-red-600 border-red-100 shadow-sm shadow-red-100"
                                    : "bg-orange-50 text-orange-600 border-orange-100"
                        )}>
                            {isPresent ? <CheckCircle2 className="w-3.5 h-3.5" /> : isAbsent ? <XCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                            {record.status}
                        </div>
                    )}
                </CardContent>
            </div>
        </Card>
    );
}
