"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, Plus, X, ShieldCheck, Rocket, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface TeamRegistrationDialogProps {
    event: {
        title: string;
        teamSize: string;
    };
    children: React.ReactNode;
}

export function TeamRegistrationDialog({ event, children }: TeamRegistrationDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState([""]);
    const [teamName, setTeamName] = useState("");

    const addMember = () => {
        if (members.length < 4) {
            setMembers([...members, ""]);
        } else {
            toast.error("Maximum team size is 4 members.");
        }
    };

    const removeMember = (index: number) => {
        setMembers(members.filter((_, i) => i !== index));
    };

    const updateMember = (index: number, value: string) => {
        const newMembers = [...members];
        newMembers[index] = value;
        setMembers(newMembers);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
            toast.success(`Team "${teamName}" registered for ${event.title}!`);
            setTeamName("");
            setMembers([""]);
        }, 2000);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] border-0 bg-white shadow-2xl p-0 overflow-hidden">
                <div className="h-2 bg-purple-600 w-full" />

                <form onSubmit={handleSubmit}>
                    <DialogHeader className="p-8 pb-4">
                        <DialogTitle className="flex items-center gap-3 text-2xl font-black text-[#1E293B] uppercase tracking-tight">
                            <Rocket className="w-6 h-6 text-purple-600" />
                            Team Registration
                        </DialogTitle>
                        <DialogDescription className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                            Event: <span className="text-purple-500">{event.title}</span> • Max {event.teamSize} Members
                        </DialogDescription>
                    </DialogHeader>

                    <div className="px-8 py-4 space-y-6 max-h-[60vh] overflow-y-auto no-scrollbar">
                        {/* Team Name */}
                        <div className="space-y-2">
                            <Label htmlFor="teamName" className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                Team Name
                            </Label>
                            <Input
                                id="teamName"
                                placeholder="Enter your team's cool name..."
                                className="h-12 rounded-xl border-slate-200 focus:ring-purple-500 transition-all font-bold"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                required
                            />
                        </div>

                        {/* Team Members */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    Member Emails
                                </Label>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={addMember}
                                    className="h-7 px-2 text-[10px] font-black text-purple-600 uppercase hover:bg-purple-50 transition-colors"
                                >
                                    <Plus className="w-3 h-3 mr-1" /> Add Member
                                </Button>
                            </div>

                            <div className="space-y-3">
                                <AnimatePresence initial={false}>
                                    {members.map((member, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="flex gap-2"
                                        >
                                            <div className="relative flex-1">
                                                <Input
                                                    id={index === 0 ? "leader-email" : `member-email-${index}`}
                                                    name={index === 0 ? "leader-email" : `member-email-${index}`}
                                                    aria-label={index === 0 ? "Leader Email" : `Member ${index + 1} Email`}
                                                    placeholder={index === 0 ? "Leader Email (You)" : `Member ${index + 1} Email`}
                                                    className="h-11 rounded-xl border-slate-100 bg-slate-50/50 font-medium"
                                                    value={member}
                                                    onChange={(e) => updateMember(index, e.target.value)}
                                                    required
                                                />
                                            </div>
                                            {index > 0 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeMember(index)}
                                                    className="h-11 w-11 rounded-xl text-rose-500 hover:bg-rose-50"
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Project Brief */}
                        <div className="space-y-2">
                            <Label htmlFor="brief" className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                Project Vision (Brief)
                            </Label>
                            <Textarea
                                id="brief"
                                placeholder="What are you building? (AI, Blockchain, etc.)"
                                className="min-h-[100px] rounded-xl border-slate-200 font-medium resize-none"
                                required
                            />
                        </div>

                        {/* Terms */}
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex gap-3">
                            <div className="mt-0.5">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            </div>
                            <p className="text-[10px] font-medium text-slate-500 leading-relaxed">
                                By registering, you agree to the hackathon's code of conduct and confirm all members are currently enrolled.
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="p-8 pt-4 bg-slate-50/50 border-t border-slate-100">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setOpen(false)}
                            className="h-12 px-6 rounded-xl font-black uppercase text-[10px] tracking-widest"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-12 px-10 rounded-xl bg-purple-600 hover:bg-purple-700 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-purple-200"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Transmitting...
                                </>
                            ) : (
                                "Confirm Registration"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
