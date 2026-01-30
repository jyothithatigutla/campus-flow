"use client";

import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    Users,
    Trophy,
    DollarSign,
    ArrowUpRight,
    Search
} from "lucide-react";
import { cn } from "@/lib/utils";

import { EventRegistrationDialog } from "@/components/student/event-registration-dialog";

// Event data structure
const eventsData = [
    {
        id: 1,
        title: "Campus Hack 2024",
        date: "Oct 25-27",
        prize: "$10,000",
        tags: ["AI", "Web3"],
        teamSize: "2-4",
        description: "Join the biggest campus hackathon of the year! Build innovative solutions using AI and Web3 technologies. Win prizes, network with industry leaders, and showcase your skills.",
        color: "purple"
    },
    {
        id: 2,
        title: "Code for Cause",
        date: "Nov 05",
        prize: "$5,000",
        tags: ["Social", "App"],
        teamSize: "Indiv",
        description: "Create apps that make a difference! Develop solutions for social good, focusing on education, healthcare, or environmental sustainability. Individual participation welcome.",
        color: "emerald"
    },
    {
        id: 3,
        title: "Tech Summit 2024",
        date: "Dec 10-12",
        prize: "FREE",
        tags: ["Conference", "Networking"],
        teamSize: null,
        description: "Annual tech conference featuring industry leaders, workshops, and networking opportunities. Learn about the latest trends in AI, Cloud, and Software Engineering.",
        color: "orange"
    },
    {
        id: 4,
        title: "Google Placement Drive",
        date: "Jan 15-20",
        prize: null,
        tags: ["SDE", "Full-Time"],
        teamSize: null,
        description: "Google is hiring! On-campus placement drive for Software Development Engineer roles. Eligibility: CGPA 7.5+, CS/IT students. Multiple rounds including coding and system design.",
        color: "rose"
    }
];

export default function StudentEvents() {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter events based on search query
    const filteredEvents = useMemo(() => {
        if (!searchQuery.trim()) return eventsData;

        const query = searchQuery.toLowerCase();
        return eventsData.filter(event =>
            event.title.toLowerCase().includes(query) ||
            event.description.toLowerCase().includes(query) ||
            event.tags.some(tag => tag.toLowerCase().includes(query)) ||
            event.date.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    return (
        <DashboardLayout searchValue={searchQuery} onSearch={setSearchQuery}>
            <div className="max-w-[1700px] mx-auto space-y-8 animate-in fade-in duration-700 font-sans">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-950/20 rounded-2xl flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 dark:from-purple-400 dark:to-purple-500 tracking-tight">Campus Events & Hackathons</h1>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Discover opportunities to grow</p>
                        </div>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search events..."
                            className="w-80 h-12 pl-12 pr-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full outline-none text-sm font-medium text-slate-600 dark:text-slate-300 placeholder:text-slate-400 focus:border-purple-500 dark:focus:border-purple-600 transition-all"
                        />
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <Card key={event.id} className={cn(
                                "border-0 shadow-sm rounded-[32px] p-8 space-y-6 group hover:shadow-xl transition-all",
                                event.color === "purple" && "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-950/20 hover:shadow-purple-500/10",
                                event.color === "emerald" && "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 hover:shadow-emerald-500/10",
                                event.color === "orange" && "bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 hover:shadow-orange-500/10",
                                event.color === "rose" && "bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 hover:shadow-rose-500/10"
                            )}>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black text-[#1E293B] dark:text-white tracking-tight">{event.title}</h3>
                                        <div className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400">
                                            <Calendar className="w-4 h-4" />
                                            {event.date}
                                        </div>
                                    </div>
                                    {event.prize ? (
                                        event.prize === "FREE" ? (
                                            <Badge className={cn(
                                                "border-none text-[10px] font-black uppercase px-3 py-1",
                                                event.color === "orange" && "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                                            )}>FREE</Badge>
                                        ) : (
                                            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-full shadow-sm">
                                                <DollarSign className="w-4 h-4 text-amber-500" />
                                                <span className="text-sm font-black text-[#1E293B] dark:text-white">{event.prize}</span>
                                            </div>
                                        )
                                    ) : (
                                        <Badge className="bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-none text-[10px] font-black uppercase px-3 py-1">CAREER</Badge>
                                    )}
                                </div>

                                <div className="flex items-center gap-3">
                                    {event.tags.map((tag, idx) => (
                                        <Badge key={idx} className={cn(
                                            "border-none text-[10px] font-black uppercase px-3 py-1",
                                            idx === 0 && event.color === "purple" && "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
                                            idx === 1 && event.color === "purple" && "bg-purple-200 dark:bg-purple-950/30 text-purple-800 dark:text-purple-400",
                                            idx === 0 && event.color === "emerald" && "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300",
                                            idx === 1 && event.color === "emerald" && "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
                                            idx === 0 && event.color === "orange" && "bg-purple-200 dark:bg-purple-950/30 text-purple-800 dark:text-purple-400",
                                            idx === 1 && event.color === "orange" && "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
                                            idx === 0 && event.color === "rose" && "bg-purple-200 dark:bg-purple-950/30 text-purple-800 dark:text-purple-400",
                                            idx === 1 && event.color === "rose" && "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                                        )}>{tag}</Badge>
                                    ))}
                                    {event.teamSize && (
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                                            <Users className="w-3.5 h-3.5" />
                                            {event.teamSize}
                                        </div>
                                    )}
                                </div>

                                <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {event.description}
                                </p>

                                <EventRegistrationDialog
                                    eventTitle={event.title}
                                    trigger={
                                        <Button className={cn(
                                            "w-full h-14 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 group-hover:gap-3",
                                            event.color === "purple" && "bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 hover:from-purple-700 hover:via-purple-600 hover:to-pink-600 shadow-purple-500/20",
                                            event.color !== "purple" && "bg-purple-600 hover:bg-purple-700 shadow-purple-500/20"
                                        )}>
                                            {event.id === 4 ? "Check Eligibility" : event.id === 3 ? "Register Now" : "Register Team"} <ArrowUpRight className="w-4 h-4" />
                                        </Button>
                                    }
                                />
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-2 text-center py-20">
                            <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-black text-slate-700 dark:text-slate-300 mb-2">No events found</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Try searching with different keywords</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
