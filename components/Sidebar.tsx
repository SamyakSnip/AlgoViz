"use client";

import React, { useState } from "react";
import { useVisualizer } from "@/context/VisualizerContext";
import { AlgorithmType } from "@/types";
import { clsx } from "clsx";

const ALGORITHMS: { category: string; items: { label: string; value: AlgorithmType }[] }[] = [
    {
        category: "Sorting",
        items: [
            { label: "Bubble Sort", value: "BUBBLE" },
            { label: "Selection Sort", value: "SELECTION" },
            { label: "Insertion Sort", value: "INSERTION" },
            { label: "Merge Sort", value: "MERGE" },
            { label: "Quick Sort", value: "QUICK" },
            { label: "Heap Sort", value: "HEAP" },
            { label: "Shell Sort", value: "SHELL" },
            { label: "Counting Sort", value: "COUNTING" },
            { label: "Radix Sort", value: "RADIX" },
            { label: "Bucket Sort", value: "BUCKET" },
        ],
    },
    {
        category: "Pathfinding",
        items: [
            { label: "Dijkstra's Algorithm", value: "DIJKSTRA" },
            { label: "A* Search", value: "ASTAR" },
            { label: "Greedy Best-First Search", value: "GREEDY_BFS" },
            { label: "Bidirectional Search", value: "BIDIRECTIONAL" },
            { label: "Jump Point Search (JPS)", value: "JPS" },
            { label: "Bellman-Ford", value: "BELLMAN_FORD" },
            { label: "Floyd-Warshall", value: "FLOYD_WARSHALL" },
            { label: "Breadth First Search (BFS)", value: "BFS" },
            { label: "DFS", value: "DFS" },
        ],
    },
    {
        category: "Searching",
        items: [
            { label: "Linear Search", value: "LINEAR" },
            { label: "Binary Search", value: "BINARY" },
        ],
    },
    {
        category: "Graph (MST)",
        items: [
            { label: "Prim's Algorithm", value: "PRIMS" },
            { label: "Kruskal's Algorithm", value: "KRUSKALS" },
        ],
    },
    {
        category: "Dynamic Programming",
        items: [
            { label: "0/1 Knapsack", value: "KNAPSACK" },
            { label: "Longest Common Subsequence", value: "LCS" },
            { label: "Longest Increasing Subsequence", value: "LIS" },
        ],
    },
    {
        category: "Backtracking",
        items: [
            { label: "N-Queens", value: "NQUEENS" },
            { label: "Sudoku Solver", value: "SUDOKU" },
        ],
    },
    {
        category: "Graph (General)",
        items: [
            { label: "Connected Components", value: "CONNECTED_COMPONENTS" },
            { label: "Topological Sort", value: "TOPOLOGICAL_SORT" },
        ],
    },
    {
        category: "String Algorithms",
        items: [
            { label: "KMP Algorithm", value: "KMP" },
            { label: "Rabin-Karp", value: "RABIN_KARP" },
        ],
    },
    {
        category: "Data Structures",
        items: [
            { label: "Stack", value: "STACK" },
            { label: "Queue", value: "QUEUE" },
            { label: "Linked List", value: "LINKED_LIST" },
        ],
    },
    {
        category: "Tree Algorithms",
        items: [
            { label: "Binary Search Tree", value: "BST" },
            { label: "AVL Tree", value: "AVL" },
        ],
    },
    {
        category: "Advanced Graph",
        items: [
            { label: "Strongly Connected Components", value: "SCC" },
        ],
    },
];

import { ALGORITHM_METADATA } from "@/lib/algorithms/algoMetadata";
import { AlgorithmInfoModal } from "@/components/AlgorithmInfoModal";
import { Info } from "lucide-react";

export const Sidebar = () => {
    const { algorithm, setAlgorithm, isPlaying, isSidebarOpen, setIsSidebarOpen } = useVisualizer();
    const [infoAlgo, setInfoAlgo] = useState<AlgorithmType | null>(null);

    const handleSelect = (val: AlgorithmType) => {
        setAlgorithm(val);
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0a0b]/90 border-r border-white/5 backdrop-blur-2xl transition-transform duration-300 ease-out h-[calc(100vh-4rem)]
                md:relative md:translate-x-0
                ${isSidebarOpen ? "translate-x-0 shadow-2xl shadow-black/50" : "-translate-x-full"}
            `}>
                <div className="flex flex-col h-full">
                    {/* Header/Title Area could go here if separate from Main Header */}
                    <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
                        <div className="space-y-8">
                            {ALGORITHMS.map((group) => (
                                <div key={group.category} className="group/category">
                                    <h3 className="flex items-center gap-2 px-3 mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover/category:text-slate-300 transition-colors">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover/category:bg-blue-500 transition-colors" />
                                        {group.category}
                                    </h3>
                                    <div className="space-y-1">
                                        {group.items.map((item) => {
                                            const isActive = algorithm === item.value;
                                            return (
                                                <div key={item.value} className="relative group/item">
                                                    <button
                                                        onClick={() => handleSelect(item.value)}
                                                        disabled={isPlaying}
                                                        className={clsx(
                                                            "w-full text-left pl-4 pr-10 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden",
                                                            isActive
                                                                ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/10 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)] border border-blue-500/20"
                                                                : "text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent"
                                                        )}
                                                    >
                                                        {/* Active Indicator Line */}
                                                        {isActive && (
                                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 bg-blue-500 rounded-r-full shadow-[0_0_10px_#3b82f6]" />
                                                        )}

                                                        <span className={clsx("relative z-10 block transition-transform duration-300", isActive ? "translate-x-2" : "group-hover/item:translate-x-1")}>
                                                            {item.label}
                                                        </span>
                                                    </button>

                                                    {/* Help Icon */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setInfoAlgo(item.value);
                                                        }}
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-md transition-all"
                                                    >
                                                        <Info size={18} />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Deprecated Footer Removed */}
                </div>
            </aside>

            {infoAlgo && (
                <AlgorithmInfoModal
                    isOpen={!!infoAlgo}
                    onClose={() => setInfoAlgo(null)}
                    metadata={ALGORITHM_METADATA[infoAlgo]}
                />
            )}
        </>
    );
};
