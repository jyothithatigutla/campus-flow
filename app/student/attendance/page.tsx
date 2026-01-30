"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { AttendanceHistory } from "@/components/attendance-history";
import { QRScanner } from "@/components/student/qr-scanner";
import { Calendar, ChevronLeft, QrCode } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function StudentAttendance() {
    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => window.history.back()}
                        className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 hover:text-[#0047AB] hover:border-[#0047AB] transition-all shadow-sm group"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div className="flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-[#0047AB]" />
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">My Attendance</h1>
                    </div>
                </div>

                {/* QR Scanner Section */}
                <Card className="border-0 shadow-xl shadow-purple-600/5 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-slate-900 rounded-[32px] overflow-hidden">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center">
                                <QrCode className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Scan QR Code</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Mark your attendance by scanning faculty QR</p>
                            </div>
                        </div>
                        <QRScanner />
                    </CardContent>
                </Card>

                {/* Attendance History */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Attendance History</h2>
                    <AttendanceHistory role="student" />
                </div>
            </div>
        </DashboardLayout>
    );
}
