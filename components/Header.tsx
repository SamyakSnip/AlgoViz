"use client";

import React from "react";
import { useVisualizer } from "@/context/VisualizerContext";
import { Play, RotateCcw, Shuffle, Square, Menu, X, Code, ChevronDown, Info } from "lucide-react";
import { generateSteps } from "@/lib/algorithms/algorithmRegistry";
import { recursiveDivisionMaze } from "@/lib/algorithms/maze/recursiveDivision";
import { primsMaze } from "@/lib/algorithms/maze/primsMaze";
import { binaryTreeMaze } from "@/lib/algorithms/maze/binaryTreeMaze";

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
        setIsPseudocodeOpen,
        generateGraph
    } = useVisualizer();

    const [mazeAlgorithm, setMazeAlgorithm] = React.useState<"recursive" | "prims" | "binary">("recursive");
    const [showMazeMenu, setShowMazeMenu] = React.useState(false);
    const [showLegend, setShowLegend] = React.useState(false);

    const isPathfinding = [
        "DIJKSTRA", "ASTAR", "BFS", "DFS", "GREEDY_BFS", "BIDIRECTIONAL",
        "JPS", "PRIMS", "KRUSKALS", "CONNECTED_COMPONENTS"
    ].includes(algorithm);

    const isGraph = ["PRIMS", "KRUSKALS", "CONNECTED_COMPONENTS", "TOPOLOGICAL_SORT", "SCC"].includes(algorithm);

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

            let steps;
            switch (mazeAlgorithm) {
                case "prims":
                    steps = primsMaze(grid, startNode, finishNode);
                    break;
                case "binary":
                    steps = binaryTreeMaze(grid, startNode, finishNode);
                    break;
                case "recursive":
                default:
                    steps = recursiveDivisionMaze(grid, startNode, finishNode);
                    break;
            }
            runAnimation(steps);
            setShowMazeMenu(false);
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
        <header className="h-16 border-b border-[var(--border)] bg-[var(--card)]/50 backdrop-blur flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
            <div className="flex items-center gap-2 md:gap-4">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 md:p-2 -ml-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Toggle Menu"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center font-bold text-black">
                        AV
                    </div>
                    <h1 className="text-lg md:text-xl font-bold tracking-tight text-white">
                        Algo<span className="text-[var(--primary)]">Viz</span>
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                {/* Speed Control - Desktop */}
                <div className="hidden md:flex items-center gap-2 mr-4">
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

                {/* Speed Control - Mobile (Preset Buttons) */}
                <div className="flex md:hidden items-center gap-1">
                    <button
                        onClick={() => setSpeed(20)}
                        className={`px-2 py-1 text-xs rounded ${speed <= 30 ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400'}`}
                        disabled={isPlaying}
                    >
                        Slow
                    </button>
                    <button
                        onClick={() => setSpeed(50)}
                        className={`px-2 py-1 text-xs rounded ${speed > 30 && speed <= 70 ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400'}`}
                        disabled={isPlaying}
                    >
                        Med
                    </button>
                    <button
                        onClick={() => setSpeed(90)}
                        className={`px-2 py-1 text-xs rounded ${speed > 70 ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400'}`}
                        disabled={isPlaying}
                    >
                        Fast
                    </button>
                </div>

                <div className="h-6 w-px bg-white/10 mx-1 md:mx-2 hidden md:block" />

                <button
                    onClick={() => setIsPseudocodeOpen(!isPseudocodeOpen)}
                    className={`flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg text-sm font-medium transition-all min-w-[44px] min-h-[44px] justify-center ${isPseudocodeOpen
                        ? "bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                        : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                        }`}
                >
                    <Code size={18} />
                    <span className="hidden md:inline">Pseudocode</span>
                </button>

                <div className="h-6 w-px bg-white/10 mx-1 md:mx-2 hidden md:block" />

                <button
                    onClick={handleReset}
                    className="p-2 md:p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white disabled:opacity-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    disabled={isPlaying}
                    title={isPathfinding ? "Clear Board" : "Generate New Array"}
                >
                    {isPathfinding ? <RotateCcw size={20} /> : <Shuffle size={20} />}
                </button>

                {isPathfinding && (
                    <div className="relative">
                        <button
                            onClick={() => setShowMazeMenu(!showMazeMenu)}
                            className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white disabled:opacity-50 min-w-[44px] min-h-[44px]"
                            disabled={isPlaying}
                            title="Generate Maze"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <path d="M3 9h18" />
                                <path d="M3 15h18" />
                                <path d="M9 3v18" />
                                <path d="M15 3v18" />
                            </svg>
                            <span className="hidden md:inline text-sm">Maze</span>
                            <ChevronDown size={14} className="hidden md:inline" />
                        </button>

                        {showMazeMenu && (
                            <div className="absolute top-full mt-1 right-0 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 min-w-[180px]">
                                <button
                                    onClick={() => { setMazeAlgorithm("recursive"); handleGenerateMaze(); }}
                                    className="w-full text-left px-4 py-3 hover:bg-slate-700 text-sm text-white first:rounded-t-lg"
                                >
                                    Recursive Division
                                </button>
                                <button
                                    onClick={() => { setMazeAlgorithm("prims"); handleGenerateMaze(); }}
                                    className="w-full text-left px-4 py-3 hover:bg-slate-700 text-sm text-white"
                                >
                                    Prim's Maze
                                </button>
                                <button
                                    onClick={() => { setMazeAlgorithm("binary"); handleGenerateMaze(); }}
                                    className="w-full text-left px-4 py-3 hover:bg-slate-700 text-sm text-white last:rounded-b-lg"
                                >
                                    Binary Tree
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Generate Graph Button */}
                {isGraph && (
                    <button
                        onClick={() => { generateGraph(); }}
                        className="flex items-center gap-1 md:gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white disabled:opacity-50 min-w-[44px] min-h-[44px]"
                        disabled={isPlaying}
                        title="Generate Random Graph"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><circle cx="19" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><path d="M10.4 21.9a10 10 0 0 0 9.941-15.416" /><path d="M13.5 2.1a10 10 0 0 0-9.9 15.8" /></svg>
                        <span className="hidden md:inline text-sm">Generate Graph</span>
                    </button>
                )}

                {isPlaying ? (
                    <button
                        onClick={stopAnimation}
                        className="flex items-center gap-2 px-3 md:px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] min-h-[44px]"
                    >
                        <Square size={18} fill="currentColor" />
                        <span className="hidden sm:inline">Stop</span>
                    </button>
                ) : (
                    <button
                        onClick={handlePlay}
                        className="flex items-center gap-2 px-3 md:px-4 py-2 bg-[var(--primary)] text-black font-bold rounded-lg hover:bg-[var(--primary)]/90 transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(0,255,157,0.3)] hover:shadow-[0_0_25px_rgba(0,255,157,0.5)] min-h-[44px]"
                    >
                        <Play size={18} fill="currentColor" />
                        <span className="hidden sm:inline">Visualize</span>
                    </button>
                )}

                {/* Legend Dropdown */}
                <div className="relative hidden md:block">
                    <button
                        onClick={() => setShowLegend(!showLegend)}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white min-w-[44px] min-h-[44px]"
                        title="Legend"
                    >
                        <Info size={18} />
                        <span className="hidden md:inline text-sm">Legend</span>
                    </button>

                    {showLegend && (
                        <div className="absolute top-full mt-2 right-0 p-4 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl z-50 min-w-[200px]">
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 border-b border-white/10 pb-2">Legend</h4>
                            <div className="space-y-2">
                                {isPathfinding && (
                                    <>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-green-500" />
                                            <span className="text-xs text-slate-200">Start</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-red-500" />
                                            <span className="text-xs text-slate-200">Target</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded bg-slate-700" />
                                            <span className="text-xs text-slate-200">Wall</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-cyan-500/50" />
                                            <span className="text-xs text-slate-200">Visited</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                            <span className="text-xs text-slate-200">Path</span>
                                        </div>
                                    </>
                                )}
                                {!isPathfinding && (
                                    <>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-cyan-500" />
                                            <span className="text-xs text-slate-200">Unsorted</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                            <span className="text-xs text-slate-200">Compare</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-red-500" />
                                            <span className="text-xs text-slate-200">Swap</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-green-500" />
                                            <span className="text-xs text-slate-200">Sorted</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
