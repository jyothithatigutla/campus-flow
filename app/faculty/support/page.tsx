"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    HelpCircle,
    ChevronLeft,
    Send,
    MessageCircle,
    Phone,
    Mail,
    Clock
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SupportPage() {
    const router = useRouter();
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Support Request Sent!", {
            description: "Our team will respond within 24 hours.",
        });
        setMessage("");
    };

    const faqs = [
        { q: "How do I reset my password?", a: "Navigate to Settings > Security > Change Password" },
        { q: "How do I update attendance records?", a: "Use the QR Scanner feature on the Dashboard" },
        { q: "Where can I view student performance?", a: "Go to Students > Select Student > View Analytics" },
        { q: "How do I submit grades?", a: "Navigate to Grading > Select Assignment > Grade Submissions" },
    ];

    const tickets = [
        { id: "TKT001", subject: "Unable to access grading module", status: "Open", date: "Jan 27, 2026" },
        { id: "TKT002", subject: "QR Scanner not working", status: "Resolved", date: "Jan 25, 2026" },
        { id: "TKT003", subject: "Student data export issue", status: "In Progress", date: "Jan 26, 2026" },
    ];

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
                        <h1 className="text-4xl font-black text-[#1E293B] dark:text-white tracking-tight italic">Support Center</h1>
                        <p className="text-slate-400 font-medium tracking-tight">Get help and submit support requests</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Contact & Submit */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Quick Contact */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-[32px] p-6">
                                <div className="space-y-3">
                                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Phone</p>
                                        <p className="font-black text-sm">+91 877-123-4567</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 rounded-[32px] p-6">
                                <div className="space-y-3">
                                    <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email</p>
                                        <p className="font-black text-sm">support@aits.edu</p>
                                    </div>
                                </div>
                            </Card>
                            <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-[32px] p-6">
                                <div className="space-y-3">
                                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                                        <Clock className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Hours</p>
                                        <p className="font-black text-sm">9 AM - 6 PM</p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Submit Request */}
                        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden">
                            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 p-8">
                                <CardTitle className="text-[#1E293B] dark:text-white flex items-center gap-4 font-black text-2xl italic tracking-tight">
                                    <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                                        <MessageCircle className="w-5 h-5 text-white" />
                                    </div>
                                    Submit Support Request
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Subject</label>
                                        <Input
                                            placeholder="Brief description of your issue"
                                            className="h-14 rounded-2xl border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 font-medium"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Message</label>
                                        <Textarea
                                            placeholder="Describe your issue in detail..."
                                            className="min-h-[200px] rounded-2xl border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 font-medium resize-none"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 h-14 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-xl shadow-purple-500/20">
                                        <Send className="w-4 h-4 mr-2" />
                                        Send Request
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: FAQs & Tickets */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* FAQs */}
                        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden">
                            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 p-8">
                                <CardTitle className="text-[#1E293B] dark:text-white flex items-center gap-4 font-black text-2xl italic tracking-tight">
                                    <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                        <HelpCircle className="w-5 h-5 text-white" />
                                    </div>
                                    Frequently Asked
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                {faqs.map((faq, idx) => (
                                    <div key={idx} className="p-6 bg-slate-50/50 dark:bg-slate-800/50 rounded-[24px] border border-slate-100 dark:border-slate-800">
                                        <h5 className="font-black text-sm mb-2">{faq.q}</h5>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{faq.a}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* My Tickets */}
                        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden">
                            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 p-8">
                                <CardTitle className="text-[#1E293B] dark:text-white font-black text-xl italic tracking-tight">
                                    My Tickets
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-3">
                                {tickets.map((ticket) => (
                                    <div key={ticket.id} className="p-4 bg-slate-50/50 dark:bg-slate-800/50 rounded-[20px] border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                        <div>
                                            <h6 className="font-black text-xs mb-1">{ticket.subject}</h6>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{ticket.id} • {ticket.date}</p>
                                        </div>
                                        <span className={`text-[9px] font-black px-3 py-1 rounded-full ${ticket.status === "Resolved" ? "bg-emerald-50 text-emerald-600" :
                                                ticket.status === "In Progress" ? "bg-blue-50 text-blue-600" :
                                                    "bg-orange-50 text-orange-600"
                                            }`}>
                                            {ticket.status}
                                        </span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
