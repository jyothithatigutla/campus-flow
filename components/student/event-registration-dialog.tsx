"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    User,
    Phone,
    Mail,
    GraduationCap,
    Calendar,
    Users,
    Plus,
    X,
    ArrowRight,
    Trophy,
    CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { registerForEvent } from "@/app/student/actions";
import { useTransition } from "react";

interface EventRegistrationDialogProps {
    eventTitle: string;
    trigger: React.ReactNode;
}

export function EventRegistrationDialog({ eventTitle, trigger }: EventRegistrationDialogProps) {
    const [open, setOpen] = useState(false);
    const [teamMembers, setTeamMembers] = useState<string[]>([]);
    const [newMember, setNewMember] = useState("");

    const addMember = () => {
        if (newMember.trim()) {
            setTeamMembers([...teamMembers, newMember.trim()]);
            setNewMember("");
        }
    };

    const removeMember = (index: number) => {
        setTeamMembers(teamMembers.filter((_, i) => i !== index));
    };

    // ... (inside component)
    const [isPending, startTransition] = useTransition();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const studentId = "std_123"; // 
        // In a real app, retrieve from context/auth
        const eventId = "evt_001"; // simplified for demo

        startTransition(async () => {
            const result = await registerForEvent(eventId, studentId);

            if (result.success) {
                toast.success("Registration Successful!", {
                    description: `You have successfully registered for ${eventTitle}.`,
                    icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                });
                setOpen(false);
            } else {
                toast.error("Registration Failed", {
                    description: result.message
                });
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="max-w-xl rounded-[40px] border-none p-0 overflow-hidden font-sans">
                <div className="p-8 bg-purple-600 space-y-4">
                    <DialogHeader>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white">
                                <Trophy className="w-8 h-8" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl font-black text-white tracking-tight">Register for Event</DialogTitle>
                                <DialogDescription className="text-purple-100 font-bold text-[10px] uppercase tracking-widest">
                                    Registration for {eventTitle}
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                <form onSubmit={handleRegister} className="p-8 space-y-8 bg-white max-h-[80vh] overflow-y-auto no-scrollbar">
                    {/* Primary Information */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-4 bg-purple-600 rounded-full" />
                            <h4 className="text-xs font-black text-[#1E293B] uppercase tracking-widest italic">Personal Information</h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                                    <User className="w-3 h-3 text-purple-500" /> Full Name
                                </Label>
                                <Input
                                    id="fullName"
                                    required
                                    placeholder="Enter your name"
                                    className="h-12 bg-slate-50 border-none rounded-xl font-bold px-4"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mobile" className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                                    <Phone className="w-3 h-3 text-purple-500" /> Mobile Number
                                </Label>
                                <Input
                                    id="mobile"
                                    required
                                    type="tel"
                                    placeholder="+91 XXXXX XXXXX"
                                    className="h-12 bg-slate-50 border-none rounded-xl font-bold px-4"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                                <Mail className="w-3 h-3 text-purple-500" /> Email Address
                            </Label>
                            <Input
                                id="email"
                                required
                                type="email"
                                placeholder="name@campusflow.com"
                                className="h-12 bg-slate-50 border-none rounded-xl font-bold px-4"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="branch" className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                                    <GraduationCap className="w-3 h-3 text-purple-500" /> Branch
                                </Label>
                                <Input
                                    id="branch"
                                    required
                                    placeholder="e.g. CSE"
                                    className="h-12 bg-slate-50 border-none rounded-xl font-bold px-4"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="year" className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                                    <Calendar className="w-3 h-3 text-purple-500" /> Year
                                </Label>
                                <Input
                                    id="year"
                                    required
                                    placeholder="e.g. 3rd Year"
                                    className="h-12 bg-slate-50 border-none rounded-xl font-bold px-4"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Team Members */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-4 bg-purple-600 rounded-full" />
                            <h4 className="text-xs font-black text-[#1E293B] uppercase tracking-widest italic">Team Members (Optional)</h4>
                        </div>

                        <div className="flex gap-2">
                            <Input
                                id="newMember"
                                name="newMember"
                                aria-label="New Team Member Name"
                                value={newMember}
                                onChange={(e) => setNewMember(e.target.value)}
                                placeholder="Enter member name"
                                className="h-12 bg-slate-50 border-none rounded-xl font-bold px-4 flex-1"
                            />
                            <Button
                                type="button"
                                onClick={addMember}
                                className="h-12 w-12 bg-purple-100 text-purple-600 hover:bg-purple-600 hover:text-white rounded-xl transition-all"
                            >
                                <Plus className="w-6 h-6" />
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <AnimatePresence>
                                {teamMembers.map((member, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="bg-slate-100 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black text-slate-600"
                                    >
                                        <Users className="w-3 h-3" />
                                        {member}
                                        <button onClick={() => removeMember(index)}>
                                            <X className="w-3 h-3 text-red-500" />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <Button
                            type="submit"
                            className="flex-1 h-14 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-purple-500/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            Confirm Registration <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
