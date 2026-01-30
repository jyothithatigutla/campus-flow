"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Building2, ExternalLink, Globe, Users, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PlacementManagement() {
    const router = useRouter();
    const drives = [
        { id: 1, company: "Google", role: "Software Engineering Intern", salary: "$120k", date: "Feb 15, 2026", status: "Active" },
        { id: 2, company: "Microsoft", role: "SDE-1", salary: "$140k", date: "Feb 20, 2026", status: "Upcoming" },
        { id: 3, company: "Amazon", role: "Cloud Support", salary: "$95k", date: "Past", status: "Closed" },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-[1700px] mx-auto py-8 px-6 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => router.back()}
                            className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 hover:text-[#0047AB] hover:border-[#0047AB] transition-all shadow-sm group"
                        >
                            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Placement Portal</h1>
                            <p className="text-slate-500 font-medium tracking-wide">Managing Recruitment Drives for 2026 Batch</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {drives.map((drive) => (
                        <Card key={drive.id} className="border-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-[40px] shadow-xl overflow-hidden group hover:-translate-y-2 transition-all duration-500 border border-white/20">
                            <CardContent className="p-8 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-700 transition-colors group-hover:bg-[#0047AB]">
                                        <Building2 className="w-8 h-8 text-slate-400 group-hover:text-white transition-colors" />
                                    </div>
                                    <Badge className={`${drive.status === 'Active' ? 'bg-purple-100 text-purple-600' :
                                        drive.status === 'Upcoming' ? 'bg-amber-100 text-amber-600' :
                                            'bg-slate-100 text-slate-400'
                                        } border-none font-black text-[10px] uppercase px-4 py-1.5`}>
                                        {drive.status}
                                    </Badge>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1 group-hover:text-[#0047AB] transition-colors">{drive.company}</h3>
                                    <p className="text-sm font-bold text-slate-500">{drive.role}</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        <Globe className="w-4 h-4 text-[#0047AB]" /> Package: {drive.salary}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        <Users className="w-4 h-4 text-[#0047AB]" /> Registered: 248 Students
                                    </div>
                                </div>

                                <Button
                                    className="w-full h-14 bg-[#1E293B] hover:bg-[#0047AB] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-slate-900/10 transition-all flex items-center justify-center gap-3"
                                    onClick={() => router.push(`/placements/candidates?company=${encodeURIComponent(drive.company)}`)}
                                >
                                    Manage Candidates <ExternalLink className="w-4 h-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
