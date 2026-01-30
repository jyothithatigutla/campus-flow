"use client";

import { useMotionValue, useSpring, motion } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

function LiquidOoze({ color, x, y, size, duration, delay = 0 }: {
    color: string,
    x: string,
    y: string,
    size: number,
    duration: number,
    delay?: number
}) {
    return (
        <motion.div
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: size,
                height: size,
                borderRadius: "50%",
                background: color,
            }}
            animate={{
                x: [0, 150, -150, 0],
                y: [0, -100, 100, 0],
                scale: [1, 1.4, 0.7, 1],
                rotate: [0, 180, 0],
            }}
            transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
            }}
            className="blur-[120px] opacity-40 mix-blend-multiply"
        />
    );
}

export default function LiquidMeshBackground() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { damping: 30, stiffness: 50 });
    const springY = useSpring(mouseY, { damping: 30, stiffness: 50 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#FAFAFA] pointer-events-none">
            {/* Magnetic Globe Light - High Intensity for visibility */}
            <motion.div
                style={{
                    position: "absolute",
                    left: springX,
                    top: springY,
                    x: "-50%",
                    y: "-50%",
                }}
                className="pointer-events-none z-10"
            >
                {/* Outer Glow */}
                <div className="w-[850px] h-[850px] bg-blue-500/30 rounded-full blur-[130px]" />

                {/* Secondary Halo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-blue-400/40 rounded-full blur-[80px]" />

                {/* Bright Central Globe */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-white/50 rounded-full blur-[40px] shadow-[0_0_120px_rgba(59,130,246,0.5)]" />

                {/* Core Hot Spot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-white/90 rounded-full blur-[10px] shadow-[0_0_40px_rgba(255,255,255,0.8)]" />
            </motion.div>

            {/* Oozing Liquid Layers - More Vibrant & Overlapping */}
            <LiquidOoze color="#dbeafe" x="-5%" y="-5%" size={900} duration={14} />
            <LiquidOoze color="#ede9fe" x="65%" y="45%" size={1000} duration={18} delay={2} />
            <LiquidOoze color="#e0f2fe" x="15%" y="75%" size={850} duration={16} delay={5} />
            <LiquidOoze color="#f5f3ff" x="75%" y="-15%" size={700} duration={12} />
            <LiquidOoze color="#eff6ff" x="-10%" y="40%" size={950} duration={22} delay={1} />
            <LiquidOoze color="#f3e8ff" x="25%" y="85%" size={800} duration={20} delay={4} />

            {/* High-Resolution Noise Layer (Premium Touch) */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-20" />
        </div>
    );
}
