"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Plus, CreditCard, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export function CampusWalletWidget() {
    return (
        <Card className="border-0 bg-[#0F172A] p-8 rounded-[24px] shadow-2xl shadow-blue-900/10 text-white relative overflow-hidden group">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative z-10 space-y-8">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">Campus Wallet</p>
                        <h4 className="text-4xl font-black tracking-tight leading-none">$1,450.00</h4>
                    </div>
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#0047AB] transition-all">
                        <Wallet className="w-6 h-6" />
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button
                        className="flex-1 h-12 bg-[#0047AB] hover:bg-[#003087] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 gap-2"
                        onClick={() => toast.success("Top-up portal opening...")}
                    >
                        <Plus className="w-4 h-4" /> Add Money
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1 h-12 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl font-black text-[10px] uppercase tracking-widest gap-2"
                        onClick={() => toast.info("Redirecting to fee portal...")}
                    >
                        <CreditCard className="w-4 h-4" /> Pay Fee
                    </Button>
                </div>
            </div>
        </Card>
    );
}

export function MentorConsultancyWidget() {
    return (
        <Card className="border-0 bg-white p-8 rounded-[24px] shadow-sm space-y-8 flex flex-col items-center text-center group">
            <div className="w-full flex justify-between items-center mb-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Consultancy</p>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-[#F8FAFC] overflow-hidden shadow-inner group-hover:scale-110 transition-transform">
                    <img
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
                        alt="Mentor"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <h4 className="text-2xl font-black text-[#1E293B] tracking-tight uppercase leading-none">Dr. Rajesh Kumar</h4>
                <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase italic leading-none">Senior Mentor • CS Dept</p>
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
                <Button
                    className="h-12 bg-[#F8FAFC] hover:bg-blue-50 text-[#0047AB] border border-slate-50 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm flex items-center justify-center gap-2"
                    onClick={() => toast.info("Opening email client...")}
                >
                    <Mail className="w-4 h-4" /> Email
                </Button>
                <Button
                    className="h-12 bg-[#0047AB] hover:bg-[#003087] text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
                    onClick={() => toast.info("Starting chat session...")}
                >
                    <MessageSquare className="w-4 h-4" /> Chat
                </Button>
            </div>
            <div className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#0047AB]" />
                    <p className="text-[9px] font-black text-[#1E293B] uppercase tracking-widest">Upcoming Session</p>
                </div>
                <p className="text-[9px] font-bold text-slate-400 uppercase">2:30 PM</p>
            </div>
        </Card>
    );
}
