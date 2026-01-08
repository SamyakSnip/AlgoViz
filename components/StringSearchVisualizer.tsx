
import React from "react";
import { useVisualizer } from "@/context/VisualizerContext";
import { motion } from "framer-motion";

export const StringSearchVisualizer = () => {
    const {
        lcsStrings, // reusing for Text:[0] and Pattern:[1]
        highlightIndices, // [textIdx, patternIdx]
        auxiliaryArray, // LPS array OR Hash Values [p, t]
        foundIndices,
        algorithm
    } = useVisualizer();

    const text = lcsStrings[0];
    const pattern = lcsStrings[1];

    // Current positions from highlightIndices
    const textIdx = highlightIndices[0] ?? -1;
    const patternIdx = highlightIndices[1] ?? -1;

    // Calculate pattern offset relative to text
    // If textIdx and patternIdx are active, the pattern is aligned such that pattern[patternIdx] is under text[textIdx].
    // So Pattern Start Index in Text Frame = textIdx - patternIdx
    const patternOffset = (textIdx !== -1 && patternIdx !== -1) ? textIdx - patternIdx : 0;

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-8 p-4">
            {/* Text Array */}
            <div className="flex flex-col items-center">
                <h3 className="text-slate-400 text-sm mb-2 font-mono">TEXT</h3>
                <div className="flex gap-1">
                    {text.split("").map((char, idx) => {
                        const isMatch = foundIndices.includes(idx);
                        const isCurrent = idx === textIdx;

                        let bgClass = "bg-slate-800/50 border-slate-700";
                        if (isMatch) bgClass = "bg-green-500/20 border-green-500 text-green-400";
                        else if (isCurrent) bgClass = "bg-blue-500/30 border-blue-500 text-blue-300";

                        return (
                            <motion.div
                                key={`text-${idx}`}
                                className={`w-10 h-10 md:w-12 md:h-12 border flex items-center justify-center rounded text-lg font-bold transition-colors ${bgClass}`}
                                animate={{ scale: isCurrent ? 1.1 : 1 }}
                            >
                                {char}
                                <span className="absolute -bottom-4 text-[10px] text-slate-500">{idx}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Sliding Pattern Array */}
            <div className="flex flex-col items-center w-full relative h-20">
                <h3 className="text-slate-400 text-sm mb-2 font-mono">PATTERN</h3>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-full">
                    {/* We assume the text is centered. We need to align pattern. 
                       Better approach: Render pattern strictly relative to text? 
                       Or simply center both and use translateX for pattern. 
                       Let's use static alignment for now assuming typical width.
                       Actually, let's just render the pattern row but offset it using marginLeft or transform.
                       We need to match the width of text cells (w-10 + gap-1 = 44px).
                   */}

                    <motion.div
                        className="flex gap-1"
                        animate={{ x: patternOffset * 44 }} // 40px + 4px gap approx? Tailw ind w-10 is 2.5rem=40px. gap-1 is 0.25rem=4px. Total 44px.
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{ marginLeft: `-${(text.length * 44) / 2}px` }} // Start from left of text? 
                    // It's tricky to align perfectly without fixed widths.
                    // Let's try a grid alignment approach.
                    >
                        {/* Ghost Spacer to align with start of text visually if needed? No, let's just slide. */}
                        {pattern.split("").map((char, idx) => {
                            const isCurrent = idx === patternIdx;
                            let bgClass = "bg-slate-700/50 border-slate-600";
                            if (isCurrent) bgClass = "bg-blue-500/30 border-blue-500 text-blue-300";

                            return (
                                <div
                                    key={`pat-${idx}`}
                                    className={`w-10 h-10 md:w-12 md:h-12 border flex items-center justify-center rounded text-lg font-bold ${bgClass}`}
                                >
                                    {char}
                                    <span className="absolute -bottom-4 text-[10px] text-slate-500">{idx}</span>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            {/* KMP: LPS Array */}
            {algorithm === "KMP" && (
                <div className="flex flex-col items-center mt-8">
                    <h3 className="text-slate-400 text-sm mb-2 font-mono">LPS Table (Longest Prefix Suffix)</h3>
                    <div className="flex gap-1">
                        {pattern.split("").map((_, idx) => (
                            <div key={`lps-idx-${idx}`} className="w-10 h-10 flex flex-col items-center justify-center">
                                <span className="text-xs text-slate-500 mb-1">{pattern[idx]}</span>
                                <div className="w-10 h-10 border border-slate-700 bg-slate-900 rounded flex items-center justify-center text-sm font-mono text-yellow-500">
                                    {auxiliaryArray[idx] !== undefined ? auxiliaryArray[idx] : "-"}
                                </div>
                                <span className="text-[10px] text-slate-600 mt-1">{idx}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Rabin-Karp: Hash Values */}
            {algorithm === "RABIN_KARP" && (
                <div className="flex gap-8 mt-8">
                    <div className="flex flex-col items-center">
                        <h3 className="text-slate-400 text-sm mb-2 font-mono">Pattern Hash</h3>
                        <div className="w-24 h-12 border border-blue-500/50 bg-blue-900/20 rounded flex items-center justify-center text-xl font-bold text-blue-400">
                            {auxiliaryArray[0] ?? "-"}
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-slate-400 text-sm mb-2 font-mono">Window Hash</h3>
                        <div className={`w-24 h-12 border rounded flex items-center justify-center text-xl font-bold transition-colors ${auxiliaryArray[0] === auxiliaryArray[1] ? "border-green-500/50 bg-green-900/20 text-green-400" : "border-slate-500/50 bg-slate-900/20 text-slate-400"}`}>
                            {auxiliaryArray[1] ?? "-"}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

