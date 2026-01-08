"use client";

import React from "react";
import { useVisualizer } from "@/context/VisualizerContext";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

export const ChessBoard = () => {
    const { array, algorithm, highlightIndices, foundIndices, targetIndices } = useVisualizer();
    // For N-Queens, we can use the 'array' to represent the board state ? 
    // Or we might need a specific 'board' state in context.
    // However, usually for N-Queens, array[row] = col represents a queen at (row, col).
    // Let's assume we use the main 'array' variable where index=row, value=col.
    // If value is -1, no queen in that row.

    // For 8x8 board
    const N = 8;
    const board = Array.from({ length: N }, (_, row) =>
        Array.from({ length: N }, (_, col) => {
            const isDark = (row + col) % 2 === 1;
            return { row, col, isDark };
        })
    );

    return (
        <div className="flex items-center justify-center p-8">
            <div className="grid grid-cols-8 border-4 border-[#333] shadow-2xl bg-[#1a1a1a]">
                {board.map((row, rIdx) => (
                    row.map((cell, cIdx) => {
                        // Check if there is a queen here
                        // We will map 'array' indices to rows. array[rIdx] === cIdx means Queen at (rIdx, cIdx).
                        const hasQueen = array[rIdx] === cIdx;

                        // Check if this cell is being considered/highlighted
                        // We might use highlightIndices to show "checking (r, c)"
                        // Flatten index for highlight: rIdx * N + cIdx ? 
                        // Or just use specific logic. Let's assume flat index for simplicity in Context if needed,
                        // but for specific row/col highlighting, we might need a better system or just reuse 'highlightIndices' with flat math.
                        const flatIdx = rIdx * N + cIdx;
                        const isComparing = highlightIndices.includes(flatIdx);
                        const isSafe = foundIndices.includes(flatIdx); // Maybe 'found' means placed/safe?
                        const isAttacked = targetIndices.includes(flatIdx); // Maybe 'target' means attack/conflict?

                        return (
                            <div
                                key={`${rIdx}-${cIdx}`}
                                className={clsx(
                                    "w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-3xl transition-colors duration-300",
                                    cell.isDark ? "bg-[#779556]" : "bg-[#ebecd0]", // Classic Chess colors
                                    isComparing && "!bg-blue-400 opacity-80",
                                    isAttacked && "!bg-red-500 opacity-80",
                                    isSafe && "!bg-green-500 opacity-80"
                                )}
                            >
                                <AnimatePresence>
                                    {hasQueen && (
                                        <motion.span
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="drop-shadow-lg"
                                        >
                                            ♛
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })
                ))}
            </div>
        </div>
    );
};
