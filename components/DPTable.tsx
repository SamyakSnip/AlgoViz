import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVisualizer } from "@/context/VisualizerContext";

export const DPTable = () => {
    const { dpTable, dpLabels, highlightIndices, targetIndices, foundIndices, problemStatement } = useVisualizer();

    if (!dpTable || dpTable.length === 0) return null;

    return (
        <div className="flex flex-col items-center justify-center p-4 overflow-auto max-w-full max-h-full">
            {problemStatement && (
                <div className="mb-4 bg-slate-900/80 p-4 rounded-lg border border-white/10 text-sm whitespace-pre-wrap font-mono text-slate-300 shadow-lg">
                    {problemStatement}
                </div>
            )}
            <div className="flex">
                {/* Corner Spacer */}
                <div className="w-12 h-10 md:w-16 md:h-12 flex-shrink-0" />

                {/* Column Headers */}
                <div className="flex">
                    {dpLabels.col.map((label, i) => (
                        <div key={`col-${i}`} className="w-12 h-10 md:w-16 md:h-12 flex items-center justify-center font-bold text-slate-400 text-xs md:text-sm border-b border-white/10">
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col">
                {dpTable.map((row, rIdx) => (
                    <div key={`row-${rIdx}`} className="flex">
                        {/* Row Header */}
                        <div className="w-12 h-10 md:w-16 md:h-12 flex items-center justify-center font-bold text-slate-400 text-xs md:text-sm border-r border-white/10 flex-shrink-0">
                            {dpLabels.row[rIdx] || rIdx}
                        </div>

                        {/* Cells */}
                        {row.map((cell, cIdx) => {
                            // Determine cell status
                            // For DP matrix, we usually track single cell updates.
                            // We can map linear indices to 2D if needed, BUT context uses linear indices for 'highlightIndices'.
                            // However, we added 'updateTable' logic?
                            // Wait, standardized 'overwrite' uses linear index?
                            // For DP, we might need a custom mapping or just assume we pass [row, col] to generic handlers?
                            // Standard animation step uses 'indices: number[]'.
                            // If we use [row, col] format for indices in DP algos, we need to check:
                            // indices[0] == rIdx && indices[1] == cIdx

                            // Let's assume indices = [r, c] for DP algorithms.
                            const isHighlighted = highlightIndices.length === 2 && highlightIndices[0] === rIdx && highlightIndices[1] === cIdx;
                            const isTarget = targetIndices.length === 2 && targetIndices[0] === rIdx && targetIndices[1] === cIdx;
                            const isFound = foundIndices.some(idx => false); // Complex to map array of [r,c] if foundIndices is flat number[]

                            // We need to support 2D check for 'foundIndices' if it contains pairs?
                            // Currently foundIndices is number[].
                            // We should probably just check if any pair in a special 'dpFoundIndices' matches?
                            // OR, use 1D flattening for indices: index = r * cols + c?
                            // Flattening is safer for existing types.
                            // Let's use Flattening in Algorithm implementation!
                            // index = r * dpTable[0].length + c

                            const flatIdx = rIdx * row.length + cIdx;
                            const isActive = highlightIndices.includes(flatIdx);
                            const isTargetCell = targetIndices.includes(flatIdx); // e.g. looking at previous value
                            const isFinished = foundIndices.includes(flatIdx); // e.g. part of final path

                            let bgClass = "bg-transparent";
                            if (isFinished) bgClass = "bg-green-500/20 text-green-400 border-green-500/50";
                            else if (isTargetCell) bgClass = "bg-red-500/20 text-red-400 border-red-500/50";
                            else if (isActive) bgClass = "bg-blue-500/20 text-blue-400 border-blue-500/50";

                            return (
                                <motion.div
                                    key={`${rIdx}-${cIdx}`}
                                    className={`w-12 h-10 md:w-16 md:h-12 border border-white/5 flex items-center justify-center text-sm md:text-base transition-colors duration-200 ${bgClass}`}
                                    initial={false}
                                    animate={{
                                        backgroundColor: isActive ? "rgba(59, 130, 246, 0.3)" :
                                            isTargetCell ? "rgba(239, 68, 68, 0.3)" :
                                                isFinished ? "rgba(34, 197, 94, 0.3)" : "rgba(255,255,255,0.02)"
                                    }}
                                >
                                    {cell !== null ? cell : ""}
                                </motion.div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};
