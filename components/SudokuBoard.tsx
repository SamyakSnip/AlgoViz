"use client";

import React from "react";
import { useVisualizer } from "@/context/VisualizerContext";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

export const SudokuBoard = () => {
    const { array, highlightIndices, foundIndices, targetIndices } = useVisualizer();
    // Array should be length 81.
    // We visualize it as 9x9 grid.

    const renderCell = (row: number, col: number) => {
        const index = row * 9 + col;
        const val = array[index];

        // Determine borders for 3x3 subgrids
        const borderRight = (col + 1) % 3 === 0 && col !== 8 ? "border-r-4 border-slate-600" : "border-r border-slate-700";
        const borderBottom = (row + 1) % 3 === 0 && row !== 8 ? "border-b-4 border-slate-600" : "border-b border-slate-700";

        const isComparing = highlightIndices.includes(index); // checking
        const isPlaced = foundIndices.includes(index); // Just placed/Safe
        const isBacktracked = targetIndices.includes(index); // Removed/Backtracked

        let bgClass = "bg-[#1a1a1a]";
        if (isComparing) bgClass = "bg-blue-500/50";
        if (isPlaced) bgClass = "bg-green-500/50";
        if (isBacktracked) bgClass = "bg-red-500/50";

        return (
            <div
                key={`${row}-${col}`}
                className={clsx(
                    "flex items-center justify-center text-xl sm:text-2xl font-bold transition-colors duration-100",
                    borderRight,
                    borderBottom,
                    bgClass,
                    // val === 0 ? "text-transparent" : "text-white"
                )}
                style={{ width: '100%', aspectRatio: '1/1' }}
            >
                {val !== 0 && (
                    <motion.span
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        key={val} // Re-animate on number change
                        className="drop-shadow-md"
                    >
                        {val}
                    </motion.span>
                )}
            </div>
        );
    };

    return (
        <div className="flex items-center justify-center p-4 w-full h-full max-w-lg mx-auto">
            <div className="grid grid-cols-9 w-full border-4 border-slate-600 rounded-lg overflow-hidden bg-slate-800 shadow-2xl">
                {Array.from({ length: 9 }).map((_, r) =>
                    Array.from({ length: 9 }).map((_, c) => renderCell(r, c))
                )}
            </div>
        </div>
    );
};
