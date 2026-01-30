"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { AttendanceHistory } from "@/components/attendance-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, AlertCircle } from "lucide-react";

export default function AdminHistory() {
    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto py-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                    <h1 className="text-3xl font-bold text-purple-900 font-heading">Global Attendance History</h1>
                    <p className="text-purple-400 font-medium">Campus-wide daily presence metrics</p>
                </div>

                {/* Global Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SummaryCard title="Avg. Daily Presence" value="92.4%" icon={<TrendingUp className="text-green-500" />} change="+1.2% from last week" />
                    <SummaryCard title="Total Students Tracked" value="2,450" icon={<Users className="text-purple-500" />} change="All Departments" />
                    <SummaryCard title="Absentee Alerts" value="12" icon={<AlertCircle className="text-red-500" />} change="Flagged for low attendance" />
                </div>

                {/* Calendar Drill-down */}
                <AttendanceHistory role="admin" />
            </div>
        </DashboardLayout>
    );
}

function SummaryCard({ title, value, icon, change }: any) {
    return (
        <Card className="border-0 shadow-lg shadow-purple-500/5 bg-white">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-black text-purple-400 uppercase tracking-widest">{title}</p>
                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                        {icon}
                    </div>
                </div>
                <div className="space-y-1">
                    <h3 className="text-3xl font-black text-purple-900">{value}</h3>
                    <p className="text-[10px] text-purple-500 font-bold uppercase tracking-tight">{change}</p>
                </div>
            </CardContent>
        </Card>
    )
}
