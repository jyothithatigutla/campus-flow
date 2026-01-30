"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, CheckCircle2, Send, Calendar, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function FacultyLetterRequest() {
    const [loading, setLoading] = useState(false);
    const [requestType, setRequestType] = useState("Medical Leave");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [monthlyLeaveCount, setMonthlyLeaveCount] = useState(2); // Example: 2 leaves already taken this month
    const MAX_LEAVES_PER_MONTH = 5;

    const LEAVE_TYPES = [
        "Medical Leave",
        "Casual Leave",
        "On-Duty (OD)",
        "Emergency Leave"
    ];

    // Helper to check validation
    const validateForm = () => {
        if (!startDate || !endDate || !reason.trim()) return false;
        if (monthlyLeaveCount >= MAX_LEAVES_PER_MONTH) return false;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Allow submitting for today
        if (end < start) return false;

        return true;
    };

    const isFormValid = validateForm();

    const handleSubmit = async () => {
        setError(null);

        // Double check validation on submit just in case
        if (!startDate || !endDate) {
            toast.error("Please select both start and end dates.");
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end < start) {
            setError("End date cannot be before start date.");
            toast.error("End date cannot be before start date.");
            return;
        }

        if (monthlyLeaveCount >= MAX_LEAVES_PER_MONTH) {
            toast.error("Monthly Limit Reached", {
                description: `You have already taken ${MAX_LEAVES_PER_MONTH} leaves this month.`
            });
            return;
        }

        if (!reason.trim()) {
            toast.error("Please provide a reason for your leave request.");
            return;
        }

        setLoading(true);

        const formData = {
            requestType,
            startDate,
            endDate,
            reason
        };

        // Simulate API Call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success("Letter submitted successfully!", {
                description: `Your request has been forwarded to HOD Mrs. Rupa Devi.`
            });

            // Reset Form on Success
            setMonthlyLeaveCount(prev => prev + 1);
            setStartDate("");
            setEndDate("");
            setReason("");
            setRequestType(LEAVE_TYPES[0]);
            setError(null);

        } catch (error) {
            toast.error("Failed to submit request", {
                description: "Please check your connection and try again."
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto py-8 space-y-12 transition-all duration-700 animate-in fade-in slide-in-from-bottom-4">
                {/* Leave Letter Form */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-gradient-to-b from-purple-600 via-purple-500 to-pink-500 rounded-full" />
                        <h2 className="text-2xl font-black text-[#1E293B] dark:text-white tracking-tight italic">Compose Letter</h2>
                    </div>

                    <Card className="border-0 shadow-2xl shadow-purple-600/5 bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden">
                        <CardContent className="p-12 space-y-10">
                            {/* Letter Header */}
                            <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-8">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest">Formal Request</p>
                                    <h3 className="text-3xl font-black text-[#1E293B] dark:text-white tracking-tight">Faculty Letter</h3>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Limit</p>
                                    <Badge className={cn(
                                        "px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest border-none",
                                        monthlyLeaveCount >= MAX_LEAVES_PER_MONTH ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
                                    )}>
                                        {MAX_LEAVES_PER_MONTH - monthlyLeaveCount} Leaves Left
                                    </Badge>
                                </div>
                            </div>

                            {/* Request Type Selector */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-800 dark:text-slate-300 uppercase tracking-widest pl-1">Letter Type</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {LEAVE_TYPES.map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setRequestType(type)}
                                            className={cn(
                                                "h-12 px-2 border-2 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all truncate",
                                                requestType === type
                                                    ? "bg-purple-50 dark:bg-purple-900/20 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-400 shadow-lg shadow-purple-500/10 scale-[1.02]"
                                                    : "bg-slate-50 dark:bg-slate-800 border-transparent hover:border-purple-200 dark:hover:border-purple-800 text-[#1E293B] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                            )}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Letter Body */}
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-800 dark:text-slate-300 uppercase tracking-widest pl-1 flex items-center gap-2">
                                            <Calendar className="w-3 h-3 text-purple-500" /> Start Date
                                        </label>
                                        <Input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => {
                                                setStartDate(e.target.value);
                                                setError(null);
                                            }}
                                            className="h-14 bg-slate-50 dark:bg-slate-800 border-transparent rounded-2xl focus-visible:bg-white dark:focus-visible:bg-slate-900 focus-visible:ring-4 focus-visible:ring-purple-500/10 focus-visible:border-purple-500 transition-all font-bold text-slate-600 dark:text-slate-300 px-6"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-800 dark:text-slate-300 uppercase tracking-widest pl-1 flex items-center gap-2">
                                            <Calendar className="w-3 h-3 text-purple-500" /> End Date
                                        </label>
                                        <Input
                                            type="date"
                                            value={endDate}
                                            min={startDate}
                                            onChange={(e) => {
                                                setEndDate(e.target.value);
                                                setError(null);
                                            }}
                                            className="h-14 bg-slate-50 dark:bg-slate-800 border-transparent rounded-2xl focus-visible:bg-white dark:focus-visible:bg-slate-900 focus-visible:ring-4 focus-visible:ring-purple-500/10 focus-visible:border-purple-500 transition-all font-bold text-slate-600 dark:text-slate-300 px-6"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold border border-red-100 dark:border-red-900/50 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                                        <CheckCircle2 className="w-4 h-4 rotate-45" />
                                        {error}
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-800 dark:text-slate-300 uppercase tracking-widest pl-1">Reason for Request</label>
                                    <Textarea
                                        placeholder="Please provide details for your request to the HOD..."
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        className="min-h-[160px] p-6 bg-slate-50 dark:bg-slate-800 border-transparent rounded-[24px] focus-visible:bg-white dark:focus-visible:bg-slate-900 focus-visible:ring-4 focus-visible:ring-purple-500/10 focus-visible:border-purple-500 transition-all font-bold text-slate-600 dark:text-slate-300 leading-relaxed resize-none shadow-inner"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic max-w-xs">
                                    Your letter will be submitted directly to <span className="text-purple-600 font-black">HOD Mrs. Rupa Devi</span> for approval.
                                </p>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={loading || !isFormValid}
                                    className="h-14 px-10 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-purple-500/20 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                                        </>
                                    ) : (
                                        <>
                                            Submit to HOD <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* History Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-gradient-to-b from-purple-600 via-purple-500 to-pink-500 rounded-full" />
                        <h2 className="text-2xl font-black text-[#1E293B] dark:text-white tracking-tight italic">Request History</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <RequestItem title="Casual Leave" date="15 Jan 2026" status="Approved" />
                        <RequestItem title="On-Duty (Seminar)" date="10 Dec 2025" status="Approved" />
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
}

function RequestItem({ title, date, status }: any) {
    return (
        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 hover:bg-purple-50/20 dark:hover:bg-purple-950/10 transition-all rounded-2xl group cursor-pointer">
            <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center transition-colors group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-purple-700 group-hover:text-white">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="font-black text-[#1E293B] dark:text-white tracking-tight mb-0.5">{title}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{date}</p>
                    </div>
                </div>
                <Badge className={cn(
                    "px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest border-transparent flex items-center gap-2",
                    status === 'Approved' ? "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" : "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                )}>
                    {status === 'Approved' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    {status}
                </Badge>
            </CardContent>
        </Card>
    )
}
