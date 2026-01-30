"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

interface Notice {
    id: number;
    sender: string;
    message: string;
    time: string;
    unread: boolean;
    avatar: string;
}

export function NoticesSheet({ trigger }: { trigger?: React.ReactNode }) {
    const notices: Notice[] = [
        {
            id: 1,
            sender: "HOD - Computer Science",
            message: "Mid-term exam schedule has been released. Check the portal for details.",
            time: "10:30 AM",
            unread: true,
            avatar: "CS"
        },
        {
            id: 2,
            sender: "Library",
            message: "You have overdue books. Please return them by tomorrow to avoid fines.",
            time: "Yesterday",
            unread: false,
            avatar: "LB"
        },
        {
            id: 3,
            sender: "Sports Committee",
            message: "Football trials are starting this Friday at the main ground.",
            time: "2 days ago",
            unread: false,
            avatar: "SP"
        },
        {
            id: 4,
            sender: "System Admin",
            message: "Maintenance scheduled for this Saturday. Portal will be down from 10PM-12AM.",
            time: "3 days ago",
            unread: false,
            avatar: "AD"
        }
    ];

    return (
        <Sheet>
            <SheetTrigger asChild>
                {trigger ? trigger : (
                    <Button className="h-24 flex-col gap-2 rounded-2xl shadow-lg border-0 bg-white dark:bg-zinc-800 text-foreground hover:bg-white/90 relative overflow-hidden group" variant="secondary">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-150 transition-transform duration-500">
                            <Bell className="w-16 h-16" />
                        </div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="relative">
                                <Bell className="w-8 h-8 text-orange-500 mb-2" />
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white animate-pulse">
                                    1
                                </span>
                            </div>
                            <span className="font-semibold">Notices</span>
                        </div>
                    </Button>
                )}
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] flex flex-col p-0">
                <SheetHeader className="p-6 border-b bg-muted/40">
                    <SheetTitle className="flex items-center gap-2 text-2xl">
                        <Bell className="w-6 h-6 text-primary" />
                        Notifications
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                        View your latest notifications and alerts.
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-4">
                        {notices.map((notice) => {
                            const href = notice.sender.includes("Exam") ? "/student/exams" :
                                notice.sender.includes("Sports") ? "/student/events" :
                                    notice.sender.includes("Library") ? "/student/requests" : "/student/notices";
                            return (
                                <Link
                                    key={notice.id}
                                    href={href}
                                    className={`flex gap-4 p-4 rounded-xl border transition-colors ${notice.unread
                                        ? "bg-primary/5 border-primary/20"
                                        : "bg-card border-border hover:bg-muted/50"
                                        }`}
                                >
                                    <Avatar className="h-10 w-10 border-2 border-background">
                                        <AvatarFallback className={notice.unread ? "bg-primary text-primary-foreground" : "bg-muted-foreground/20"}>
                                            {notice.avatar}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <p className={`text-sm font-medium ${notice.unread ? "text-foreground" : "text-muted-foreground"}`}>
                                                {notice.sender}
                                            </p>
                                            <span className="text-xs text-muted-foreground">{notice.time}</span>
                                        </div>
                                        <p className="text-sm text-foreground/90 leading-snug">
                                            {notice.message}
                                        </p>
                                    </div>
                                    {notice.unread && (
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
