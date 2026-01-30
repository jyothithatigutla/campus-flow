"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { startAttendanceSession } from "@/app/actions/attendance";
import { Loader2, MapPin } from "lucide-react";
import { toast } from "sonner"; // Using sonner for toasts if available, or just mock

export function QRGenerator({ classId }: { classId: string }) {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [refreshTimer, setRefreshTimer] = useState(10);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (sessionId) {
            interval = setInterval(() => {
                setRefreshTimer((prev) => {
                    if (prev <= 1) {
                        // Refresh payload
                        setSessionId(Math.random().toString(36).substring(7));
                        return 10;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [sessionId]);

    const handleStart = () => {
        setLoading(true);
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lon: longitude });

                try {
                    // Simulate API call for session start
                    const mockSessionId = Math.random().toString(36).substring(7);
                    setSessionId(mockSessionId);
                    setRefreshTimer(10);
                } catch (e) {
                    console.error(e);
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                alert("Unable to retrieve your location");
                setLoading(false);
            }
        );
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4">
            {!sessionId ? (
                <div className="text-center space-y-4">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full w-fit mx-auto animate-pulse">
                        <MapPin className="w-8 h-8 text-purple-500" />
                    </div>
                    <p className="text-sm text-muted-foreground w-64">
                        We need your location to geofence the classroom.
                    </p>
                    <Button onClick={handleStart} disabled={loading} size="lg" className="rounded-full shadow-lg">
                        {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                        Start Attendance
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col items-center space-y-4 animate-in fade-in zoom-in duration-500">
                    <div className="relative group">
                        <div className="bg-white p-4 rounded-xl shadow-xl border-4 border-primary/20 relative z-10 transition-transform group-hover:scale-[1.02]">
                            <QRCodeSVG value={sessionId} size={256} className="rounded-lg" />
                        </div>
                        {/* Dynamic Progress Ring or indicator */}
                        <div className="absolute -inset-2 border-2 border-dashed border-primary/20 rounded-2xl animate-spin-slow pointer-events-none" />
                    </div>
                    <div className="text-center space-y-2">
                        <div className="flex flex-col items-center">
                            <h3 className="font-bold text-lg text-primary flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Scanning Active
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="h-1 w-24 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-purple-500 transition-all duration-1000 ease-linear"
                                        style={{ width: `${(refreshTimer / 10) * 100}%` }}
                                    />
                                </div>
                                <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest">{refreshTimer}s</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Session Payload: {sessionId}</p>
                        <p className="text-[10px] text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full inline-block font-bold">Anti-Spoofing Payload Active</p>
                    </div>
                    <Button variant="destructive" onClick={() => setSessionId(null)} className="rounded-xl shadow-lg">Stop Session</Button>
                </div>
            )}
        </div>
    );
}
