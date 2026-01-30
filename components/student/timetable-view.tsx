"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    ChevronDown,
    Clock,
    MapPin,
    Calendar,
    Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";

import { TIMETABLE_DATA } from "@/lib/timetable-data";

interface TimetableViewProps {
    onLeaveRequest?: (type: string, subject: string) => void;
}

export function TimetableView({ onLeaveRequest }: TimetableViewProps) {
    const [selectedYear, setSelectedYear] = useState("2nd Year");
    const [selectedSection, setSelectedSection] = useState("Section A");

    const years = ["1st Year", "2nd Year", "3rd Year"];
    const sections = ["Section A", "Section B", "Section C"];

    const currentSchedule = TIMETABLE_DATA[selectedYear]?.[selectedSection] || [];

    // Helper to determine if a period is currently active (mock logic for demo)
    const isPeriodActive = (dayIndex: number, periodTime: string) => {
        // In a real app, check new Date() against periodTime
        // For demo, let's say Monday 11:10 is active
        return dayIndex === 0 && periodTime.startsWith("11:10");
    };

    const scrollToPeriod = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    };

    return (
        <div className="space-y-8 font-['Plus_Jakarta_Sans']">
            {/* Top Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* 3D Pill-shaped Year Selection */}
                <div className="bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-full flex gap-2 shadow-inner">
                    {years.map((year) => (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`
                                relative px-8 py-3 rounded-full text-sm font-bold transition-all duration-300
                                ${selectedYear === year
                                    ? "text-white shadow-[0_4px_0_0_#003087] translate-y-[-2px]"
                                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                                }
                            `}
                            style={{
                                background: selectedYear === year ? "linear-gradient(135deg, #0047AB 0%, #003087 100%)" : "transparent"
                            }}
                        >
                            {year}
                            {selectedYear === year && (
                                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Section Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="h-12 px-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-600 dark:text-slate-300 font-bold gap-3 transition-all"
                        >
                            <Filter className="w-4 h-4 text-[#0047AB]" />
                            {selectedSection}
                            <ChevronDown className="w-4 h-4 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
                        {sections.map((section) => (
                            <DropdownMenuItem
                                key={section}
                                onClick={() => setSelectedSection(section)}
                                className="rounded-xl font-bold text-slate-600 dark:text-slate-300 focus:text-[#0047AB] dark:focus:text-blue-300 focus:bg-blue-50 dark:focus:bg-blue-900/20 cursor-pointer py-3"
                            >
                                {section}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Timetable Grid */}
            <div className="space-y-8">
                {currentSchedule.length > 0 ? (
                    currentSchedule.map((daySchedule, dayIndex) => (
                        <div key={daySchedule.day} className="space-y-4">
                            {/* Day Header */}
                            <div className="flex items-center gap-4">
                                <h3 className="text-xl font-black text-slate-800 dark:text-white w-32">{daySchedule.day}</h3>
                                <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1" />
                            </div>

                            {/* Periods Row (Horizontal Scrollable) */}
                            <div className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x px-1 scrollbar-hide">
                                {daySchedule.periods.map((period) => {
                                    const isActive = isPeriodActive(dayIndex, period.time);
                                    const isBreak = period.type === "Break";
                                    const cardId = `period-${daySchedule.day}-${period.id}`;

                                    if (isBreak) {
                                        return (
                                            <div key={period.id} className="min-w-[100px] flex flex-col items-center justify-center gap-2 opacity-50">
                                                <div className="w-1 h-12 bg-slate-200 rounded-full" />
                                                <span className="text-[10px] font-black tracking-widest text-slate-400 rotate-90 whitespace-nowrap">
                                                    BREAK
                                                </span>
                                                <div className="w-1 h-12 bg-slate-200 rounded-full" />
                                            </div>
                                        );
                                    }

                                    return (
                                        <motion.div
                                            key={period.id}
                                            id={cardId}
                                            onClick={() => scrollToPeriod(cardId)}
                                            whileHover={{ y: -5 }}
                                            className="snap-center cursor-pointer"
                                        >
                                            <Card className={`relative w-[200px] h-[160px] rounded-[24px] border-0 overflow-hidden flex flex-col justify-between p-5 transition-all duration-300 group bg-white dark:bg-slate-900 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 border border-slate-100 dark:border-slate-800 ${isActive ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-950' : ''}`}>
                                                {/* Header: Time & Room */}
                                                <div className="flex justify-between items-start">
                                                    <div className="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                                        <Clock className="w-2.5 h-2.5" />
                                                        {period.time.split(" - ")[0]}
                                                    </div>
                                                    <div className="text-[10px] font-bold flex items-center gap-1 text-[#0047AB]">
                                                        <MapPin className="w-2.5 h-2.5" />
                                                        {period.room}
                                                    </div>
                                                </div>

                                                {/* Body: Subject */}
                                                <div className="space-y-1">
                                                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                                                        {period.code}
                                                    </p>
                                                    <h4 className="text-base font-black leading-tight line-clamp-2 text-slate-800 dark:text-white">
                                                        {period.subject}
                                                    </h4>
                                                </div>

                                                {/* Footer: Faculty */}
                                                <div className="flex items-center gap-2 pt-3 border-t border-dashed border-slate-200/20">
                                                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                                        {period.faculty ? period.faculty.charAt(0) : '?'}
                                                    </div>
                                                    <p className="text-[10px] font-bold truncate text-slate-500 dark:text-slate-400">
                                                        {period.faculty || 'Unassigned'}
                                                    </p>
                                                </div>

                                                {/* Decorative Gradient Blob */}
                                                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500" />
                                            </Card>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <Calendar className="w-16 h-16 mb-4 opacity-20" />
                        <p className="font-bold">No schedule available for {selectedYear} - {selectedSection}</p>
                    </div>
                )}
            </div>
        </div >
    );
}
