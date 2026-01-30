"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { TimetableView } from "@/components/student/timetable-view";
import { CampusWalletWidget, MentorConsultancyWidget } from "@/components/student/sidebar-widgets";

export default function StudentTimetable() {
    return (
        <DashboardLayout>
            <div className="max-w-[1700px] mx-auto space-y-10 animate-in fade-in duration-700">
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
                    {/* Main Content Area (8 cols) */}
                    <div className="lg:col-span-8 space-y-10">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-purple-600 rounded-full" />
                            <h1 className="text-3xl font-black text-[#1E293B] tracking-tight italic">Weekly Schedule</h1>
                        </div>
                        <div className="bg-white p-6 rounded-[24px] border border-slate-50 shadow-sm">
                            <TimetableView />
                        </div>
                    </div>

                    {/* Right Sidebar (4 cols) */}
                    <aside className="lg:col-span-4 space-y-10">
                        <CampusWalletWidget />
                        <MentorConsultancyWidget />
                    </aside>
                </div>
            </div>
        </DashboardLayout>
    );
}
