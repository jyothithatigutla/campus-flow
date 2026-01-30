"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

type Message = {
    id: string;
    role: "user" | "bot";
    text: string;
};

export function AiAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", role: "bot", text: "Hi! I'm CampusFlow AI. Ask me about exams, hackathons, leave policies, or attendance." }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: "user", text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI Delay
        setTimeout(() => {
            let responseText = "I'm sorry, I didn't quite catch that. Could you rephrase?";
            const lowerInput = userMsg.text.toLowerCase();

            if (lowerInput.includes("medical leave")) {
                responseText = "To apply for medical leave: 1. Go to Requests > New Request. 2. Select 'Medical'. 3. Upload your medical certificate (PDF). 4. Submit for HOD approval. Policy: Minimum 2 days requires a certificate.";
            } else if (lowerInput.includes("attendance")) {
                responseText = "Your current overall attendance is 87%. You are above the 75% mandatory threshold. Keep it up!";
            } else if (lowerInput.includes("exam") || lowerInput.includes("timetable")) {
                responseText = "Mid-term exams start on Oct 15th. Data Structures is the first paper. You can view the full schedule in the 'Exams' tab.";
            } else if (lowerInput.includes("hackathon") || lowerInput.includes("event")) {
                responseText = "'Campus Hack 2024' is scheduled for Oct 25-27. Registration is open for teams of 2-4.";
            } else if (lowerInput.includes("mentor") || lowerInput.includes("contact")) {
                responseText = "Your mentor is Dr. Richard Roe (Senior Professor). You can find his contact details in the 'Overview' tab.";
            } else if (["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening"].some(greeting => lowerInput.includes(greeting))) {
                responseText = "Hello there! 👋 I'm your Campus Assistant. I can help you with exams 📝, hackathons 💻, leave policies 🏥, or checking your attendance 📊. What do you need help with today?";
            }

            setMessages(prev => [...prev, { id: Date.now().toString(), role: "bot", text: responseText }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] z-50 pointer-events-auto"
                    >
                        <Card className="h-full flex flex-col shadow-2xl border-primary/20 bg-background/80 backdrop-blur-xl">
                            <div className="p-4 border-b flex items-center justify-between bg-primary/10">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">Campus Assistant</h3>
                                        <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            Online
                                        </p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            <ScrollArea className="flex-1 p-4 overflow-y-auto">
                                <div className="space-y-4 pb-12">
                                    {messages.map((msg) => (
                                        <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                            <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.role === "user"
                                                ? "bg-primary text-primary-foreground rounded-br-none"
                                                : "bg-muted text-foreground rounded-bl-none border border-border"
                                                }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-muted text-foreground rounded-2xl rounded-bl-none border border-border p-3 flex gap-1 items-center">
                                                <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                                <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                                <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                            </div>
                                        </div>
                                    )}
                                    <div ref={scrollRef} />
                                </div>
                            </ScrollArea>

                            <div className="p-3 border-t bg-background/50">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSend();
                                    }}
                                    className="flex gap-2"
                                >
                                    <Input
                                        placeholder="Ask anything..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="bg-background"
                                    />
                                    <Button type="submit" size="icon" disabled={isTyping}>
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </form>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl flex items-center justify-center z-50 border-4 border-background/20"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-8 h-8" />}
            </motion.button>
        </>
    );
}
