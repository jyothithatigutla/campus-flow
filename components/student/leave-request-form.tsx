"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export function LeaveRequestForm() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);

    const currentDate = format(new Date(), "dd MMM yyyy");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Capture location magically
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setLocation({
                        lat: pos.coords.latitude,
                        lon: pos.coords.longitude,
                    });

                    // Simulate server delay
                    setTimeout(() => {
                        setLoading(false);
                        setSubmitted(true);
                        toast.success("Leave request submitted with location verification!");
                    }, 1500);
                },
                () => {
                    setLoading(false);
                    toast.error("Location access required for request verification.");
                }
            );
        }
    };

    return (
        <Card className="border-0 shadow-xl shadow-blue-500/5 bg-white overflow-hidden">
            <CardHeader className="bg-[#0047AB] text-white p-6">
                <CardTitle className="flex items-center gap-3 text-2xl font-heading">
                    <FileText className="w-7 h-7" /> New Leave Request
                </CardTitle>
                <p className="text-blue-100 text-sm opacity-90">Submit your absence request with GPS verification.</p>
            </CardHeader>
            <CardContent className="p-8">
                <AnimatePresence mode="wait">
                    {!submitted ? (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-blue-900 font-bold">Submission Date</Label>
                                    <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-blue-700 font-medium font-inter">
                                        <Calendar className="w-4 h-4" />
                                        {currentDate}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-blue-900 font-bold">Request Type</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {["Medical Leave", "Academic Leave", "Emergency Leave", "Personal Leave"].map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={(e) => {
                                                    const parent = e.currentTarget.parentElement;
                                                    if (parent) {
                                                        Array.from(parent.children).forEach(c => c.classList.remove('bg-[#0047AB]', 'text-white'));
                                                        Array.from(parent.children).forEach(c => c.classList.add('bg-blue-50', 'text-blue-700'));
                                                        e.currentTarget.classList.remove('bg-blue-50', 'text-blue-700');
                                                        e.currentTarget.classList.add('bg-[#0047AB]', 'text-white');
                                                    }
                                                }}
                                                className="px-4 py-2 rounded-xl text-sm font-bold transition-all bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100"
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-blue-900 font-bold">From</Label>
                                    <Input type="date" className="rounded-xl border-blue-100 bg-white focus:border-[#0047AB]" required />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-blue-900 font-bold">To</Label>
                                    <Input type="date" className="rounded-xl border-blue-100 bg-white focus:border-[#0047AB]" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reason" className="text-blue-900 font-bold">Reason for Absence</Label>
                                <Textarea
                                    id="reason"
                                    placeholder="Provide details for your request..."
                                    className="min-h-[120px] rounded-2xl border-blue-100 bg-white focus:border-[#0047AB]"
                                    required
                                />
                            </div>

                            <Button
                                disabled={loading}
                                className="w-full h-14 rounded-2xl text-lg font-bold bg-[#1E293B] hover:bg-[#0047AB] text-white shadow-lg shadow-blue-500/10 transition-all"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 animate-spin" /> Verifying GPS Location...
                                    </>
                                ) : (
                                    <>
                                        Submit Request <Send className="ml-2 w-5 h-5" />
                                    </>
                                )}
                            </Button>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-10 space-y-6"
                        >
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-blue-900">Request Submitted!</h3>
                                <p className="text-blue-500 font-medium">Your leave application is pending HOD approval.</p>
                            </div>

                            {location && (
                                <div className="bg-blue-50 rounded-xl p-4 inline-flex items-center gap-2 text-xs text-blue-600 font-bold border border-blue-100">
                                    <MapPin className="w-4 h-4" />
                                    GEO-VERIFIED: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
                                </div>
                            )}

                            <div className="pt-6">
                                <Button variant="outline" onClick={() => setSubmitted(false)} className="rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50">
                                    Create Another Request
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
}

function FileText(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 9H8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
        </svg>
    )
}
