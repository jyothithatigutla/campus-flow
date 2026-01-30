"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Filter, Search as SearchIcon, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ResultsManagement() {
    const router = useRouter();
    const results = [
        { id: 1, name: "Rahul Sharma", roll: "22AK1A3101", grade: "A+", status: "Verified" },
        { id: 2, name: "David King", roll: "22AK1A3102", grade: "A", status: "Pending" },
        { id: 3, name: "Sneha Reddy", roll: "22AK1A3103", grade: "O", status: "Verified" },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-[1700px] mx-auto py-8 px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => router.back()}
                            className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 hover:text-[#0047AB] hover:border-[#0047AB] transition-all shadow-sm group"
                        >
                            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Mid-Term Results</h1>
                            <p className="text-slate-500 font-medium">Semester 6 • Academic Year 2025-26</p>
                        </div>
                    </div>
                    <Button className="bg-[#0047AB] hover:bg-[#003087] text-white px-8 h-12 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2">
                        <Download className="w-4 h-4" /> Export CSV
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <Card className="border-0 glass-card rounded-[32px] overflow-hidden">
                        <CardContent className="p-0">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 px-4 py-2 rounded-xl">
                                    <SearchIcon className="w-4 h-4 text-slate-400" />
                                    <input className="bg-transparent border-none outline-none text-sm font-medium w-64" placeholder="Search student..." />
                                </div>
                                <Button variant="outline" className="rounded-xl border-slate-200 gap-2">
                                    <Filter className="w-4 h-4" /> Filter
                                </Button>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <tr>
                                        <th className="px-8 py-4">Student Name</th>
                                        <th className="px-8 py-4">Roll Number</th>
                                        <th className="px-8 py-4">Grade</th>
                                        <th className="px-8 py-4">Status</th>
                                        <th className="px-8 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {results.map((res) => (
                                        <tr key={res.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                                            <td className="px-8 py-5 font-bold text-slate-900 dark:text-white">{res.name}</td>
                                            <td className="px-8 py-5 text-slate-500 font-medium">{res.roll}</td>
                                            <td className="px-8 py-5">
                                                <Badge className="bg-blue-50 text-blue-600 border-none font-black">{res.grade}</Badge>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${res.status === 'Verified' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                    <span className="text-xs font-bold text-slate-600">{res.status}</span>
                                                </div>
                                            </td>
                                            <td
                                                className="px-8 py-5 text-right font-black text-[#0047AB] text-[10px] uppercase tracking-wider cursor-pointer hover:underline"
                                                onClick={() => toast.info(`Editing result for ${res.name}`)}
                                            >
                                                Edit Result
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
