"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, BookOpen, TrendingUp, AlertCircle, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function StudentResults() {
    const router = useRouter();
    const semesters = [
        {
            no: 5,
            gpa: "8.8",
            subjects: [
                { code: "CS301", name: "Data Structures", credits: 4, grade: "A+", points: 10 },
                { code: "CS302", name: "Operating Systems", credits: 4, grade: "A", points: 9 },
                { code: "CS303", name: "Software Engineering", credits: 3, grade: "O", points: 10 },
                { code: "CS304", name: "Computer Networks", credits: 4, grade: "B+", points: 8 },
                { code: "HU301", name: "Ethics & Aptitude", credits: 2, grade: "A", points: 9 },
            ]
        },
        {
            no: 4,
            gpa: "8.5",
            subjects: [
                { code: "CS201", name: "Database Systems", credits: 4, grade: "A", points: 9 },
                { code: "CS202", name: "Theory of Computation", credits: 4, grade: "B+", points: 8 },
                { code: "CS203", name: "Discrete Math", credits: 3, grade: "A+", points: 10 },
            ]
        }
    ];

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto py-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => router.back()}
                        className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 hover:text-[#0047AB] hover:border-[#0047AB] transition-all shadow-sm group"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Academic Results</h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Semester-wise Grade Evaluation</p>
                    </div>
                </div>

                {/* Stats Row - 4 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={<Award className="w-6 h-6" />}
                        label="Current CGPA"
                        value="8.65"
                        color="blue"
                        trend="+0.15"
                    />
                    <StatCard
                        icon={<BookOpen className="w-6 h-6" />}
                        label="Total Credits"
                        value="112"
                        color="indigo"
                        subtitle="of 160"
                    />
                    <StatCard
                        icon={<AlertCircle className="w-6 h-6" />}
                        label="Active Backlogs"
                        value="0"
                        color="emerald"
                        subtitle="Clear"
                    />
                    <StatCard
                        icon={<TrendingUp className="w-6 h-6" />}
                        label="Last Sem SGPA"
                        value="8.8"
                        color="blue"
                        trend="+0.3"
                    />
                </div>

                {/* Semester Performance Table */}
                <Tabs defaultValue="sem-5" className="w-full">
                    <TabsList className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 h-14 rounded-2xl shadow-sm inline-flex mb-8">
                        {semesters.map(sem => (
                            <TabsTrigger
                                key={sem.no}
                                value={`sem-${sem.no}`}
                                className="data-[state=active]:bg-[#0047AB] data-[state=active]:text-white rounded-xl px-8 h-11 font-bold text-slate-600 dark:text-slate-400 transition-all"
                            >
                                Semester {sem.no}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {semesters.map(sem => (
                        <TabsContent key={sem.no} value={`sem-${sem.no}`}>
                            <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 overflow-hidden rounded-3xl">
                                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-950/20 border-b border-slate-200 dark:border-slate-800 p-8">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-slate-900 dark:text-white font-black text-2xl flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0047AB] via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                                <GraduationCap className="w-6 h-6" />
                                            </div>
                                            Semester Performance
                                        </CardTitle>
                                        <Badge className="bg-gradient-to-r from-[#0047AB] via-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-base font-black shadow-lg">
                                            GPA: {sem.gpa}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-black tracking-widest">
                                                <tr>
                                                    <th className="px-8 py-5 text-left">Course Code</th>
                                                    <th className="px-8 py-5 text-left">Name</th>
                                                    <th className="px-8 py-5 text-center">Credits</th>
                                                    <th className="px-8 py-5 text-center">Grade</th>
                                                    <th className="px-8 py-5 text-center">Points</th>
                                                    <th className="px-8 py-5 text-right">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                                {sem.subjects.map((sub, i) => (
                                                    <motion.tr
                                                        key={i}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: i * 0.05 }}
                                                        className="hover:bg-blue-50/50 dark:hover:bg-blue-950/10 transition-colors group"
                                                    >
                                                        <td className="px-8 py-6 text-sm font-black text-slate-900 dark:text-slate-100">{sub.code}</td>
                                                        <td className="px-8 py-6 text-sm font-semibold text-slate-700 dark:text-slate-300">{sub.name}</td>
                                                        <td className="px-8 py-6 text-sm font-bold text-center text-slate-900 dark:text-slate-100">{sub.credits}</td>
                                                        <td className="px-8 py-6 text-center">
                                                            <CircularGradeBadge grade={sub.grade} />
                                                        </td>
                                                        <td className="px-8 py-6 text-sm font-bold text-center text-slate-900 dark:text-slate-100">{sub.points}</td>
                                                        <td className="px-8 py-6 text-right">
                                                            <StatusBadge status="Passed" />
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </DashboardLayout>
    );
}

function StatCard({ icon, label, value, color, trend, subtitle }: any) {
    const colorClasses: Record<string, string> = {
        blue: "from-[#0047AB] via-blue-600 to-indigo-600 shadow-blue-500/20",
        indigo: "from-blue-700 to-indigo-700 shadow-indigo-1000/20",
        emerald: "from-emerald-600 to-teal-600 shadow-emerald-500/20",
    };

    return (
        <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 rounded-3xl overflow-hidden group hover:shadow-xl transition-all">
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-white shadow-lg`}>
                        {icon}
                    </div>
                    {trend && (
                        <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1 rounded-full">
                            {trend}
                        </span>
                    )}
                </div>
                <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">{label}</p>
                <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-black text-slate-900 dark:text-white">{value}</p>
                    {subtitle && <span className="text-sm font-semibold text-slate-400">{subtitle}</span>}
                </div>
            </CardContent>
        </Card>
    );
}

function CircularGradeBadge({ grade }: { grade: string }) {
    const isExcellent = grade === 'O' || grade === 'A+';
    return (
        <div className="inline-flex">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-base border-4 ${isExcellent
                ? "bg-gradient-to-br from-[#0047AB] via-blue-600 to-indigo-600 text-white border-blue-200 dark:border-blue-800 shadow-lg shadow-blue-500/20"
                : "bg-gradient-to-br from-blue-700 to-indigo-700 text-white border-blue-300 dark:border-blue-900 shadow-lg shadow-blue-1000/20"
                }`}>
                {grade}
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    return (
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            {status}
        </span>
    );
}
