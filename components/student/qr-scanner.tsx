"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { motion } from "framer-motion";
import { markAttendance } from "@/app/actions/attendance";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle, MapPin } from "lucide-react";

export function QRScanner() {
    const [scanResult, setScanResult] = useState<string | null>(null); // Session ID
    const [status, setStatus] = useState<"IDLE" | "HOLDING" | "VERIFYING" | "SUCCESS" | "ERROR">("IDLE");
    const [message, setMessage] = useState("");
    const [holdProgress, setHoldProgress] = useState(0);

    useEffect(() => {
        if (status === "IDLE") {
            const scanner = new Html5QrcodeScanner(
                "reader",
                {
                    fps: 20,
                    qrbox: { width: 250, height: 250 },
                    supportedScanTypes: [0], // 0 == Html5QrcodeScanType.SCAN_TYPE_CAMERA
                    showTorchButtonIfSupported: true
                },
                false
            );

            scanner.render(
                (decodedText) => {
                    // Handle our custom protocol
                    if (decodedText.startsWith("campusflow://")) {
                        try {
                            const base64 = decodedText.replace("campusflow://", "");
                            const payload = JSON.parse(atob(base64));
                            if (payload.sid) {
                                setScanResult(payload.sid);
                                setStatus("HOLDING");
                                scanner.clear().catch(e => console.error(e));
                            }
                        } catch (e) {
                            console.error("Failed to parse QR payload", e);
                        }
                    } else {
                        // Support raw session ID if needed for debugging
                        setScanResult(decodedText);
                        setStatus("HOLDING");
                        scanner.clear().catch(e => console.error(e));
                    }
                },
                () => { }
            );

            return () => {
                scanner.clear().catch(err => console.error("Failed to clear scanner", err));
            }
        }
    }, [status]);

    // Handle the 5 second hold logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (status === "HOLDING") {
            setHoldProgress(0);
            interval = setInterval(() => {
                setHoldProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        if (scanResult) verifyLocation(scanResult);
                        return 100;
                    }
                    return prev + 2; // ~5 seconds
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [status, scanResult]);

    const verifyLocation = (sessionId: string) => {
        setStatus("VERIFYING");
        if (!navigator.geolocation) {
            setStatus("ERROR");
            setMessage("Geolocation unavailable");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const res = await markAttendance(sessionId, latitude, longitude);
                    if (res.success) {
                        setStatus("SUCCESS");
                        setMessage(res.message);
                    } else {
                        setStatus("ERROR");
                        setMessage(res.message);
                    }
                } catch (e) {
                    setStatus("ERROR");
                    setMessage("Network error");
                }
            },
            (err) => {
                console.error("GPS Error:", err);
                setStatus("ERROR");
                setMessage("GPS access denied. Required for geofencing.");
            },
            { enableHighAccuracy: true }
        )
    };

    const reset = () => {
        setScanResult(null);
        setStatus("IDLE");
        setMessage("");
        setHoldProgress(0);
    }

    return (
        <div className="w-full max-w-sm mx-auto p-4">
            {status === "IDLE" && (
                <div className="space-y-4">
                    <div id="reader" className="overflow-hidden rounded-xl border-2 border-primary/50 shadow-lg"></div>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-center text-xs font-black text-purple-500 uppercase tracking-widest">Point camera at the Faculty QR Code</p>
                        <p className="text-[10px] text-slate-400 font-medium italic">Ensure GPS is ON for geofencing validation</p>
                    </div>
                </div>
            )}

            {status === "HOLDING" && (
                <div className="flex flex-col items-center justify-center h-64 space-y-6">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <div className="absolute inset-0 border-8 border-slate-100 rounded-full" />
                        <svg className="w-full h-full -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="8"
                                strokeDasharray={351.8}
                                strokeDashoffset={351.8 - (351.8 * holdProgress) / 100}
                                className="text-purple-600 transition-all duration-100 ease-linear"
                            />
                        </svg>
                        <span className="absolute text-xl font-black text-purple-900">{Math.ceil((100 - holdProgress) / 20)}s</span>
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-xl font-black text-purple-900 uppercase tracking-tight">Hold Dynamic Scan</h2>
                        <p className="text-xs text-muted-foreground font-medium">Authenticating encrypted token... Keep target locked.</p>
                    </div>
                    <Button onClick={reset} variant="ghost" className="text-rose-500 hover:text-rose-600 font-bold">Cancel</Button>
                </div>
            )}

            {status === "VERIFYING" && (
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                    <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
                    <p className="text-lg font-black text-purple-900 uppercase tracking-tight">Validating Geofence</p>
                    <p className="text-xs text-muted-foreground font-medium">Verifying GPS vs. Faculty coordinates...</p>
                </div>
            )}

            {status === "SUCCESS" && (
                <div className="flex flex-col items-center justify-center h-64 space-y-4 text-emerald-500 animate-in zoom-in">
                    <div className="relative">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1.2, opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute inset-0 bg-emerald-500 rounded-full"
                        />
                        <CheckCircle2 className="w-20 h-20 relative z-10" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-extrabold text-slate-900">Attendance Marked!</h2>
                        <p className="text-sm font-medium text-slate-500 mt-1">{message}</p>
                    </div>
                    <Button onClick={reset} className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest px-8 rounded-2xl shadow-lg shadow-emerald-200">Done</Button>
                </div>
            )}

            {status === "ERROR" && (
                <div className="flex flex-col items-center justify-center h-64 space-y-4 text-rose-500 animate-in shake">
                    <XCircle className="w-20 h-20" />
                    <div className="text-center">
                        <h2 className="text-2xl font-extrabold text-slate-900">Scan Failed</h2>
                        <p className="text-sm font-medium text-rose-500 mt-1 px-4">{message}</p>
                    </div>
                    <Button onClick={reset} variant="outline" className="mt-8 border-slate-200 font-black uppercase tracking-widest px-8 rounded-2xl">Try Again</Button>
                </div>
            )}
        </div>
    );
}
