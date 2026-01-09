import React, { useState, useEffect } from "react";
import { useVisualizer } from "@/context/VisualizerContext";

export const LCSControls = () => {
    const { lcsStrings, setLCSStrings, isPlaying } = useVisualizer();
    const [localStrings, setLocalStrings] = useState(lcsStrings);

    // Sync local state when external state changes (e.g. reset)
    useEffect(() => {
        setLocalStrings(lcsStrings);
    }, [lcsStrings]);

    const handleChange = (index: 0 | 1, value: string) => {
        const newStrings: [string, string] = [...localStrings];
        newStrings[index] = value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 10); // Limit length and chars
        setLocalStrings(newStrings);
    };

    const handleApply = () => {
        if (localStrings[0] && localStrings[1]) {
            setLCSStrings(localStrings);
        }
    };

    const handleRandomize = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomString = (len: number) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
        const newStrings: [string, string] = [randomString(Math.floor(Math.random() * 5) + 4), randomString(Math.floor(Math.random() * 5) + 4)];
        setLocalStrings(newStrings);
        setLCSStrings(newStrings);
    };

    return (
        <div className="absolute top-4 left-4 z-10 bg-slate-900/90 border border-white/10 p-3 md:p-4 rounded-lg shadow-xl backdrop-blur-md max-w-[calc(100vw-2rem)] md:max-w-none">
            <h3 className="text-xs md:text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">LCS Inputs</h3>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-500">String 1</label>
                    <input
                        type="text"
                        value={localStrings[0]}
                        onChange={(e) => handleChange(0, e.target.value)}
                        disabled={isPlaying}
                        className="bg-slate-800 border border-slate-700 rounded px-3 md:px-2 py-2 md:py-1 text-sm text-white focus:outline-none focus:border-[var(--primary)] uppercase min-h-[40px] md:min-h-0"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-500">String 2</label>
                    <input
                        type="text"
                        value={localStrings[1]}
                        onChange={(e) => handleChange(1, e.target.value)}
                        disabled={isPlaying}
                        className="bg-slate-800 border border-slate-700 rounded px-3 md:px-2 py-2 md:py-1 text-sm text-white focus:outline-none focus:border-[var(--primary)] uppercase min-h-[40px] md:min-h-0"
                    />
                </div>
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={handleApply}
                        disabled={isPlaying}
                        className="flex-1 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 text-[var(--primary)] border border-[var(--primary)]/50 rounded py-2 md:py-1 text-xs font-bold transition-colors disabled:opacity-50 min-h-[40px] md:min-h-0"
                    >
                        Apply
                    </button>
                    <button
                        onClick={handleRandomize}
                        disabled={isPlaying}
                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white rounded py-2 md:py-1 text-xs font-bold transition-colors disabled:opacity-50 min-h-[40px] md:min-h-0"
                    >
                        Random
                    </button>
                </div>
            </div>
        </div>
    );
};
