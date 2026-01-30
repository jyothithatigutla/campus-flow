"use client";

import { useState, Suspense } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Search, Download, Filter, CheckCircle2, XCircle, Clock, Mail, Phone, Linkedin } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

function CandidatesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const company = searchParams.get("company") || "Company";

    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");

    const candidates = [
        { id: 1, name: "Jyothic H", usn: "1RV21AI001", department: "AI&DS", cgpa: 9.2, status: "Selected", email: "jyothic@example.com", phone: "+91 98765 43210", linkedin: "linkedin.com/in/jyothic" },
        { id: 2, name: "Rahul Sharma", usn: "1RV21AI002", department: "AI&DS", cgpa: 8.9, status: "Pending", email: "rahul@example.com", phone: "+91 98765 43211", linkedin: "linkedin.com/in/rahul" },
        { id: 3, name: "Ananya Krishnan", usn: "1RV21AI003", department: "AI&DS", cgpa: 9.5, status: "Selected", email: "ananya@example.com", phone: "+91 98765 43212", linkedin: "linkedin.com/in/ananya" },
        { id: 4, name: "Vikram Patel", usn: "1RV21AI004", department: "AI&DS", cgpa: 8.7, status: "Rejected", email: "vikram@example.com", phone: "+91 98765 43213", linkedin: "linkedin.com/in/vikram" },
        { id: 5, name: "Priya Menon", usn: "1RV21AI005", department: "AI&DS", cgpa: 9.1, status: "Pending", email: "priya@example.com", phone: "+91 98765 43214", linkedin: "linkedin.com/in/priya" },
        { id: 6, name: "Arjun Reddy", usn: "1RV21AI006", department: "AI&DS", cgpa: 8.8, status: "Selected", email: "arjun@example.com", phone: "+91 98765 43215", linkedin: "linkedin.com/in/arjun" },
    ];

    const filteredCandidates = candidates.filter(candidate => {
        const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            candidate.usn.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === "all" || candidate.status.toLowerCase() === filterStatus.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: candidates.length,
        selected: candidates.filter(c => c.status === "Selected").length,
        pending: candidates.filter(c => c.status === "Pending").length,
        rejected: candidates.filter(c => c.status === "Rejected").length,
    };

    return (
        <DashboardLayout>
            <div className="max-w-[1800px] mx-auto py-8 px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => router.back()}
                            className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 hover:text-[#0047AB] hover:border-[#0047AB] transition-all shadow-sm group"
                        >
                            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{company} - Candidates</h1>
                            <p className="text-slate-500 font-medium tracking-wide">Managing registered students for this drive</p>
                        </div>
                    </div>
                    <Button className="h-12 px-6 bg-[#0047AB] hover:bg-[#003380] text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg flex items-center gap-2">
                        <Download className="w-4 h-4" /> Export List
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="border-0 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-slate-900 rounded-3xl shadow-lg">
                        <CardContent className="p-6">
                            <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">Total Registered</p>
                            <p className="text-4xl font-black text-slate-900 dark:text-white">{stats.total}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-0 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-slate-900 rounded-3xl shadow-lg">
                        <CardContent className="p-6">
                            <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Selected</p>
                            <p className="text-4xl font-black text-slate-900 dark:text-white">{stats.selected}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-0 bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/20 dark:to-slate-900 rounded-3xl shadow-lg">
                        <CardContent className="p-6">
                            <p className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2">Pending</p>
                            <p className="text-4xl font-black text-slate-900 dark:text-white">{stats.pending}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-0 bg-gradient-to-br from-rose-50 to-white dark:from-rose-950/20 dark:to-slate-900 rounded-3xl shadow-lg">
                        <CardContent className="p-6">
                            <p className="text-xs font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest mb-2">Rejected</p>
                            <p className="text-4xl font-black text-slate-900 dark:text-white">{stats.rejected}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filter */}
                <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search by name or USN..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 pl-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-slate-400" />
                        {["all", "selected", "pending", "rejected"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={cn(
                                    "px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all",
                                    filterStatus === status
                                        ? "bg-[#0047AB] text-white shadow-lg"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                                )}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Candidates Table */}
                <Card className="border-0 bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-100 dark:border-slate-800">
                                        <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-widest">Student</th>
                                        <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-widest">USN</th>
                                        <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-widest">Department</th>
                                        <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-widest">CGPA</th>
                                        <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-widest">Contact</th>
                                        <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCandidates.map((candidate) => (
                                        <tr key={candidate.id} className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-5">
                                                <p className="font-black text-slate-900 dark:text-white">{candidate.name}</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <p className="font-bold text-slate-600 dark:text-slate-400 text-sm">{candidate.usn}</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-none font-black text-xs">
                                                    {candidate.department}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-5">
                                                <p className="font-black text-lg text-slate-900 dark:text-white">{candidate.cgpa}</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <a href={`mailto:${candidate.email}`} className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                                                        <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                    </a>
                                                    <a href={`tel:${candidate.phone}`} className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors">
                                                        <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                                    </a>
                                                    <a href={`https://${candidate.linkedin}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors">
                                                        <Linkedin className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <Badge className={cn(
                                                    "border-none font-black text-xs uppercase tracking-wider flex items-center gap-2 w-fit",
                                                    candidate.status === "Selected" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" :
                                                        candidate.status === "Pending" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" :
                                                            "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
                                                )}>
                                                    {candidate.status === "Selected" && <CheckCircle2 className="w-3.5 h-3.5" />}
                                                    {candidate.status === "Pending" && <Clock className="w-3.5 h-3.5" />}
                                                    {candidate.status === "Rejected" && <XCircle className="w-3.5 h-3.5" />}
                                                    {candidate.status}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}

export default function ManageCandidates() {
    return (
        <Suspense>
            <CandidatesContent />
        </Suspense>
    );
}
