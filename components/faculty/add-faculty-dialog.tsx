"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Users, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface AddFacultyDialogProps {
    children: React.ReactNode;
    onAdd: (faculty: any) => void;
    existingIds: string[];
}

export function AddFacultyDialog({ children, onAdd, existingIds }: AddFacultyDialogProps) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Calculate the next ID based on existing ones
    const getNextId = () => {
        const numericIds = existingIds
            .filter(id => id.startsWith("F"))
            .map(id => parseInt(id.substring(1)))
            .filter(n => !isNaN(n));

        const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 100;
        return `F${maxId + 1}`;
    };

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        dept: "AI&DS",
        role: "Asst. Professor",
    });

    const isIdTaken = existingIds.includes(formData.id);

    // Set initial ID when dialog opens
    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (isOpen && !formData.id) {
            setFormData(prev => ({ ...prev, id: getNextId() }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isIdTaken) {
            toast.error("This Staff ID is already registered");
            return;
        }

        if (!formData.id || !formData.name || !formData.dept || !formData.role) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsSubmitting(true);
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 800));

        onAdd({
            ...formData,
            status: "Active"
        });

        toast.success("Faculty member added successfully", {
            description: `${formData.name} has been added to the registry.`
        });

        setIsSubmitting(false);
        setOpen(false);
        setFormData({
            id: "",
            name: "",
            dept: "AI&DS",
            role: "Asst. Professor",
        });
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-[32px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-600" />
                        Add New Faculty
                    </DialogTitle>
                    <DialogDescription>
                        Enter details to register a new faculty member.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="id" className="font-bold text-xs uppercase tracking-widest text-slate-400">Staff ID</Label>
                            {formData.id && (
                                <span className={cn(
                                    "text-[10px] font-bold flex items-center gap-1",
                                    isIdTaken ? "text-red-500" : "text-emerald-500"
                                )}>
                                    {isIdTaken ? (
                                        <><AlertCircle className="w-3 h-3" /> ID Already Taken</>
                                    ) : (
                                        <><CheckCircle2 className="w-3 h-3" /> Valid ID</>
                                    )}
                                </span>
                            )}
                        </div>
                        <Input
                            id="id"
                            placeholder="e.g. F131"
                            value={formData.id}
                            onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value.toUpperCase() }))}
                            className={cn(
                                "rounded-xl border-slate-100 dark:border-slate-800",
                                isIdTaken && "border-red-500 focus-visible:ring-red-500/20"
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="font-bold text-xs uppercase tracking-widest text-slate-400">Full Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. Dr. John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="rounded-xl border-slate-100 dark:border-slate-800"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="dept" className="font-bold text-xs uppercase tracking-widest text-slate-400">Department</Label>
                        <Select value={formData.dept} onValueChange={(v) => setFormData(prev => ({ ...prev, dept: v }))}>
                            <SelectTrigger className="rounded-xl border-slate-100 dark:border-slate-800">
                                <SelectValue placeholder="Select Department" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl shadow-2xl border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                                <SelectItem value="AI&DS">AI&DS</SelectItem>
                                <SelectItem value="CSE">CSE</SelectItem>
                                <SelectItem value="EEE">EEE</SelectItem>
                                <SelectItem value="H&S">H&S</SelectItem>
                                <SelectItem value="Physics">Physics</SelectItem>
                                <SelectItem value="Mathematics">Mathematics</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="role" className="font-bold text-xs uppercase tracking-widest text-slate-400">Role</Label>
                        <Select value={formData.role} onValueChange={(v) => setFormData(prev => ({ ...prev, role: v }))}>
                            <SelectTrigger className="rounded-xl border-slate-100 dark:border-slate-800">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl shadow-2xl border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                                <SelectItem value="Professor">Professor</SelectItem>
                                <SelectItem value="Assc. Professor">Assc. Professor</SelectItem>
                                <SelectItem value="Asst. Professor">Asst. Professor</SelectItem>
                                <SelectItem value="Lecturer">Lecturer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={isSubmitting || isIdTaken}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-widest h-12 rounded-xl shadow-lg shadow-purple-500/20"
                        >
                            {isSubmitting ? "Registering..." : "Register Faculty"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
