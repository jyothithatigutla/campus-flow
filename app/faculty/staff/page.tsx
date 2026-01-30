"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, GraduationCap, MoreVertical, ShieldCheck, Users, Clock, CheckCircle2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { LeaveRequestDialog } from "@/components/faculty/leave-request-dialog";

export default function StaffDirectory() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [staffRecords, setStaffRecords] = useState([
        { id: "F101", name: "D. S. Padmaja", dept: "AI&DS", role: "Professor", status: "Active" },
        { id: "F102", name: "Mrs. R. Rupa Devi", dept: "AI&DS", role: "Asst. Professor", status: "Active" },
        { id: "F103", name: "Ms. S. Shaheen", dept: "AI&DS", role: "Asst. Professor", status: "Active" },
        { id: "F104", name: "Mr. K. Jayachandra", dept: "AI&DS", role: "Asst. Professor", status: "Active" },
        { id: "F105", name: "Y. Kalaivani", dept: "AI&DS", role: "Assc. Professor", status: "Active" },
        { id: "F106", name: "Dr. S. Jumlesha", dept: "AI&DS", role: "Professor", status: "Active" },
        { id: "F107", name: "Mr. M. Bhanu Prakash", dept: "AI&DS", role: "Asst. Professor", status: "Active" },
        { id: "F108", name: "T. Kataiah", dept: "AI&DS", role: "Asst. Professor", status: "Active" },
        { id: "F109", name: "Dr. Harish", dept: "AI&DS", role: "Assc. Professor", status: "Active" },
        { id: "F110", name: "Ms. Y. Vaishnavi", dept: "AI&DS", role: "Asst. Professor", status: "Active" },
        { id: "F111", name: "Ms. D. Gowthami", dept: "AI&DS", role: "Asst. Professor", status: "Active" },
        { id: "F112", name: "Ms. G. Swarnakala", dept: "AI&DS", role: "Asst. Professor", status: "Active" },
        { id: "F113", name: "Ms. Teja malathi", dept: "AI&DS", role: "Asst. Professor", status: "Active" },
        { id: "F114", name: "Mr. E. Satheesh Kumar", dept: "AI&DS", role: "Asst. Professor", status: "Active" },
        { id: "F115", name: "Mr. Y. Mastaniah", dept: "AI&DS", role: "Asst. Professor", status: "Active" },
        { id: "F116", name: "Mr. M. Murali", dept: "H&S", role: "Asst. Professor", status: "Active" },
        { id: "F117", name: "Ms. C. Revathi", dept: "AI&DS", role: "Asst. Professor", status: "Active" },
        { id: "F118", name: "Dr. K. Thirumalalah", dept: "H&S", role: "Professor", status: "Active" },
        { id: "F119", name: "M.L.Dwarakanath", dept: "EEE", role: "Assc. Professor", status: "Active" },
        { id: "F120", name: "S.Bhavani", dept: "EEE", role: "Asst. Professor", status: "Active" },
        { id: "F121", name: "K.Kusumalatha", dept: "Physics", role: "Asst. Professor", status: "Leave" },
        { id: "F122", name: "D.Sireesha", dept: "CSE", role: "Asst. Professor", status: "Active" },
        { id: "F123", name: "Dr. K.Kumar", dept: "H&S", role: "Professor", status: "Active" },
        { id: "F124", name: "K.Vinay", dept: "H&S", role: "Asst. Professor", status: "Active" },
        { id: "F125", name: "K.Shanmugam", dept: "Mathematics", role: "Professor", status: "Active" },
        { id: "F126", name: "N.Poojitha", dept: "CSE", role: "Asst. Professor", status: "Active" },
        { id: "F127", name: "C.Venkataramana", dept: "H&S", role: "Asst. Professor", status: "Active" },
        { id: "F128", name: "M. Pandimeena", dept: "H&S", role: "Asst. Professor", status: "Active" },
        { id: "F129", name: "Nagaraju", dept: "H&S", role: "Asst. Professor", status: "Active" },
        { id: "F130", name: "K. Gangothri", dept: "CSE", role: "Asst. Professor", status: "Active" },
    ]);

    const filteredStaff = staffRecords.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.dept.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        total: staffRecords.length,
        active: staffRecords.filter(s => s.status === 'Active').length,
        leave: staffRecords.filter(s => s.status === 'Leave').length,
    };

    const toggleStatus = (id: string) => {
        setStaffRecords(prev => prev.map(s =>
            s.id === id ? { ...s, status: s.status === 'Active' ? 'Leave' : 'Active' } : s
        ));
    };

    return (
        <DashboardLayout>
            <div className="max-w-[1700px] mx-auto py-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => router.back()}
                            className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-600 hover:text-[#0047AB] hover:border-[#0047AB] transition-all shadow-sm group"
                        >
                            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <h1 className="text-4xl font-black text-[#1E293B] dark:text-white tracking-tight italic">Faculty & Staff Hub</h1>
                            <p className="text-slate-400 font-medium tracking-tight">Monitor academic staff and departmental availability</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-[24px] shadow-sm border border-slate-50 dark:border-slate-800">
                        <LeaveRequestDialog>
                            <Button variant="outline" className="border-slate-200 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-2xl h-12 px-8 hover:bg-slate-50">
                                Request Leave
                            </Button>
                        </LeaveRequestDialog>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl h-12 px-8">
                            Add New Faculty
                        </Button>
                    </div>
                </div>

                {/* Quick Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatBox label="Total Faculty" value={stats.total.toString()} icon={Users} color="blue" />
                    <StatBox label="Currently Active" value={stats.active.toString()} icon={CheckCircle2} color="emerald" />
                    <StatBox label="On Leave" value={stats.leave.toString()} icon={Clock} color="orange" />
                </div>

                {/* Filters & Search */}
                <div className="flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search by name, department, or staff ID..."
                            className="h-16 pl-14 rounded-[24px] border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-white shadow-sm focus-visible:ring-4 focus-visible:ring-purple-500/5 transition-all text-sm font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Staff Table */}
                <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden">
                    <CardHeader className="bg-slate-800 dark:bg-slate-950 p-8 px-10">
                        <CardTitle className="text-white flex items-center gap-4 font-black text-2xl italic tracking-tight">
                            <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                <ShieldCheck className="w-5 h-5 text-white" />
                            </div>
                            Campus Academic Staff Registry
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50/30 dark:bg-slate-800/30">
                                <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800 h-20">
                                    <TableHead className="pl-10 uppercase text-[10px] font-black text-slate-400 tracking-widest">Staff ID</TableHead>
                                    <TableHead className="uppercase text-[10px] font-black text-slate-400 tracking-widest">Full Name</TableHead>
                                    <TableHead className="uppercase text-[10px] font-black text-slate-400 tracking-widest">Department</TableHead>
                                    <TableHead className="uppercase text-[10px] font-black text-slate-400 tracking-widest">Role</TableHead>
                                    <TableHead className="uppercase text-[10px] font-black text-slate-400 tracking-widest text-center">Status</TableHead>
                                    <TableHead className="pr-10 text-right"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredStaff.map((member) => (
                                    <TableRow key={member.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group border-slate-50 dark:border-slate-800 h-24">
                                        <TableCell className="pl-10 font-black text-sm text-[#1E293B] dark:text-white">{member.id}</TableCell>
                                        <TableCell className="font-bold text-sm text-purple-600 dark:text-purple-400 italic">{member.name}</TableCell>
                                        <TableCell className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{member.dept}</TableCell>
                                        <TableCell className="font-bold text-sm text-[#1E293B] dark:text-white">{member.role}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-center gap-4">
                                                <Badge className={cn(
                                                    "px-4 py-2 rounded-full font-black text-[9px] uppercase tracking-widest border-none transition-all",
                                                    member.status === 'Active'
                                                        ? "bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-500/5"
                                                        : "bg-orange-50 text-orange-600 shadow-sm shadow-orange-500/5"
                                                )}>
                                                    {member.status}
                                                </Badge>
                                                <Switch
                                                    checked={member.status === 'Active'}
                                                    onCheckedChange={() => toggleStatus(member.id)}
                                                    className="data-[state=checked]:bg-emerald-500 shadow-inner"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-10">
                                            <Button size="icon" variant="ghost" className="h-12 w-12 rounded-2xl text-slate-300 hover:text-purple-600 hover:bg-purple-50 transition-all active:scale-95">
                                                <MoreVertical className="w-5 h-5" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}

function StatBox({ label, value, icon: Icon, color }: { label: string, value: string, icon: any, color: 'blue' | 'emerald' | 'orange' }) {
    const colors = {
        blue: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20",
        emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20",
        orange: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20"
    };
    return (
        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 p-8 rounded-[32px] flex items-center gap-6">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", colors[color])}>
                <Icon className="w-7 h-7" />
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                <h4 className="text-3xl font-black text-[#1E293B] dark:text-white tracking-tighter">{value}</h4>
            </div>
        </Card>
    );
}
