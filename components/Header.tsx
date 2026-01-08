"use client";

import React from "react";
import { useVisualizer } from "@/context/VisualizerContext";
import { Play, RotateCcw, Shuffle, Square, Menu, X, Code } from "lucide-react";
import { generateSteps } from "@/lib/algorithms/algorithmRegistry";
import { recursiveDivisionMaze } from "@/lib/algorithms/maze/recursiveDivision";

export const Header = () => {
    const {
        array,
        grid,
        algorithm,
        isPlaying,
        resetArray,
        speed,
        setSpeed,
        runAnimation,
        stopAnimation,
        clearBoard,
        lcsStrings,
        isSidebarOpen,
        setIsSidebarOpen,
        isPseudocodeOpen,
        setIsPseudocodeOpen
    } = useVisualizer();

    const isPathfinding = [
        "DIJKSTRA", "ASTAR", "BFS", "DFS", "GREEDY_BFS", "BIDIRECTIONAL",
        "JPS", "PRIMS", "KRUSKALS", "CONNECTED_COMPONENTS"
    ].includes(algorithm);

    const handlePlay = () => {
        const steps = generateSteps(algorithm, array, grid, lcsStrings);
        if (steps && steps.length > 0) {
            runAnimation(steps);
        } else {
            console.log("No steps generated or algorithm not implemented:", algorithm);
        }
    };

    const handleGenerateMaze = () => {
        if (!grid || grid.length === 0) return;
        clearBoard();

        setTimeout(() => {
            let startNode, finishNode;
            for (const row of grid) {
                for (const node of row) {
                    if (node.isStart) startNode = node;
                    if (node.isFinish) finishNode = node;
                }
            }
            if (!startNode || !finishNode) return;

            const steps = recursiveDivisionMaze(grid, startNode, finishNode);
            runAnimation(steps);
        }, 100);
    };

    const handleReset = () => {
        if (isPathfinding) {
            clearBoard();
        } else {
            resetArray();
        }
    };

    return (
        <header className="h-16 border-b border-[var(--border)] bg-[var(--card)]/50 backdrop-blur flex items-center justify-between px-6 sticky top-0 z-50">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 -ml-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 md:hidden"
                    aria-label="Toggle Menu"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center font-bold text-black">
                        AV
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-white">
                        Algo<span className="text-[var(--primary)]">Viz</span>
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 mr-4">
                    <span className="text-xs text-gray-400">Speed</span>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="w-24 accent-[var(--primary)] h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        disabled={isPlaying}
                    />
                </div>

                <div className="h-6 w-px bg-white/10 mx-2" />

                <button
                    onClick={() => setIsPseudocodeOpen(!isPseudocodeOpen)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isPseudocodeOpen
                            ? "bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                            : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                        }`}
                >
                    <Code size={16} />
                    <span className="hidden md:inline">Pseudocode</span>
                </button>

                <div className="h-6 w-px bg-white/10 mx-2" />

                <button
                    onClick={handleReset}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white disabled:opacity-50"
                    disabled={isPlaying}
                    title={isPathfinding ? "Clear Board" : "Generate New Array"}
                >
                    {isPathfinding ? <RotateCcw size={20} /> : <Shuffle size={20} />}
                </button>

                {isPathfinding && (
                    <button
                        onClick={handleGenerateMaze}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white disabled:opacity-50"
                        disabled={isPlaying}
                        title="Generate Maze"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-7" /><path d="M12 7V2" /><path d="M7 22l5-5 5 5" /><path d="M7 2l5 5 5-5" /><path d="M8 12h8" /></svg>
                    </button>
                )}

                {isPlaying ? (
                    <button
                        onClick={stopAnimation}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]"
                    >
                        <Square size={18} fill="currentColor" />
                        <span>Stop</span>
                    </button>
                ) : (
                    <button
                        onClick={handlePlay}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-black font-bold rounded-lg hover:bg-[var(--primary)]/90 transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(0,255,157,0.3)] hover:shadow-[0_0_25px_rgba(0,255,157,0.5)]"
                    >
                        <Play size={18} fill="currentColor" />
                        <span>Visualize</span>
                    </button>
                )}
            </div>
        </header>
    );
};
