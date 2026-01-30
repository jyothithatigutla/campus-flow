"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, User, MoreVertical, Filter, AlertTriangle, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function StudentDirectory() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StudentDirectoryContent />
        </Suspense>
    );
}

function StudentDirectoryContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialStatus = searchParams.get("status") || "all";

    const [searchTerm, setSearchTerm] = useState("");
    const [deptFilter, setDeptFilter] = useState("all");
    const [yearFilter, setYearFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState(initialStatus);

    const students = [
        // AI & DS - Year 3 (Sem 6)
        { id: "AIDS23001", name: "Jyothic H", dept: "AI&DS", sem: "6", attendance: 87, status: "Present" },
        { id: "AIDS23002", name: "Rahul Sharma", dept: "AI&DS", sem: "6", attendance: 92, status: "Present" },
        { id: "AIDS23003", name: "Sarah Johnson", dept: "AI&DS", sem: "6", attendance: 82, status: "Absent" },
        { id: "AIDS23004", name: "Kevin Lee", dept: "AI&DS", sem: "6", attendance: 68, status: "Absent" },
        { id: "AIDS23005", name: "Priya Patel", dept: "AI&DS", sem: "6", attendance: 95, status: "Present" },
        { id: "AIDS23006", name: "Michael Chen", dept: "AI&DS", sem: "6", attendance: 71, status: "Absent" },
        { id: "AIDS23007", name: "Ananya Kumar", dept: "AI&DS", sem: "6", attendance: 88, status: "Present" },
        { id: "AIDS23008", name: "David King", dept: "AI&DS", sem: "6", attendance: 62, status: "Absent" },

        // AI & DS - Year 2 (Sem 4)
        { id: "AIDS24001", name: "Emma Wilson", dept: "AI&DS", sem: "4", attendance: 91, status: "Present" },
        { id: "AIDS24002", name: "James Rodriguez", dept: "AI&DS", sem: "4", attendance: 85, status: "Present" },
        { id: "AIDS24003", name: "Sophia Martinez", dept: "AI&DS", sem: "4", attendance: 78, status: "Absent" },
        { id: "AIDS24004", name: "Oliver Brown", dept: "AI&DS", sem: "4", attendance: 73, status: "Present" },

        // AI & DS - Year 1 (Sem 2)
        { id: "AIDS25001", name: "Isabella Garcia", dept: "AI&DS", sem: "2", attendance: 83, status: "Present" },
        { id: "AIDS25002", name: "Liam Anderson", dept: "AI&DS", sem: "2", attendance: 90, status: "Present" },
        { id: "AIDS25003", name: "Mia Taylor", dept: "AI&DS", sem: "2", attendance: 76, status: "Absent" },
        { id: "AIDS25004", name: "Noah Thomas", dept: "AI&DS", sem: "2", attendance: 69, status: "Present" },
    ];

    const filteredStudents = useMemo(() => {
        return students.filter((s) => {
            const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDept = deptFilter === "all" || s.dept === deptFilter;
            const matchesYear = yearFilter === "all" || (Math.ceil(parseInt(s.sem) / 2)).toString() === yearFilter;
            const matchesStatus = statusFilter === "all" || s.status === statusFilter;
            return matchesSearch && matchesDept && matchesYear && matchesStatus;
        });
    }, [searchTerm, deptFilter, yearFilter, statusFilter, students]);

    return (
        <DashboardLayout>
            <div className="max-w-[1700px] mx-auto py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => router.back()}
                            className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-600 hover:text-[#0047AB] hover:border-[#0047AB] transition-all shadow-sm group"
                        >
                            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <h1 className="text-4xl font-black text-[#1E293B] dark:text-white tracking-tight italic">Student Directory</h1>
                            <p className="text-slate-400 font-medium tracking-tight">Manage and monitor student performance campus-wide</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search by name or ID..."
                            className="h-16 pl-14 rounded-[24px] border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-white shadow-sm focus-visible:ring-4 focus-visible:ring-purple-500/5 transition-all text-sm font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <Select onValueChange={setDeptFilter} value={deptFilter}>
                            <SelectTrigger className="h-16 w-[180px] rounded-[24px] border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 font-black text-[10px] uppercase tracking-widest text-[#1E293B] dark:text-white shadow-sm">
                                <SelectValue placeholder="Department" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-slate-100">
                                <SelectItem value="all">All Departments</SelectItem>
                                <SelectItem value="AI&DS">AI & DS</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select onValueChange={setYearFilter} value={yearFilter}>
                            <SelectTrigger className="h-16 w-[160px] rounded-[24px] border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 font-black text-[10px] uppercase tracking-widest text-[#1E293B] dark:text-white shadow-sm">
                                <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-slate-100">
                                <SelectItem value="all">All Years</SelectItem>
                                <SelectItem value="1">Year 1</SelectItem>
                                <SelectItem value="2">Year 2</SelectItem>
                                <SelectItem value="3">Year 3</SelectItem>
                                <SelectItem value="4">Year 4</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select onValueChange={setStatusFilter} value={statusFilter}>
                            <SelectTrigger className="h-16 w-[160px] rounded-[24px] border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 font-black text-[10px] uppercase tracking-widest text-[#1E293B] dark:text-white shadow-sm">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-slate-100">
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="Present">Present</SelectItem>
                                <SelectItem value="Absent">Absent</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden">
                    <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 p-8 px-10">
                        <CardTitle className="text-[#1E293B] dark:text-white flex items-center gap-4 font-black text-2xl italic tracking-tight">
                            <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            Active Students Directory
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50/30 dark:bg-slate-800/30">
                                <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800 h-20">
                                    <TableHead className="pl-10 uppercase text-[10px] font-black text-slate-400 tracking-widest">Student ID</TableHead>
                                    <TableHead className="uppercase text-[10px] font-black text-slate-400 tracking-widest">Name</TableHead>
                                    <TableHead className="uppercase text-[10px] font-black text-slate-400 tracking-widest">Dept</TableHead>
                                    <TableHead className="uppercase text-[10px] font-black text-slate-400 tracking-widest text-center">Semester</TableHead>
                                    <TableHead className="uppercase text-[10px] font-black text-slate-400 tracking-widest text-center">Attendance</TableHead>
                                    <TableHead className="uppercase text-[10px] font-black text-slate-400 tracking-widest">Status</TableHead>
                                    <TableHead className="pr-10 text-right"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredStudents.map((student) => {
                                    const isLowAttendance = student.attendance < 75;
                                    return (
                                        <TableRow key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group border-slate-50 dark:border-slate-800 h-24">
                                            <TableCell className="pl-10 font-black text-sm text-[#1E293B] dark:text-white">{student.id}</TableCell>
                                            <TableCell className="font-bold text-sm text-purple-600 dark:text-purple-400 italic">
                                                {student.name}
                                            </TableCell>
                                            <TableCell className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{student.dept}</TableCell>
                                            <TableCell className="text-center font-black text-sm text-[#1E293B]">SEM {student.sem}</TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex flex-col items-center gap-1.5">
                                                    <span className={cn(
                                                        "font-black text-xl tracking-tighter",
                                                        isLowAttendance ? "text-rose-500" : "text-purple-600"
                                                    )}>
                                                        {student.attendance}%
                                                    </span>
                                                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${student.attendance}%` }}
                                                            className={cn("h-full rounded-full", isLowAttendance ? "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]" : "bg-purple-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]")}
                                                        />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {isLowAttendance ? (
                                                    <Badge className="bg-rose-50 text-rose-600 border-none font-black text-[9px] uppercase tracking-widest flex items-center gap-1.5 w-fit px-4 py-2 rounded-full shadow-sm shadow-rose-500/5">
                                                        <AlertTriangle className="w-3.5 h-3.5" /> Below Threshold
                                                    </Badge>
                                                ) : (
                                                    <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] uppercase tracking-widest px-4 py-2 rounded-full shadow-sm shadow-emerald-500/5">
                                                        Safe Zone
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right pr-10">
                                                <Button size="icon" variant="ghost" className="h-12 w-12 rounded-2xl text-slate-300 hover:text-purple-600 hover:bg-purple-50 transition-all active:scale-95">
                                                    <MoreVertical className="w-5 h-5" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
