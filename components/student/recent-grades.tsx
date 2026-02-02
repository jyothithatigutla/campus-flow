"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getRecentGrades } from "@/app/student/actions";

export function RecentGrades() {
    const [grades, setGrades] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGrades() {
            try {
                const data = await getRecentGrades();
                setGrades(data);
            } catch (error) {
                console.error("Failed to load grades", error);
            } finally {
                setLoading(false);
            }
        }
        fetchGrades();
    }, []);

    if (loading) {
        return (
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 rounded-[24px] overflow-hidden h-full min-h-[200px] flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center gap-2">
                    <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-full mb-2"></div>
                    <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                </div>
            </Card>
        );
    }

    return (
        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 rounded-[24px] overflow-hidden h-full flex flex-col">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 px-6 py-4">
                <CardTitle className="text-[#1E293B] dark:text-white flex items-center gap-3 font-black text-lg">
                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/20 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <Trophy className="w-4 h-4" />
                    </div>
                    Recent Grades
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-auto max-h-[300px]">
                {grades.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-slate-400 space-y-2">
                        <Clock className="w-8 h-8 opacity-20" />
                        <p className="text-xs font-bold uppercase tracking-widest">No grades yet</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {grades.map((grade) => (
                            <div key={grade.id} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between group">
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1 group-hover:text-[#0047AB] transition-colors line-clamp-1">
                                        {grade.exam_name}
                                    </h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        Max: {grade.total_marks}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="block text-2xl font-black text-slate-900 dark:text-white leading-none mb-1">
                                        {grade.score}
                                    </span>
                                    <Badge className={`
                                        border-none text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide
                                        ${grade.grade === 'A+' || grade.grade === 'A' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                                            grade.grade === 'B' || grade.grade === 'C' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
                                                'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'}
                                    `}>
                                        Grade {grade.grade}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
