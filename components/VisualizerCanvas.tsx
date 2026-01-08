"use client";

import React from "react";
import { useVisualizer } from "@/context/VisualizerContext";
import { motion, AnimatePresence } from "framer-motion";

import { Grid } from "./Grid";
import { ChessBoard } from "./ChessBoard";
import { SudokuBoard } from "./SudokuBoard";
import { DPTable } from "./DPTable";
import { LCSControls } from "./LCSControls";
import { StringSearchVisualizer } from "./StringSearchVisualizer";
import { DataStructureVisualizer } from "./DataStructureVisualizer";
import { DSControls } from "./DSControls";
import { TreeVisualizer } from "./TreeVisualizer";
import { TreeControls } from "./TreeControls";
import { GraphVisualizer } from "./GraphVisualizer";
import { GraphControls } from "./GraphControls";
import { Legend } from "./Legend";


export const VisualizerCanvas = () => {
    const { array, algorithm, highlightIndices, swapIndices, foundIndices, targetIndices, auxiliaryArray, buckets, hiddenIndices, isSorted } = useVisualizer();

    const isSortingOrSearching = ["BUBBLE", "SELECTION", "INSERTION", "MERGE", "QUICK", "HEAP", "SHELL", "COUNTING", "RADIX", "BUCKET", "LINEAR", "BINARY", "LIS"].includes(algorithm);
    const isBlockAlgo = algorithm === "RADIX" || algorithm === "BUCKET";
    const isDPTableAlgo = algorithm === "KNAPSACK" || algorithm === "LCS";
    const isStringAlgo = algorithm === "KMP" || algorithm === "RABIN_KARP";
    const isDS = algorithm === "STACK" || algorithm === "QUEUE" || algorithm === "LINKED_LIST";
    const isTree = algorithm === "BST" || algorithm === "AVL";
    const isGraph = algorithm === "SCC";





    return (
        <main className="flex-1 p-6 relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-transparent to-black/20">
            {isSortingOrSearching && (
                <>
                    {/* Block View (For Radix/Bucket Sort) */}
                    {isBlockAlgo && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            {/* Main Array Blocks */}
                            <div className="flex gap-1 mb-10 items-end h-24 w-full overflow-x-auto px-4 justify-start pb-4">
                                {array.map((value, idx) => {
                                    const isHidden = hiddenIndices.includes(idx);
                                    let bgClass = "bg-white/10";
                                    let borderClass = "border-white/20";

                                    if (highlightIndices.includes(idx)) {
                                        bgClass = "bg-blue-500";
                                        borderClass = "border-blue-400";
                                    }

                                    return (
                                        <div
                                            key={`block-${idx}`}
                                            className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 border rounded flex items-center justify-center text-xs md:text-sm font-mono transition-all duration-300 ${bgClass} ${borderClass}`}
                                            style={{
                                                opacity: isHidden ? 0 : 1,
                                                transform: isHidden ? 'scale(0)' : 'scale(1)'
                                            }}
                                        >
                                            {value}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Buckets */}
                            <div className="flex gap-2 md:gap-4 mt-4 w-full overflow-x-auto px-4 justify-start pb-4">
                                {buckets.map((bucket, bIdx) => (
                                    <div key={`bucket-${bIdx}`} className="flex-shrink-0 flex flex-col items-center gap-1">
                                        <div className="w-10 md:w-14 h-48 md:h-64 border-2 border-slate-600 rounded-b-lg bg-slate-800/50 flex flex-col-reverse p-1 overflow-y-auto overflow-x-hidden relative scrollbar-thin scrollbar-thumb-slate-600">
                                            <AnimatePresence mode="popLayout">
                                                {bucket.map((val, itemIdx) => (
                                                    <motion.div
                                                        key={`${bIdx}-${itemIdx}-${val}`}
                                                        layout
                                                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0 }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                                        className="w-full h-8 min-h-[2rem] bg-indigo-500 rounded flex flex-shrink-0 items-center justify-center text-xs text-white font-bold mb-1 border border-indigo-400 shadow-sm z-10"
                                                    >
                                                        {val}
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                        <span className="text-slate-400 font-mono text-sm font-bold bg-slate-900/80 px-2 rounded">{bIdx}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Standard Bar View (For other sorts) */}
                    {!isBlockAlgo && (
                        <div className="flex items-end justify-center gap-[2px] w-full h-full max-h-[600px]">
                            <AnimatePresence>
                                {array.map((value, idx) => {
                                    let barColor = "rgba(255, 255, 255, 0.1)";
                                    let glow = "";

                                    if (isSorted && !foundIndices.includes(idx) && algorithm !== "LINEAR" && algorithm !== "BINARY") {
                                        barColor = "var(--primary)";
                                        glow = "0 0 20px var(--primary)";
                                    } else if (foundIndices.includes(idx)) {
                                        barColor = "#22c55e"; // Green
                                        glow = "0 0 20px #22c55e";
                                    } else if (targetIndices.includes(idx)) {
                                        barColor = "#ef4444"; // Red - Target
                                        glow = "0 0 20px #ef4444";
                                    } else if (swapIndices.includes(idx)) {
                                        barColor = "#ef4444"; // Red
                                        glow = "0 0 20px #ef4444";
                                    } else if (highlightIndices.includes(idx)) {
                                        barColor = "var(--secondary)"; // Blue
                                    }

                                    return (
                                        <motion.div
                                            key={idx}
                                            layout
                                            initial={{ opacity: 0, scaleY: 0 }}
                                            animate={{
                                                opacity: 1,
                                                scaleY: 1,
                                                height: `${value}%`,
                                                backgroundColor: barColor,
                                                boxShadow: glow
                                            }}
                                            transition={{ duration: 0.1 }}
                                            className="w-full rounded-t-sm relative group"
                                        >
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Auxiliary Array Visualization (for Counting Sort ONLY) - Radix uses Buckets above */}
                    {auxiliaryArray.length > 0 && (algorithm === "COUNTING" || algorithm === "LIS") && (
                        <div className="absolute bottom-24 left-0 right-0 flex justify-center items-end h-20 gap-[2px] px-6">
                            {auxiliaryArray.map((val, idx) => (
                                <div key={idx} className="relative flex flex-col items-center group">
                                    <div
                                        className="w-full min-w-[10px] bg-slate-700/50 border border-white/10 rounded-sm transition-all duration-100 flex items-center justify-center text-[8px] text-white/70 overflow-hidden"
                                        style={{ height: `${Math.min(val * 2, 80)}px` }} // Scale height for visibility
                                    >
                                        {val > 0 && val}
                                    </div>
                                    <span className="text-[8px] text-gray-600 mt-1">{idx}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <Legend />
                </>
            )}

            {algorithm === "NQUEENS" && (
                <div className="w-full h-full flex items-center justify-center">
                    <ChessBoard />
                </div>
            )}

            {algorithm === "SUDOKU" && (
                <div className="w-full h-full flex items-center justify-center">
                    <SudokuBoard />
                </div>
            )}

            {isDPTableAlgo && (
                <div className="w-full h-full flex items-center justify-center relative">
                    {algorithm === "LCS" && <LCSControls />}
                    <DPTable />
                </div>
            )}

            {isStringAlgo && (
                <div className="w-full h-full flex items-center justify-center relative">
                    <LCSControls />
                    <StringSearchVisualizer />
                </div>
            )}

            {isDS && (
                <div className="w-full h-full flex items-center justify-center relative">
                    <DSControls />
                    <DataStructureVisualizer />
                </div>
            )}

            {isTree && (
                <div className="w-full h-full flex items-center justify-center relative">
                    <TreeControls />
                    <TreeVisualizer />
                </div>
            )}

            {isGraph && (
                <div className="w-full h-full flex items-center justify-center relative">
                    <GraphControls />
                    <GraphVisualizer />
                </div>
            )}


            {!isSortingOrSearching && !isDPTableAlgo && !isStringAlgo && !isDS && !isTree && !isGraph && algorithm !== "NQUEENS" && algorithm !== "SUDOKU" && (
                <div className="w-full h-full flex items-center justify-center">


                    <Grid />


                </div>
            )}
        </main>
    );
};
