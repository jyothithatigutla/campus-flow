"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Trophy, ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const QUESTIONS = [
    {
        question: "What is the 'Critical Section' problem in Operating Systems?",
        options: [
            "A section of code that must be executed by multiple processes simultaneously.",
            "A section of code where shared resources are accessed and must be executed by only one process at a time.",
            "A section of the kernel that is unstable and prone to crashing.",
            "A hardware component that handles process scheduling."
        ],
        correct: 1
    },
    {
        question: "What is Peterson's Solution used for?",
        options: [
            "Improving CPU clock speed.",
            "Solving the Producer-Consumer problem in hardware.",
            "A software-based solution to the critical section problem for two processes.",
            "Allocating virtual memory to processes."
        ],
        correct: 2
    },
    {
        question: "Which of these is a hardware-based solution for synchronization?",
        options: [
            "Semaphores",
            "Peterson's Solution",
            "Test-and-Set instruction",
            "Mutex Locks"
        ],
        correct: 2
    }
];

export function AIQuiz() {
    const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const handleNext = () => {
        if (selectedOption === QUESTIONS[currentQuestion].correct) {
            setScore(score + 1);
        }

        if (currentQuestion + 1 < QUESTIONS.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
        } else {
            setStep('result');
        }
    };

    const reset = () => {
        setStep('intro');
        setCurrentQuestion(0);
        setScore(0);
        setSelectedOption(null);
    };

    if (step === 'intro') {
        return (
            <div className="py-8 text-center space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto border border-amber-100 shadow-xl shadow-amber-500/10">
                    <Trophy className="w-10 h-10 text-amber-500" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-[#1E293B]">5-Min Quick Quiz</h3>
                    <p className="text-sm font-medium text-slate-500 px-8">Test your knowledge on Process Synchronization from yesterday's OS lecture.</p>
                </div>
                <Button onClick={() => setStep('quiz')} className="bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-widest px-8 h-12 rounded-2xl shadow-lg">
                    Start Quiz Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        );
    }

    if (step === 'quiz') {
        const q = QUESTIONS[currentQuestion];
        return (
            <div className="py-6 space-y-8 animate-in slide-in-from-right-4 duration-300">
                <div className="flex justify-between items-center px-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Question {currentQuestion + 1} of {QUESTIONS.length}</p>
                    <div className="flex gap-1">
                        {QUESTIONS.map((_, i) => (
                            <div key={i} className={cn("h-1 rounded-full transition-all", i <= currentQuestion ? "w-6 bg-purple-500" : "w-2 bg-slate-100")} />
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h4 className="text-xl font-bold text-[#1E293B] leading-tight px-1">{q.question}</h4>
                    <div className="grid gap-3">
                        {q.options.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedOption(i)}
                                className={cn(
                                    "p-4 text-left text-sm rounded-2xl border transition-all duration-300 font-medium",
                                    selectedOption === i
                                        ? "bg-purple-50 border-purple-200 text-purple-700 shadow-md translate-x-1"
                                        : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50 hover:border-slate-200"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0",
                                        selectedOption === i ? "bg-purple-500 text-white" : "bg-slate-50 text-slate-400"
                                    )}>
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                    {opt}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <Button
                    disabled={selectedOption === null}
                    onClick={handleNext}
                    className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-purple-500/20 disabled:opacity-50"
                >
                    {currentQuestion + 1 === QUESTIONS.length ? "Finish Quiz" : "Next Question"}
                </Button>
            </div>
        );
    }

    return (
        <div className="py-8 text-center space-y-8 animate-in zoom-in duration-500">
            <div className="space-y-4">
                <div className="relative inline-block">
                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-amber-400 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg">
                        +{score * 10} XP
                    </div>
                </div>
                <div className="space-y-1">
                    <h3 className="text-3xl font-black text-[#1E293B]">All Done!</h3>
                    <p className="text-sm font-medium text-slate-500">You scored <span className="text-purple-600 font-black">{score} out of {QUESTIONS.length}</span></p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Accuracy</p>
                    <h4 className="text-2xl font-black text-slate-700">{Math.round((score / QUESTIONS.length) * 100)}%</h4>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Level Progress</p>
                    <h4 className="text-2xl font-black text-slate-700">+8.5%</h4>
                </div>
            </div>

            <div className="flex gap-3">
                <Button onClick={reset} variant="outline" className="h-12 flex-1 rounded-2xl border-slate-200 text-slate-500 font-black uppercase tracking-widest">
                    <RotateCcw className="w-4 h-4 mr-2" /> Retry
                </Button>
                <Button onClick={() => window.location.reload()} className="h-12 flex-[2] bg-purple-600 hover:bg-purple-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg">
                    Return to Home
                </Button>
            </div>
        </div>
    );
}
