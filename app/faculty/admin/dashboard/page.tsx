"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Users,
    UserCheck,
    DollarSign,
    Activity,
    CheckCircle,
    XCircle,
    Clock,
    Wifi,
    FileText,
    Briefcase,
    TrendingUp,
    ChevronDown,
    Bell,
    X,
    ExternalLink,
    Calendar,
    WifiOff,
    AlertCircle,
    Download,
    ChevronLeft
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Request {
    id: number;
    applicantId: string;
    name: string;
    initials: string;
    type: string;
    details: string;
    department: string;
    status: "pending" | "approved" | "rejected";
}

export default function AdminDashboard() {
    const router = useRouter();
    const currentUser = {
        id: "USR-001",
        name: "Mrs. Rupa Devi",
        role: "HOD - AI&DS"
    };

    const [requests, setRequests] = useState<Request[]>([
        { id: 1, applicantId: "USR-002", name: "D. S. Padmaja", initials: "DP", type: "Leave Request", details: "Jan 28-30, 2026", department: "AI&DS", status: "pending" },
        { id: 2, applicantId: "USR-001", name: "Mrs. R. Rupa Devi", initials: "RD", type: "Research Funding", details: "$50,000 grant", department: "AI&DS", status: "pending" },
        { id: 3, applicantId: "USR-003", name: "K. Jayachandra", initials: "KJ", type: "Course Approval", details: "AI Ethics - Sem 7", department: "AI&DS", status: "pending" },
        { id: 4, applicantId: "USR-004", name: "Y. Kalaivani", initials: "YK", type: "Equipment Purchase", details: "Lab instruments", department: "AI&DS", status: "pending" },
        { id: 5, applicantId: "USR-005", name: "Dr. S. Jumlesha", initials: "SJ", type: "Conference Travel", details: "IEEE Summit 2026", department: "AI&DS", status: "pending" },
    ]);

    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showWifiModal, setShowWifiModal] = useState(false);

    const handleApprove = (id: number) => {
        setRequests(requests.map(req =>
            req.id === id ? { ...req, status: "approved" } : req
        ));
        setSelectedRequest(null);
    };

    const handleReject = (id: number) => {
        setRequests(requests.map(req =>
            req.id === id ? { ...req, status: "rejected" } : req
        ));
        setSelectedRequest(null);
    };

    return (
        <DashboardLayout
            searchValue={searchQuery}
            onSearch={setSearchQuery}
        >
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
                <div className="max-w-[1800px] mx-auto py-8 px-6 space-y-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between"
                    >
                        <div>
                            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 dark:from-purple-400 dark:via-purple-300 dark:to-indigo-400 tracking-tight font-['Inter']">
                                CampusFlow Admin
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 font-medium mt-2 font-['Inter']">
                                Executive Dashboard Overview
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" className="relative btn-tactile">
                                <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
                            </Button>
                            <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-2xl cursor-pointer btn-tactile">
                                <Avatar className="w-10 h-10 border-2 border-purple-200 dark:border-purple-800">
                                    <AvatarFallback className="bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 text-white font-black text-sm">
                                        RD
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-left">
                                    <p className="font-bold text-sm text-slate-900 dark:text-white font-['Inter']">Mrs. Rupa Devi</p>
                                    <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">HOD - AI&DS</p>
                                </div>
                                <ChevronDown className="w-4 h-4 text-slate-400" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Performance Statistics - 3D Floating Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <MetricCard
                            icon={<Users className="w-7 h-7" />}
                            label="Total Faculty"
                            value="248"
                            percentage="+12%"
                            trend="up"
                            delay={0.1}
                            onClick={() => router.push('/faculty/admin/staff')}
                        />
                        <MetricCard
                            icon={<UserCheck className="w-7 h-7" />}
                            label="Student Presence"
                            value="92%"
                            percentage="+5%"
                            trend="up"
                            delay={0.2}
                            onClick={() => router.push('/faculty/admin/students')}
                        />
                        <MetricCard
                            icon={<DollarSign className="w-7 h-7" />}
                            label="Budget Utilization"
                            value="82%"
                            percentage="+8%"
                            trend="up"
                            delay={0.3}
                            onClick={() => toast.info("Budget details access restricted to HOD.")}
                        />
                        <MetricCard
                            icon={<Activity className="w-7 h-7" />}
                            label="System Health"
                            value="98%"
                            percentage="+2%"
                            trend="up"
                            delay={0.4}
                            onClick={() => setShowWifiModal(true)}
                        />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Administrative Workflow */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="lg:col-span-2 space-y-6"
                        >
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-['Inter']">
                                Administrative Workflow
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <WorkflowCard
                                    title="Mid-Term Results"
                                    description="Semester 6 evaluations"
                                    status="Live"
                                    icon={<FileText className="w-6 h-6" />}
                                    onClick={() => router.push('/academic/evaluations/sem6')}
                                />
                                <WorkflowCard
                                    title="Campus Wi-Fi"
                                    description="Network maintenance"
                                    status="Scheduled"
                                    icon={<Wifi className="w-6 h-6" />}
                                    onClick={() => setShowWifiModal(true)}
                                />
                                <WorkflowCard
                                    title="Placement Drive"
                                    description="Google recruitment"
                                    status="Live"
                                    icon={<Briefcase className="w-6 h-6" />}
                                    onClick={() => router.push('/placements/active-drives')}
                                />
                            </div>
                        </motion.div>

                        {/* Pending Hub */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="space-y-4"
                        >
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3 font-['Inter']">
                                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                Pending Hub
                            </h2>
                            <div className="space-y-3">
                                {requests
                                    .filter(req => req.applicantId !== currentUser.id)
                                    .filter(req =>
                                        req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        req.type.toLowerCase().includes(searchQuery.toLowerCase())
                                    )
                                    .map((request, index) => (
                                        <RequestCard
                                            key={request.id}
                                            request={request}
                                            onClick={() => request.status === "pending" && setSelectedRequest(request)}
                                            delay={0.7 + index * 0.1}
                                        />
                                    ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Modal Overlay */}
                <AnimatePresence>
                    {selectedRequest && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedRequest(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="glass-card rounded-3xl p-8 max-w-md w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800">
                                            <AvatarFallback className="bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 text-white font-black text-xl">
                                                {selectedRequest.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-black text-xl text-slate-900 dark:text-white font-['Inter']">{selectedRequest.name}</h3>
                                            <p className="text-sm text-purple-600 dark:text-purple-400 font-bold">{selectedRequest.type}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setSelectedRequest(null)} className="btn-tactile">
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Details</p>
                                        <p className="text-slate-900 dark:text-white font-medium">{selectedRequest.details}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Department</p>
                                        <p className="text-slate-900 dark:text-white font-medium">{selectedRequest.department}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        onClick={() => handleApprove(selectedRequest.id)}
                                        className="flex-1 h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-lg shadow-emerald-500/30 btn-tactile font-['Inter']"
                                    >
                                        <CheckCircle className="w-5 h-5 mr-2" /> Approve
                                    </Button>
                                    <Button
                                        onClick={() => handleReject(selectedRequest.id)}
                                        className="flex-1 h-12 bg-rose-500 hover:bg-rose-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-lg shadow-rose-500/30 btn-tactile font-['Inter']"
                                    >
                                        <XCircle className="w-5 h-5 mr-2" /> Reject
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                    {showWifiModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setShowWifiModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="glass-card rounded-3xl p-8 max-w-md w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                            <Wifi className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xl text-slate-900 dark:text-white font-['Inter']">Campus Wi-Fi</h3>
                                            <p className="text-sm text-orange-600 dark:text-orange-400 font-bold">Maintenance Schedule</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setShowWifiModal(false)} className="btn-tactile">
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>

                                <div className="space-y-6 mb-8">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
                                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Uptime</p>
                                            <p className="text-xl font-black text-emerald-700 dark:text-emerald-400">99.9%</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Latency</p>
                                            <p className="text-xl font-black text-blue-700 dark:text-blue-400">12ms</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20">
                                        <AlertCircle className="w-5 h-5 text-amber-600" />
                                        <div>
                                            <p className="font-bold text-amber-900 dark:text-amber-400 text-sm">Next Maintenance</p>
                                            <p className="text-xs text-amber-700/70">Jan 30, 2026 • 10:00 PM</p>
                                        </div>
                                    </div>

                                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed px-1">
                                        System health is currently **Stable**. Performance monitoring is active across all campus blocks (A, B, C, and Library).
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        onClick={() => setShowWifiModal(false)}
                                        className="flex-1 h-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs uppercase tracking-[0.2em] rounded-2xl btn-tactile font-['Inter']"
                                    >
                                        Acknowledge
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1 h-12 border-2 border-slate-200 dark:border-slate-800 font-black text-xs uppercase tracking-[0.2em] rounded-2xl btn-tactile font-['Inter'] flex items-center gap-2"
                                    >
                                        <WifiOff className="w-4 h-4" /> Report Issue
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardLayout>
    );
}

function MetricCard({ icon, label, value, percentage, trend, delay, onClick }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            onClick={onClick}
        >
            <Card className="border-0 glass-card dark:bg-slate-900/60 rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-purple-500/10">
                <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                            {icon}
                        </div>
                        <Badge className="bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-none text-xs font-black px-3 py-1 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {percentage}
                        </Badge>
                    </div>
                    <div>
                        <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 font-['Inter']">
                            {label}
                        </p>
                        <p className="text-4xl font-black text-slate-900 dark:text-white font-['Inter']">
                            {value}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function WorkflowCard({ title, description, status, icon, onClick }: any) {
    const isLive = status === "Live";
    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
        >
            <Card className={`border-0 glass-card dark:bg-slate-900/60 rounded-3xl overflow-hidden cursor-pointer ${isLive ? 'pulse-live-branded' : ''} transition-all duration-300 shadow-lg hover:shadow-purple-500/10`}>
                <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${isLive
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 text-purple-600 dark:text-purple-400'
                            : 'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 text-orange-600 dark:text-orange-400'
                            }`}>
                            {icon}
                        </div>
                        <Badge className={`${isLive
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                            : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                            } border-none text-[10px] font-black uppercase px-3 py-1 flex items-center gap-1.5`}>
                            {isLive && <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />}
                            {status}
                        </Badge>
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <h3 className="font-black text-slate-800 dark:text-white text-lg mb-1 font-['Inter']">{title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{description}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-purple-500 transition-colors" />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function RequestCard({ request, onClick, delay }: { request: Request; onClick: () => void; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Card
                className={`border-0 glass-card dark:bg-slate-900/60 rounded-2xl overflow-hidden ${request.status === "pending" ? 'cursor-pointer' : ''}`}
                onClick={onClick}
            >
                <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12 border-2 border-purple-200 dark:border-purple-800 shrink-0">
                            <AvatarFallback className="bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 text-white font-black">
                                {request.initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="font-black text-slate-900 dark:text-white text-sm truncate font-['Inter']">{request.name}</p>
                            <p className="text-xs text-purple-600 dark:text-purple-400 font-bold">{request.type}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{request.details}</p>
                        </div>
                    </div>
                    {request.status !== "pending" && (
                        <div className="mt-3">
                            <Badge className={`${request.status === "approved"
                                ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                                : 'bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400'
                                } border-none text-xs font-black uppercase px-3 py-1`}>
                                {request.status === "approved" ? "✓ Approved" : "✗ Rejected"}
                            </Badge>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
