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
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";
import { toast } from "sonner";

export function LeaveRequestDialog({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Mock tracking of leaves taken this month
    const leavesTakenThisMonth = 2;
    const MAX_LEAVES = 5;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!startDate || !endDate || !reason) {
            toast.error("Please fill in all fields");
            return;
        }

        // Calculate days (mock)
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        if (leavesTakenThisMonth + diffDays > MAX_LEAVES) {
            toast.error(`Leave limit exceeded! You have ${leavesTakenThisMonth} leaves used. Max allowed is ${MAX_LEAVES}.`);
            return;
        }

        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast.success("Leave request submitted for approval", {
            description: "Admin will review your request shortly."
        });

        setOpen(false);
        setReason("");
        setStartDate("");
        setEndDate("");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <DialogHeader>
                    <DialogTitle className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-purple-600" />
                        Request Leave
                    </DialogTitle>
                    <DialogDescription>
                        Submit a leave request for Admin approval.
                        <br />
                        <span className="font-bold text-orange-500 text-xs">
                            Remaining leaves this month: {MAX_LEAVES - leavesTakenThisMonth}/{MAX_LEAVES}
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="start" className="font-bold">Start Date</Label>
                            <Input
                                id="start"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="end" className="font-bold">End Date</Label>
                            <Input
                                id="end"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="reason" className="font-bold">Reason</Label>
                        <Textarea
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Please describe why you are requesting leave..."
                            className="min-h-[100px]"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold">
                            Submit Request
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
