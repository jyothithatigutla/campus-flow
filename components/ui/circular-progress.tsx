"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number
    max?: number
}

export function CircularProgress({ value, max = 100, className, ...props }: CircularProgressProps) {
    const radius = 20;
    const stroke = 4;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / max) * circumference;

    return (
        <div
            className={cn("relative flex items-center justify-center", className)}
            {...props}
        >
            <svg
                height={radius * 2}
                width={radius * 2}
                className="rotate-[-90deg]"
            >
                <circle
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="text-white/20"
                />
                <circle
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="text-white transition-all duration-500 ease-in-out"
                />
            </svg>
            <div className="absolute text-xs font-bold text-white">
                {Math.round(value)}%
            </div>
        </div>
    )
}
