"use client";

import Link from "next/link";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Bell, Search, User, Menu, Moon, Sun, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { NoticesSheet } from "@/components/student/notices-sheet";
import { ModeToggle } from "@/components/mode-toggle";

export function DashboardLayout({
    children,
    onSearch,
    searchValue
}: {
    children: React.ReactNode;
    onSearch?: (value: string) => void;
    searchValue?: string;
}) {
    const pathname = usePathname();
    const isStudent = pathname.startsWith("/student");
    const isAdmin = pathname.startsWith("/faculty/admin");
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages] = useState([
        { role: 'bot', content: 'Hi! I am CampusBot. How can I help you today?' }
    ]);

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-slate-950 font-sans transition-colors duration-300">
            <DashboardSidebar />

            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                <header className="h-20 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md border-b border-white/20 dark:border-white/5 flex items-center justify-between px-10 shrink-0 relative z-20 shadow-sm">
                    {onSearch ? (
                        <div className="flex-1 max-w-2xl relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                            <Input
                                placeholder="Search anything..."
                                value={searchValue || ""}
                                onChange={(e) => onSearch?.(e.target.value)}
                                className="w-full h-11 pl-12 bg-white/50 backdrop-blur-sm border-white/30 rounded-2xl focus-visible:ring-4 focus-visible:ring-purple-500/5 focus-visible:border-purple-500 shadow-sm transition-all font-medium text-sm"
                            />
                        </div>
                    ) : (
                        <div className="flex-1" />
                    )}

                    <div className="flex items-center gap-6">
                        <ModeToggle />
                        <NoticesSheet trigger={
                            <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-purple-600 rounded-full h-11 w-11 transition-all">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white shadow-sm" />
                            </Button>
                        } />
                        <div className="h-8 w-[1px] bg-slate-200" />
                        <Link href={isStudent ? "/student/settings" : isAdmin ? "/faculty/admin/settings" : "/faculty/settings"}>
                            <div className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity">
                                <div className="text-right hidden sm:block">
                                    {isStudent ? (
                                        <>
                                            <p className="text-xs font-black text-[#1E293B] dark:text-white leading-none">
                                                Jyothic H
                                            </p>
                                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                                                CS • SEM 6
                                            </p>
                                        </>
                                    ) : isAdmin ? (
                                        <>
                                            <p className="text-xs font-black text-[#1E293B] dark:text-white leading-none">
                                                Mrs. Rupa Devi
                                            </p>
                                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                                                HOD • AI & DS
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-xs font-black text-[#1E293B] dark:text-white leading-none">
                                                Dr. S. Jumlesha
                                            </p>
                                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                                                ASSISTANT PROFESSOR
                                            </p>
                                        </>
                                    )}
                                </div>
                                <div className="w-10 h-10 rounded-full bg-purple-50 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                                    <User className="w-5 h-5 text-purple-500" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto custom-scrollbar relative p-8 bg-slate-50/30">
                    {/* Background Logo Watermark */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
                        <img
                            src="/logo.png"
                            alt=""
                            className="w-[500px] h-[500px] object-contain grayscale"
                        />
                    </div>
                    <div className="relative z-10">
                        {children}
                    </div>
                </main>


            </div >
        </div >
    );
}
