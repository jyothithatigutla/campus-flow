"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    HelpCircle,
    MessageCircle,
    Phone,
    Mail,
    Clock,
    Send,
    BookOpen,
    FileQuestion,
    Headphones
} from "lucide-react";

export default function StudentSupport() {
    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto py-8 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-950/20 rounded-3xl flex items-center justify-center shadow-lg shadow-purple-500/10">
                            <Headphones className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 dark:from-purple-400 dark:to-purple-500 tracking-tight">Support Center</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                        We're here to help! Get assistance with your academic queries, technical issues, or general campus information.
                    </p>
                </div>

                {/* Quick Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 rounded-3xl overflow-hidden group hover:shadow-xl hover:shadow-purple-500/10 transition-all">
                        <CardContent className="p-8 text-center space-y-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-950/20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                <Phone className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg text-slate-900 dark:text-white mb-2">Call Us</h3>
                                <p className="text-sm font-bold text-purple-600 dark:text-purple-400">+1 (555) 123-4567</p>
                                <p className="text-xs text-slate-400 mt-1">Mon-Fri, 9AM-6PM</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 rounded-3xl overflow-hidden group hover:shadow-xl hover:shadow-purple-1000/10 transition-all">
                        <CardContent className="p-8 text-center space-y-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                <Mail className="w-8 h-8 text-purple-700 dark:text-purple-500" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg text-slate-900 dark:text-white mb-2">Email Us</h3>
                                <p className="text-sm font-bold text-purple-700 dark:text-purple-500">support@campus.edu</p>
                                <p className="text-xs text-slate-400 mt-1">24-48 hour response</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 rounded-3xl overflow-hidden group hover:shadow-xl hover:shadow-purple-500/10 transition-all">
                        <CardContent className="p-8 text-center space-y-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h3 className="font-black text-lg text-slate-900 dark:text-white mb-2">Live Chat</h3>
                                <p className="text-sm font-bold text-purple-600 dark:text-purple-400">Start Conversation</p>
                                <p className="text-xs text-slate-400 mt-1">Instant support</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Submit Ticket Form */}
                <Card className="border-0 shadow-2xl bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden">
                    <CardContent className="p-12 space-y-8">
                        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <FileQuestion className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Submit a Support Ticket</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">We'll get back to you within 24 hours</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-800 dark:text-slate-300 uppercase tracking-widest">Your Name</label>
                                    <Input
                                        placeholder="John Doe"
                                        className="h-14 bg-slate-50 dark:bg-slate-800 border-transparent rounded-2xl focus-visible:bg-white dark:focus-visible:bg-slate-900 focus-visible:ring-4 focus-visible:ring-purple-500/10 focus-visible:border-purple-500 dark:focus-visible:border-purple-600 transition-all font-bold text-slate-600 dark:text-slate-300 px-6"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-800 dark:text-slate-300 uppercase tracking-widest">Email Address</label>
                                    <Input
                                        type="email"
                                        placeholder="john@campus.edu"
                                        className="h-14 bg-slate-50 dark:bg-slate-800 border-transparent rounded-2xl focus-visible:bg-white dark:focus-visible:bg-slate-900 focus-visible:ring-4 focus-visible:ring-purple-500/10 focus-visible:border-purple-500 dark:focus-visible:border-purple-600 transition-all font-bold text-slate-600 dark:text-slate-300 px-6"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-800 dark:text-slate-300 uppercase tracking-widest">Issue Category</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {["Academic", "Technical", "Financial", "General"].map((category, idx) => (
                                        <button
                                            key={category}
                                            className={`h-12 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${idx === 0
                                                ? "bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-400"
                                                : "bg-slate-50 dark:bg-slate-800 border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800 text-slate-600 dark:text-slate-400"
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-800 dark:text-slate-300 uppercase tracking-widest">Subject</label>
                                <Input
                                    placeholder="Brief description of your issue"
                                    className="h-14 bg-slate-50 dark:bg-slate-800 border-transparent rounded-2xl focus-visible:bg-white dark:focus-visible:bg-slate-900 focus-visible:ring-4 focus-visible:ring-purple-500/10 focus-visible:border-purple-500 dark:focus-visible:border-purple-600 transition-all font-bold text-slate-600 dark:text-slate-300 px-6"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-black text-slate-800 dark:text-slate-300 uppercase tracking-widest">Detailed Description</label>
                                <Textarea
                                    placeholder="Please provide as much detail as possible about your issue..."
                                    className="min-h-[180px] p-6 bg-slate-50 dark:bg-slate-800 border-transparent rounded-[24px] focus-visible:bg-white dark:focus-visible:bg-slate-900 focus-visible:ring-4 focus-visible:ring-purple-500/10 focus-visible:border-purple-500 dark:focus-visible:border-purple-600 transition-all font-bold text-slate-600 dark:text-slate-300 leading-relaxed resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic max-w-md">
                                Your ticket will be assigned to the appropriate department for quick resolution.
                            </p>
                            <Button className="h-14 px-10 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-purple-500/20 active:scale-95 transition-all flex items-center gap-3">
                                Submit Ticket <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* FAQ Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-gradient-to-b from-purple-600 via-purple-500 to-pink-500 rounded-full" />
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Frequently Asked Questions</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FAQItem
                            question="How do I reset my password?"
                            answer="Go to Settings > Security > Change Password. You'll need to verify your identity via email."
                        />
                        <FAQItem
                            question="Where can I view my exam schedule?"
                            answer="Navigate to Dashboard > Upcoming Exams or check the Results page for detailed schedules."
                        />
                        <FAQItem
                            question="How do I apply for leave?"
                            answer="Visit the Requests page and fill out the Leave Application form with required details."
                        />
                        <FAQItem
                            question="Who do I contact for technical issues?"
                            answer="Use the Live Chat feature or email support@campus.edu for immediate technical assistance."
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
    return (
        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 rounded-2xl group hover:shadow-md hover:shadow-purple-500/5 transition-all cursor-pointer">
            <CardContent className="p-6 space-y-3">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-purple-700 transition-all">
                        <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover:text-white" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-black text-slate-900 dark:text-white text-sm">{question}</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{answer}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
