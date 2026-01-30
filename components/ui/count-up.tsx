"use client";

import { useEffect, useState } from "react";

interface CountUpProps {
    end: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
}

export function CountUp({ end, duration = 2, prefix = "", suffix = "" }: CountUpProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const startValue = 0;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);

            if (progress < 1) {
                setCount(Math.floor(startValue + (end - startValue) * progress));
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration]);

    return (
        <span>
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
}
