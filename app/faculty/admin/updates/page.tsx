"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Zap, ShieldCheck, Info, Clock, CheckCircle2, Terminal, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SystemUpdates() {
    const router = useRouter();
    const updates = [
        {
            id: 1,
            title: "Geofencing Algorithm Optimized",
            description: "Accuracy for 'Main Hall - Block B' has been improved to 0.5 meters. False negatives reduced by 40%.",
            tag: "Optimization",
            type: "system",
            time: "10m ago",
            status: "Success"
        },
        {
            id: 2,
            title: "New Automated Staff Leave Rules",
            description: "System now automatically flags potential conflicts if more than 3 faculty from the same department apply for leave on the same day.",
            tag: "Policy",
            type: "policy",
            time: "2h ago",
            status: "Updated"
        },
        {
            id: 3,
            title: "Database Migration Complete",
            description: "Primary database moved to high-performance shards. Faster response times for student directory searches.",
            tag: "Infrastructure",
            type: "system",
            time: "Yesterday",
            status: "Success"
        },
        {
            id: 4,
            title: "AI Assistant Context Expanded",
            description: "CampusBot now recognizes semester-specific elective maps for the 2026 academic year.",
            tag: "AI",
            type: "ai",
            time: "2 days ago",
            status: "Success"
        }
    ];

    const [selectedLog, setSelectedLog] = useState<any>(null);
    const [isLogOpen, setIsLogOpen] = useState(false);

    const handleOpenLog = (update: any) => {
        setSelectedLog(update);
        setIsLogOpen(true);
    };

    return (
        <DashboardLayout>
            <div className="max-w-[1200px] mx-auto py-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-10">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => router.back()}
                            className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-600 hover:text-[#0047AB] hover:border-[#0047AB] transition-all shadow-sm group"
                        >
                            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <h1 className="text-4xl font-black text-[#1E293B] dark:text-white tracking-tight italic">System Updates</h1>
                            <p className="text-slate-400 font-medium tracking-tight">Platform-wide notification logs and optimization records</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            System Vital: 99.9%
                        </Badge>
                    </div>
                </div>

                <div className="space-y-6">
                    {updates.map((update) => (
                        <Card key={update.id} className="border-0 shadow-sm bg-white dark:bg-slate-900/60 p-8 rounded-[32px] hover:shadow-xl hover:shadow-purple-500/5 transition-all group border border-transparent hover:border-slate-50 dark:hover:border-slate-800">
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="shrink-0">
                                    <div className={cn(
                                        "w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-lg",
                                        update.type === 'system' ? "bg-purple-600 shadow-purple-500/20 text-white" :
                                            update.type === 'policy' ? "bg-slate-800 shadow-slate-500/20 text-white" :
                                                "bg-emerald-500 shadow-emerald-500/20 text-white"
                                    )}>
                                        {update.type === 'system' ? <Zap className="w-7 h-7" /> :
                                            update.type === 'policy' ? <ShieldCheck className="w-7 h-7" /> :
                                                <Info className="w-7 h-7" />}
                                    </div>
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-slate-100 text-slate-500 border-none font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full">
                                                {update.tag}
                                            </Badge>
                                            <h3 className="text-xl font-black text-[#1E293B] dark:text-white tracking-tight">{update.title}</h3>
                                        </div>
                                        <span className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                            <Clock className="w-3.5 h-3.5" /> {update.time}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-3xl">
                                        {update.description}
                                    </p>
                                    <div className="flex items-center gap-2 pt-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{update.status}</span>
                                    </div>
                                </div>
                                <div className="hidden md:flex flex-col justify-end">
                                    <Button
                                        variant="ghost"
                                        className="text-purple-600 font-black text-[10px] uppercase tracking-widest hover:bg-purple-50 h-10 px-6 rounded-xl"
                                        onClick={() => handleOpenLog(update)}
                                    >
                                        Read Logs
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <Dialog open={isLogOpen} onOpenChange={setIsLogOpen}>
                    <DialogContent className="bg-white dark:bg-slate-900 border-none rounded-[32px] max-w-2xl p-0 overflow-hidden shadow-2xl">
                        <DialogHeader className="p-8 pb-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                                    <Terminal className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <DialogTitle className="text-xl font-black text-[#1E293B] dark:text-white tracking-tight">System Log Details</DialogTitle>
                            </div>
                            <DialogDescription className="text-slate-500 font-medium">
                                Transaction ID: #{selectedLog?.id}8829-XJ • {selectedLog?.time}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-8 space-y-6">
                            <div className="space-y-2">
                                <h4 className="text-sm font-black text-[#1E293B] dark:text-white uppercase tracking-widest">Update Summary</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                    {selectedLog?.description}
                                </p>
                            </div>

                            <div className="bg-[#1E293B] rounded-2xl p-6 font-mono text-xs text-slate-300 shadow-inner overflow-hidden relative group">
                                <div className="absolute top-4 right-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Console Output</div>
                                <div className="space-y-1.5 opacity-80">
                                    <div className="flex gap-2 text-emerald-400">
                                        <span>$</span>
                                        <span>systemctl status {selectedLog?.type}-service</span>
                                    </div>
                                    <div className="text-slate-400">● {selectedLog?.type}-service.service - CampusFlow {selectedLog?.tag} Daemon</div>
                                    <div className="pl-4 text-slate-400">Loaded: loaded (/lib/systemd/system/{selectedLog?.type}.service; enabled)</div>
                                    <div className="pl-4">Active: <span className="text-emerald-400 font-bold">active (running)</span> since {selectedLog?.time}</div>
                                    <div className="pl-4 text-slate-400">Docs: man:{selectedLog?.type}-daemon(8)</div>
                                    <div className="pt-2 text-blue-400 flex gap-2">
                                        <span>LOGGER:</span>
                                        <span>Update applied successfully. Metrics stable.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button onClick={() => setIsLogOpen(false)} className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl px-8">
                                    Close Log Viewer
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    );
}
