"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
    FileText,
    CheckCircle2,
    XCircle,
    Clock,
    Calendar,
    ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Request {
    id: number;
    applicantName: string;
    role: 'Student' | 'Faculty';
    type: string;
    date: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    reason: string;
}

export default function AdminRequestsHub() {
    const router = useRouter();
    const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
    const [requests, setRequests] = useState<Request[]>([
        { id: 1, applicantName: "Rahul Sharma", role: 'Student', type: "Academic Leave", date: "Today", status: 'Pending', reason: "Back home for competitive exam preparation." },
        { id: 2, applicantName: "Dr. S. Jumlesha", role: 'Faculty', type: "Medical Leave", date: "4h ago", status: 'Pending', reason: "High fever and medical rest advised." },
        { id: 3, applicantName: "Priya Patel", role: 'Student', type: "Personal Leave", date: "Yesterday", status: 'Approved', reason: "Attending sister's graduation ceremony." },
        { id: 4, applicantName: "Arjun Singh", role: 'Student', type: "Emergency Leave", date: "2 days ago", status: 'Rejected', reason: "Incomplete documentation for urgent hometown visit." },
    ]);

    const handleAction = (id: number, action: 'Approved' | 'Rejected') => {
        setRequests(requests.map(req =>
            req.id === id ? { ...req, status: action } : req
        ));
        toast.success(`Request ${action}`, {
            description: `Applicant will be notified immediately.`,
        });
    };

    const filteredRequests = requests.filter(req => filter === 'All' || req.status === filter);

    return (
        <DashboardLayout>
            <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-700 font-sans">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => router.back()}
                            className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-600 hover:text-[#0047AB] hover:border-[#0047AB] transition-all shadow-sm group"
                        >
                            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <h1 className="text-4xl font-black text-[#1E293B] dark:text-white tracking-tight italic">Admin Requests Hub</h1>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Manage all student and faculty leave permissions</p>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="border-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-[32px] p-8 shadow-xl">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Requests</p>
                                <h3 className="text-5xl font-black tracking-tighter text-[#1E293B] dark:text-white">{requests.length}</h3>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-[32px] p-8 shadow-xl">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                                <Clock className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending Review</p>
                                <h3 className="text-5xl font-black tracking-tighter text-orange-600">{requests.filter(r => r.status === 'Pending').length}</h3>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-0 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 rounded-[32px] p-8 shadow-xl">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <CheckCircle2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Approved</p>
                                <h3 className="text-5xl font-black tracking-tighter text-emerald-600">{requests.filter(r => r.status === 'Approved').length}</h3>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-0 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 rounded-[32px] p-8 shadow-xl">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/20">
                                <XCircle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Rejected</p>
                                <h3 className="text-5xl font-black tracking-tighter text-rose-600">{requests.filter(r => r.status === 'Rejected').length}</h3>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-[#1E293B] dark:text-white tracking-tight italic">All Requests</h2>
                    <div className="flex items-center gap-3 p-1.5 bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl w-fit">
                        {['All', 'Pending', 'Approved', 'Rejected'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab as any)}
                                className={cn(
                                    "px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all",
                                    filter === tab
                                        ? "bg-white dark:bg-slate-700 text-[#1E293B] dark:text-white shadow-sm"
                                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main List */}
                <div className="grid grid-cols-1 gap-6">
                    {filteredRequests.map((req) => (
                        <Card key={req.id} className="border-0 bg-white dark:bg-slate-900/60 hover:shadow-xl hover:shadow-purple-500/5 transition-all rounded-[32px] overflow-hidden group">
                            <CardContent className="p-8">
                                <div className="flex flex-col md:flex-row justify-between gap-8">
                                    <div className="flex gap-6">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center font-black text-xl text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
                                            {req.applicantName.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <h3 className="text-xl font-black text-[#1E293B] dark:text-white tracking-tight leading-none">{req.applicantName}</h3>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{req.role}</p>
                                                </div>
                                                <Badge className={cn(
                                                    "text-[9px] font-black uppercase px-3 py-1 rounded-full border-none",
                                                    req.status === 'Pending' ? "bg-orange-50 text-orange-600" :
                                                        req.status === 'Approved' ? "bg-emerald-50 text-emerald-600" :
                                                            "bg-rose-50 text-rose-600"
                                                )}>
                                                    {req.status}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> {req.type}</span>
                                                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {req.date}</span>
                                            </div>
                                            <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xl">
                                                {req.reason}
                                            </p>
                                        </div>
                                    </div>

                                    {req.status === 'Pending' && (
                                        <div className="flex items-center gap-3">
                                            <Button
                                                onClick={() => handleAction(req.id, 'Approved')}
                                                className="h-14 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2"
                                            >
                                                <CheckCircle2 className="w-4 h-4" /> Approve
                                            </Button>
                                            <Button
                                                onClick={() => handleAction(req.id, 'Rejected')}
                                                variant="outline"
                                                className="h-14 px-8 border-2 border-rose-100 text-rose-600 hover:bg-rose-50 font-black text-xs uppercase tracking-widest rounded-2xl active:scale-95 transition-all flex items-center gap-2"
                                            >
                                                <XCircle className="w-4 h-4" /> Reject
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {filteredRequests.length === 0 && (
                        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-[32px] flex items-center justify-center text-slate-200 dark:text-slate-700">
                                <Clock className="w-10 h-10" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-black text-[#1E293B] dark:text-white tracking-tight">No requests found</h3>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Everything is up to date!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
