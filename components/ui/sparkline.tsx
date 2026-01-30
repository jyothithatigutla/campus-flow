"use client";

import { motion } from "framer-motion";

export function Sparkline({ data, color = "#2563eb" }: { data: number[], color?: string }) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    const width = 100;
    const height = 30;

    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        return `${x},${y}`;
    }).join(" ");

    return (
        <div className="w-20 h-8 opacity-40 group-hover:opacity-100 transition-opacity">
            <svg viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
                <motion.polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </svg>
        </div>
    );
}
