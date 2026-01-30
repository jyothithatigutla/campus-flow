"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Mail, Send, Loader2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function MentorCard() {
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'mentor', text: "Hello Jyothic! How's your project progressing? Let me know if you need help with the documentation." }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const lowerInput = input.toLowerCase();
            let response = "That sounds interesting! Let's discuss this further during our session tomorrow at 4 PM.";

            if (lowerInput.includes("project") || lowerInput.includes("work")) {
                response = "I'm glad to hear about your progress on the project. Have you finalized the architecture diagram?";
            } else if (lowerInput.includes("help") || lowerInput.includes("doubt")) {
                response = "Of course! Feel free to drop your specific queries here, or we can go over them in detail tomorrow.";
            } else if (lowerInput.includes("hi") || lowerInput.includes("hello")) {
                response = "Hello Jyothic! Hope you're having a productive day. Anything on your mind?";
            } else if (lowerInput.includes("thank") || lowerInput.includes("ok")) {
                response = "You're welcome! Keep up the good work.";
            } else if (lowerInput.includes("exam") || lowerInput.includes("test")) {
                response = "Don't worry about the exams. If you've been following the lectures and the Study Buddy notes, you'll do great!";
            }

            setMessages(prev => [...prev, { role: 'mentor', text: response }]);
        }, 1500);
    };

    return (
        <Dialog open={chatOpen} onOpenChange={setChatOpen}>
            <DialogTrigger asChild>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 p-1.5 pr-4 bg-white border border-slate-200 rounded-full cursor-pointer hover:shadow-lg transition-all"
                >
                    <div className="relative">
                        <Avatar className="w-8 h-8 border border-white shadow-sm font-bold">
                            <AvatarImage src="/mentor_avatar.png" />
                            <AvatarFallback className="bg-purple-100 text-purple-600 text-[10px]">DR</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-700 uppercase tracking-tight">Contact Mentor</p>
                        <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">Active Now</p>
                    </div>
                </motion.div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] p-0 border-0 bg-white shadow-2xl overflow-hidden">
                <div className="p-6 bg-[#1E293B] text-white flex items-center justify-between">
                    <DialogHeader className="hidden">
                        <DialogTitle>Chat with Mentor</DialogTitle>
                        <DialogDescription>Interactive session with Dr. Rajesh Kumar</DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10 border-2 border-white/20 font-bold">
                            <AvatarImage src="/mentor_avatar.png" />
                            <AvatarFallback>DR</AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="font-bold text-sm">Dr. Rajesh Kumar</h4>
                            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <a href="mailto:rajesh.kumar@university.edu" className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                            <Mail className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                <ScrollArea className="h-[400px] p-6 bg-slate-50/50 no-scrollbar">
                    <div className="space-y-4">
                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "flex",
                                    msg.role === 'user' ? "justify-end" : "justify-start"
                                )}
                            >
                                <div className={cn(
                                    "max-w-[80%] p-3 rounded-2xl text-xs font-medium shadow-sm",
                                    msg.role === 'user'
                                        ? "bg-purple-600 text-white rounded-tr-none"
                                        : "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
                                )}>
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-slate-100 p-2 px-3 rounded-2xl rounded-tl-none shadow-sm">
                                    <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                                </div>
                            </div>
                        )}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>

                <div className="p-4 bg-white border-t border-slate-100">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <Input
                            id="chat-message-input"
                            name="chatMessage"
                            aria-label="Chat message"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="rounded-xl border-slate-200 h-11 text-xs font-semibold"
                        />
                        <Button type="submit" size="icon" className="w-11 h-11 rounded-xl bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200 transition-all active:scale-95">
                            <Send className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
