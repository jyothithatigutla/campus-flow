import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // Assuming custom card setup, or standard
import { Calendar, Trophy, Users } from "lucide-react";
import Image from "next/image";

import { TeamRegistrationDialog } from "./team-registration-dialog";

export function HackathonList() {
    const events = [
        {
            id: 1,
            title: "Campus Hack 2024",
            date: "Oct 25-27",
            teamSize: "2-4",
            prize: "$10,000",
            tags: ["AI", "Web3"],
            image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&q=80&w=300&h=200"
        },
        {
            id: 2,
            title: "Code for Cause",
            date: "Nov 05",
            teamSize: "Indiv",
            prize: "Internship",
            tags: ["Social", "App"],
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=300&h=200"
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map(event => (
                <div key={event.id} className="group relative overflow-hidden rounded-2xl bg-background border hover:shadow-xl transition-all">
                    <div className="absolute inset-0 z-0">
                        {/* Placeholder for Image component if we had asset handling, using colored div for now to prevent broken image */}
                        <div className="w-full h-32 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 opacity-20" />
                    </div>

                    <div className="relative z-10 p-6 pt-24 space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold font-heading">{event.title}</h3>
                                <div className="flex gap-2 text-sm text-muted-foreground items-center mt-1">
                                    <Calendar className="w-4 h-4" /> {event.date}
                                </div>
                            </div>
                            <Badge variant="secondary" className="bg-white/90 text-black shadow-sm">
                                <Trophy className="w-3 h-3 mr-1 text-yellow-500" /> {event.prize}
                            </Badge>
                        </div>

                        <div className="flex gap-2">
                            {event.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="border-primary/20 bg-primary/5 text-primary">
                                    {tag}
                                </Badge>
                            ))}
                            <Badge variant="outline" className="items-center gap-1">
                                <Users className="w-3 h-3" /> {event.teamSize}
                            </Badge>
                        </div>

                        <TeamRegistrationDialog event={event}>
                            <Button className="w-full rounded-full">Register Team</Button>
                        </TeamRegistrationDialog>
                    </div>
                </div>
            ))}
        </div>
    );
}
