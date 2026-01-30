"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    BookOpen,
    Users,
    Clock,
    MapPin,
    Plus,
    CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

interface AddClassDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddClassDialog({ open, onOpenChange }: AddClassDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            onOpenChange(false);
            toast.success("Class Scheduled Successfully", {
                description: "The new lecture has been added to your today's schedule.",
            });
        }, 1500);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] border-0 bg-white dark:bg-slate-950 rounded-[32px] overflow-hidden p-0 shadow-2xl">
                <div className="bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] p-8 text-white relative">
                    <DialogHeader className="relative z-10">
                        <DialogTitle className="text-2xl font-black italic tracking-tight">Schedule New Class</DialogTitle>
                        <DialogDescription className="text-white/70 font-bold text-xs uppercase tracking-widest pt-1">
                            Add a lecture to your academic calendar
                        </DialogDescription>
                    </DialogHeader>
                    <BookOpen className="absolute -bottom-6 -right-6 w-32 h-32 text-white/10 -rotate-12" />
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="course" className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Course Name</Label>
                            <div className="relative">
                                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    id="course"
                                    placeholder="e.g. Operating Systems"
                                    className="pl-11 h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white transition-all font-bold"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="section" className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Section</Label>
                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        id="section"
                                        placeholder="Section A"
                                        className="pl-11 h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white transition-all font-bold"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="room" className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Room / Hall</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        id="room"
                                        placeholder="Hall B"
                                        className="pl-11 h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white transition-all font-bold"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="time" className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Time Slot</Label>
                            <div className="relative">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    id="time"
                                    type="time"
                                    className="pl-11 h-14 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white transition-all font-bold"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-16 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] hover:from-[#4338ca] hover:to-[#6d28d9] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/20 active:scale-95 transition-all"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                SCHEDULING...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                CONFIRM SCHEDULE
                            </div>
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
