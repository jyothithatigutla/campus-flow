"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    BookOpen,
    ChevronLeft,
    FileText,
    CheckCircle2,
    Clock,
    Download,
    Loader2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { submitGradeAction, downloadSubmission } from "./actions";

// --- Sub-Component: Grade Submission Form ---
function GradeSubmissionForm({ submission, assignmentId, onSuccess }: any) {
    const [score, setScore] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await submitGradeAction(
                assignmentId,
                submission.student, // Note: In production, pass submission.studentId (UUID)
                submission.student,
                parseFloat(score),
                100 // assuming total marks 100 for now. Real app should get this from assignment.total
            );

            if (result.success) {
                toast.success(result.message);
                onSuccess(parseFloat(score));
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error("Failed to submit grade");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4 font-sans">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="grade-score" className="text-xs font-black uppercase text-slate-500 tracking-widest">Score (out of 100)</label>
                    <Input
                        id="grade-score"
                        name="gradeScore"
                        type="number"
                        max={100}
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        placeholder="e.g. 85"
                        required
                        className="font-bold text-lg h-12"
                    />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full bg-[#0047AB] hover:bg-[#003087] font-black uppercase tracking-widest h-12 rounded-xl">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Grade"}
                </Button>
            </form>
        </div>
    );
}

// --- Main Page Component ---
export default function GradingPage() {
    const router = useRouter();
    const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    // Initial Assignments Data
    const [assignments, setAssignments] = useState([
        { id: "Operating Systems - Assignment 3", title: "Operating Systems - Assignment 3", course: "OS", dueDate: "Jan 30, 2026", submitted: 45, total: 60, status: "Active" },
        { id: "Data Structures - Lab Report", title: "Data Structures - Lab Report", course: "DS", dueDate: "Feb 5, 2026", submitted: 38, total: 60, status: "Active" },
        { id: "Machine Learning - Project Proposal", title: "Machine Learning - Project Proposal", course: "ML", dueDate: "Feb 10, 2026", submitted: 52, total: 60, status: "Active" },
        { id: "Database Systems - Quiz 2", title: "Database Systems - Quiz 2", course: "DBMS", dueDate: "Jan 25, 2026", submitted: 60, total: 60, status: "Graded" },
    ]);

    // Initial Submissions Data
    // Note: In a real app, this would be fetched from DB when an assignment is selected
    const [submissions, setSubmissions] = useState([
        { id: "SUB001", student: "Jyothic H", rollNo: "AIDS23001", submittedOn: "Jan 28, 2026", grade: null as number | null, status: "Pending" },
        { id: "SUB002", student: "Rahul Sharma", rollNo: "AIDS23002", submittedOn: "Jan 27, 2026", grade: null as number | null, status: "Pending" },
        { id: "SUB003", student: "Sarah Johnson", rollNo: "AIDS23003", submittedOn: "Jan 28, 2026", grade: null as number | null, status: "Pending" },
        { id: "SUB004", student: "Kevin Lee", rollNo: "AIDS23004", submittedOn: "Jan 26, 2026", grade: 85, status: "Graded" },
    ]);

    const handleDownload = async (submission: any) => {
        setDownloadingId(submission.id);
        try {
            const result = await downloadSubmission(submission.student, selectedAssignment || "Unknown Assignment");
            if (result.success) {
                toast.success(result.message);
                // In real app: window.open(result.url, '_blank');
            }
        } catch (error) {
            toast.error("Download failed");
        } finally {
            setDownloadingId(null);
        }
    };

    const handleGradeSuccess = (score: number, submissionId: string) => {
        // 1. Update the local submissions state
        setSubmissions(prev => prev.map(sub =>
            sub.id === submissionId
                ? { ...sub, grade: score, status: "Graded" }
                : sub
        ));

        // 2. Update the parent assignments count (Simulating "Approved/Submitted" increment)
        if (selectedAssignment) {
            setAssignments(prev => prev.map(asg =>
                asg.id === selectedAssignment
                    ? { ...asg, submitted: asg.submitted + 1 }
                    : asg
            ));
        }

        // 3. Refresh server data
        router.refresh();
    };

    return (
        <DashboardLayout>
            <div className="max-w-[1700px] mx-auto py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => router.back()}
                        className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-600 hover:text-[#0047AB] hover:border-[#0047AB] transition-all shadow-sm group"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-4xl font-black text-[#1E293B] dark:text-white tracking-tight italic">Grading Center</h1>
                        <p className="text-slate-400 font-medium tracking-tight">Review assignments and manage student grades</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Assignments List */}
                    <div className="lg:col-span-5 space-y-6">
                        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden">
                            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 p-8">
                                <CardTitle className="text-[#1E293B] dark:text-white flex items-center gap-4 font-black text-2xl italic tracking-tight">
                                    <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                        <BookOpen className="w-5 h-5 text-white" />
                                    </div>
                                    Active Assignments
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                {assignments.map((assignment) => (
                                    <div
                                        key={assignment.id}
                                        onClick={() => setSelectedAssignment(assignment.id)}
                                        className={`p-6 rounded-[32px] border-2 transition-all cursor-pointer ${selectedAssignment === assignment.id
                                            ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/20"
                                            : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <h4 className="font-black text-sm mb-1">{assignment.title}</h4>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{assignment.course} • Due {assignment.dueDate}</p>
                                            </div>
                                            <Badge className={`${assignment.status === "Graded"
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-orange-50 text-orange-600"
                                                } border-none font-black text-[9px] px-3 py-1 rounded-full`}>
                                                {assignment.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs font-bold text-slate-600 dark:text-slate-400">
                                            <span className="flex items-center gap-1.5">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                {assignment.submitted}/{assignment.total} Submitted
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Submission Details */}
                    <div className="lg:col-span-7 space-y-6">
                        {selectedAssignment ? (
                            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden">
                                <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 p-8">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-[#1E293B] dark:text-white flex items-center gap-4 font-black text-2xl italic tracking-tight">
                                            <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                                                <FileText className="w-5 h-5 text-white" />
                                            </div>
                                            Student Submissions
                                        </CardTitle>
                                        <Badge className="bg-slate-100 text-slate-600 font-bold border-none px-3 py-1 rounded-lg">
                                            {submissions.length} Total
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    {submissions.map((submission) => (
                                        <div key={submission.id} className="p-6 bg-slate-50/50 dark:bg-slate-800/50 rounded-[32px] border border-slate-100 dark:border-slate-800 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h5 className="font-black text-sm mb-1">{submission.student}</h5>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{submission.rollNo} • {submission.submittedOn}</p>
                                                </div>
                                                {submission.grade ? (
                                                    <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-lg px-4 py-2 rounded-2xl">
                                                        {submission.grade}/100
                                                    </Badge>
                                                ) : (
                                                    <Badge className="bg-orange-50 text-orange-600 border-none font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-widest">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        Pending Review
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex gap-3">
                                                <Button
                                                    onClick={() => handleDownload(submission)}
                                                    disabled={downloadingId === submission.id}
                                                    className="flex-1 bg-blue-600 hover:bg-blue-700 h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white"
                                                >
                                                    {downloadingId === submission.id ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Downloading...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Download className="w-4 h-4 mr-2" /> Download
                                                        </>
                                                    )}
                                                </Button>
                                                {!submission.grade && (
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white"
                                                            // onClick to open dialog is automatic via Trigger
                                                            >
                                                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                                                Grade Now
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Grade Submission</DialogTitle>
                                                                <DialogDescription>
                                                                    Enter the score for {submission.student} below.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <GradeSubmissionForm
                                                                submission={submission}
                                                                assignmentId={selectedAssignment}
                                                                onSuccess={(score: number) => handleGradeSuccess(score, submission.id)}
                                                            />
                                                        </DialogContent>
                                                    </Dialog>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="h-full flex items-center justify-center p-20">
                                <div className="text-center space-y-4">
                                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto">
                                        <BookOpen className="w-10 h-10 text-slate-400" />
                                    </div>
                                    <p className="text-slate-400 font-bold text-sm">Select an assignment to view submissions</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
