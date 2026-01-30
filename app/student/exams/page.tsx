"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { ExamList } from "@/components/student/exam-list";

export default function StudentExams() {
    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto py-8 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
                <ExamList />
            </div>
        </DashboardLayout>
    );
}
