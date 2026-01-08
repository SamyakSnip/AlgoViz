"use client";

import React, { useEffect, useState, useRef } from "react";
import { useVisualizer } from "@/context/VisualizerContext";
import { DraggableControlWrapper } from "./DraggableControlWrapper";
import { PSEUDOCODE_DATA } from "@/lib/algorithms/pseudocode";
import { generateLog } from "@/lib/algorithms/logGenerator";
import { Code } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const PseudocodeViewer = () => {
    const { algorithm, steps, currentStep, isPlaying, isPseudocodeOpen } = useVisualizer();
    const [activeLine, setActiveLine] = useState<number>(-1);
    const [activeTab, setActiveTab] = useState<"code" | "log">("code");
    const logContainerRef = useRef<HTMLDivElement>(null);

    const pseudocode = PSEUDOCODE_DATA[algorithm];

    useEffect(() => {
        if (!pseudocode || currentStep < 0 || currentStep >= steps.length) {
            setActiveLine(-1);
            return;
        }

        const step = steps[currentStep];
        const line = pseudocode.getLine(step);
        setActiveLine(line);
    }, [currentStep, algorithm, steps, pseudocode]);

    // Auto-scroll logs
    useEffect(() => {
        if (activeTab === "log" && logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [currentStep, activeTab]);

    if (!isPseudocodeOpen || !pseudocode) return null;

    // Generate recent logs (slice from 0 to currentStep + 1)
    const logs = steps.slice(0, currentStep + 1);

    return (
        <DraggableControlWrapper
            className="w-80"
            style={{ top: "6rem", right: "1rem" }}
            title="Algorithm Details"
            icon={<Code size={16} className="text-purple-400" />}
        >
            {/* Tab Switcher */}
            <div className="flex items-center gap-1 p-1 bg-black/20 rounded mx-1 mb-2">
                <button
                    onClick={() => setActiveTab("code")}
                    className={`flex-1 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-colors ${activeTab === "code" ? "bg-purple-500/20 text-purple-200" : "text-slate-500 hover:text-slate-300"
                        }`}
                >
                    Pseudocode
                </button>
                <button
                    onClick={() => setActiveTab("log")}
                    className={`flex-1 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-colors ${activeTab === "log" ? "bg-purple-500/20 text-purple-200" : "text-slate-500 hover:text-slate-300"
                        }`}
                >
                    Activity Log
                </button>
            </div>

            <div className="flex flex-col gap-1 p-1 font-mono text-xs max-h-[400px]">
                {activeTab === "code" ? (
                    // Code View
                    <div className="overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-white/10">
                        {pseudocode.lines.map((line, idx) => {
                            const isActive = activeLine === idx;
                            return (
                                <div
                                    key={idx}
                                    className={`
                                        relative px-3 py-1.5 rounded transition-colors duration-200
                                        ${isActive ? "bg-purple-500/20 text-purple-200 font-bold" : "text-slate-500"}
                                    `}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeLine"
                                            className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-l"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className="whitespace-pre">{line}</span>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    // Log View
                    <div ref={logContainerRef} className="flex flex-col gap-1 overflow-y-auto h-[200px] pr-1 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
                        {logs.length === 0 ? (
                            <div className="text-slate-600 italic px-2 py-4 text-center">No activity yet...</div>
                        ) : (
                            logs.map((step, idx) => (
                                <div key={idx} className={`px-2 py-1 border-l-2 ${idx === currentStep ? "border-purple-500 bg-purple-500/10 text-slate-200" : "border-slate-700 text-slate-500"}`}>
                                    <span className="opacity-50 mr-2 text-[10px]">#{idx + 1}</span>
                                    <span>{generateLog(step, algorithm)}</span>
                                </div>
                            ))
                        )}
                        <div className="h-4" />
                    </div>
                )}

                {/* Status Bar */}
                <div className="mt-2 pt-2 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                    <span>{isPlaying ? "Running..." : "Paused"}</span>
                    <span>{activeTab === "code" ? `Line ${activeLine + 1}` : `Step ${currentStep + 1}`}</span>
                </div>
            </div>
        </DraggableControlWrapper>
    );
};
