"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User, GraduationCap } from "lucide-react";

export function EditProfileDialog({ children, initialData }: { children: React.ReactNode, initialData: any }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(initialData);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Success simulation
        toast.success("Profile updated successfully!");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-0 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-purple-900 font-heading">
                        <User className="w-5 h-5 text-purple-500" /> Edit Profile
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 text-sm">
                        Update your personal details below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSave} className="space-y-6 pt-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-purple-900 font-bold">Full Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="rounded-xl border-purple-100 bg-purple-50/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dept" className="text-purple-900 font-bold">Department</Label>
                            <Input
                                id="dept"
                                value={formData.dept}
                                onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                                className="rounded-xl border-purple-100 bg-purple-50/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sem" className="text-purple-900 font-bold">Semester</Label>
                            <Input
                                id="sem"
                                value={formData.sem}
                                onChange={(e) => setFormData({ ...formData, sem: e.target.value })}
                                className="rounded-xl border-purple-100 bg-purple-50/10"
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200 font-bold">
                        Save Changes
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
