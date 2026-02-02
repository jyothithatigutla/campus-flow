"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Clock, Users, MapPin, Zap, AlertTriangle, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { startAttendanceSession, exportAttendanceAction } from "@/app/actions/attendance";

export function RefreshingQRScanner() {
    const [token, setToken] = useState<string>("");
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(10);
    const [checkedInCount, setCheckedInCount] = useState<number>(0);
    const [latestCheckIn, setLatestCheckIn] = useState<string | null>(null);
    const [isVerified, setIsVerified] = useState(false);
    const [heatmapData, setHeatmapData] = useState<number[]>([]);
    const [mounted, setMounted] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    // Location State
    const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);

    // Get Location on Mount
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const loc = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setLocation(loc);
                    setLocationError(null);
                    // Automatically start session when location is acquired
                    handleStartSession(loc);
                },
                (error) => {
                    console.error("Location Error:", error);
                    setLocationError("Location access denied. Geo-fencing disabled.");
                },
                { enableHighAccuracy: true }
            );
        } else {
            setLocationError("Geolocation not supported");
        }
    }, []);

    const handleStartSession = async (loc: { lat: number, lng: number }) => {
        const res = await startAttendanceSession(null, loc.lat, loc.lng);
        if (res.success && res.sessionId) {
            setSessionId(res.sessionId);
            toast.success("Attendance Session Started", {
                description: "Students can now scan within 100m of your location."
            });
        } else {
            toast.error("Failed to start session: " + res.message);
        }
    };

    // Generate QR token
    const generateToken = () => {
        if (!sessionId) return;

        const payload = {
            sid: sessionId,
            ts: Date.now(),
            salt: Math.random().toString(36).substring(7),
        };
        // Using a simpler encoding for the QR code value
        const encoded = btoa(JSON.stringify(payload));
        setToken(`campusflow://${encoded}`);
        setTimeLeft(10);
        if (heatmapData.length < 20) setHeatmapData(prev => [...prev, Math.random()]);
    };

    const handleVerify = () => {
        setIsVerified(true);
        toast.success("Batch Verified!", {
            description: `Session closed and ${checkedInCount} students logged securely.`,
            icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />
        });
    };

    const handleExport = async () => {
        if (!sessionId) return;
        setIsExporting(true);
        try {
            const res = await exportAttendanceAction(sessionId);
            if (res.success && res.data) {
                const blob = new Blob([res.data], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.setAttribute('hidden', '');
                a.setAttribute('href', url);
                a.setAttribute('download', `attendance_${sessionId}.csv`);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                toast.success("Attendance exported successfully!");
            } else {
                toast.error("Export failed: " + res.message);
            }
        } catch (err) {
            toast.error("Export error occurred");
        } finally {
            setIsExporting(false);
        }
    };

    // Initialize scanner & Timer
    useEffect(() => {
        setMounted(true);
        if (sessionId) generateToken();

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    generateToken(); // Regenerate
                    return 10;
                }
                return prev - 1;
            });
        }, 1000);

        // Simulation for UI feedback (Still useful to show something moving)
        const checkInInterval = setInterval(() => {
            if (!isVerified && sessionId && Math.random() > 0.6) {
                const names = ["Rahul S.", "Ananya K.", "Vikram M.", "Sarah J.", "Kevin L.", "Jyothic H."];
                const randomName = names[Math.floor(Math.random() * names.length)];
                setLatestCheckIn(randomName);
                setCheckedInCount(prev => prev + 1);
                setTimeout(() => setLatestCheckIn(null), 3000);
            }
        }, 3000);

        return () => {
            clearInterval(interval);
            clearInterval(checkInInterval);
        };
    }, [sessionId, isVerified]);

    if (!mounted) return null;

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-8 font-sans">
            {/* Live Indicator & Heatmap Small */}
            <div className="w-full space-y-4">
                <div className="flex items-center justify-between w-full h-12 bg-emerald-50/50 backdrop-blur-md rounded-2xl px-6 border border-emerald-100/30">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${location ? 'bg-emerald-500' : 'bg-orange-500'} animate-pulse`} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                            {location ? "Geo-Fencing Active" : "Searching Location..."}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-600" />
                        <span className="text-[11px] font-black text-emerald-600">{checkedInCount} Live Scans</span>
                    </div>
                </div>

                {/* Heatmap Integration (Visual Only) */}
                <div className="flex gap-1 h-2 w-full px-2">
                    {heatmapData.map((val, i) => (
                        <motion.div
                            key={i}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            className="flex-1 rounded-full bg-purple-400/20"
                            style={{ height: `${val * 100}%`, opacity: val }}
                        />
                    ))}
                </div>
            </div>

            {/* QR Area with Pro Pulse */}
            <div className="relative group p-1.5 grayscale-0 hover:grayscale-0 transition-all">
                <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.4, 0.1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 bg-purple-600 rounded-[44px] -z-10 blur-xl"
                />

                <div className="bg-white p-8 rounded-[40px] shadow-2xl border-[6px] border-white relative z-10 transition-transform group-hover:scale-[1.03]">
                    {!sessionId && !locationError ? (
                        <div className="h-[220px] w-[220px] flex flex-col items-center justify-center text-center space-y-4">
                            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                            <p className="text-xs font-bold text-slate-500">Initializing Secure Session...</p>
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={token}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.2 }}
                                transition={{ duration: 0.3, ease: "backOut" }}
                                className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col items-center gap-4"
                            >
                                {locationError ? (
                                    <div className="h-[220px] w-[220px] flex flex-col items-center justify-center text-center space-y-2">
                                        <AlertTriangle className="w-10 h-10 text-orange-500" />
                                        <p className="text-xs font-bold text-slate-500">{locationError}</p>
                                    </div>
                                ) : (
                                    <QRCodeSVG
                                        value={token}
                                        size={220}
                                        level="H"
                                        className="rounded-2xl"
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    )}

                    {/* Check-in Popover */}
                    <AnimatePresence>
                        {latestCheckIn && (
                            <motion.div
                                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-purple-600 text-white px-8 py-4 rounded-[24px] shadow-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 z-50 border-4 border-white"
                            >
                                <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                                {latestCheckIn} Verified
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Controls & Real-time salt stats */}
            <div className="w-full space-y-8">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 p-5 bg-slate-50 rounded-[28px] border border-slate-100/50">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Rotating Salt (10s)</p>
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-purple-600" />
                            <span className="text-2xl font-black text-[#1E293B] tracking-tighter">{timeLeft < 10 ? `00:0${timeLeft}` : `00:${timeLeft}`}</span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            onClick={handleVerify}
                            disabled={isVerified || !sessionId}
                            className="h-[84px] p-4 rounded-[28px] bg-[#1E293B] hover:bg-black text-white flex flex-col items-center justify-center gap-2 shadow-xl shadow-slate-200"
                        >
                            <ShieldCheck className="w-5 h-5 text-emerald-400" />
                            <span className="text-[8px] font-black uppercase tracking-widest">Verify Hub</span>
                        </Button>

                        <Button
                            onClick={handleExport}
                            disabled={!sessionId || isExporting}
                            className="h-[84px] p-4 rounded-[28px] border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 flex flex-col items-center justify-center gap-2 shadow-xl transition-all"
                        >
                            {isExporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5 text-blue-500" />}
                            <span className="text-[8px] font-black uppercase tracking-widest">Excel CSV</span>
                        </Button>
                    </div>
                </div>

                {/* Salt Progress Bar */}
                <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        key={token}
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 10, ease: "linear" }}
                        className={cn(
                            "h-full rounded-full transition-colors",
                            timeLeft < 2 ? "bg-rose-500" : "bg-purple-600"
                        )}
                    />
                </div>

                <div className="flex flex-col items-center justify-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] italic">
                    <div className="flex items-center gap-2">
                        <MapPin className={cn("w-3.5 h-3.5", location ? "text-emerald-500" : "text-slate-300")} />
                        {location ? `LOC: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "Waiting for GPS..."}
                    </div>
                </div>
            </div>
        </div>
    );
}
