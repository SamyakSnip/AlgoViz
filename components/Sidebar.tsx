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
import { Info, ChevronDown, Search, ChevronsDown, ChevronsUp } from "lucide-react";

export const Sidebar = () => {
    const { algorithm, setAlgorithm, isPlaying, isSidebarOpen, setIsSidebarOpen } = useVisualizer();
    const [infoAlgo, setInfoAlgo] = useState<AlgorithmType | null>(null);

    // Expanded categories state - Sorting and Pathfinding open by default
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
        new Set(["Sorting", "Pathfinding"])
    );

    const toggleCategory = (category: string) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                newSet.delete(category);
            } else {
                newSet.add(category);
            }
            return newSet;
        });
    };

    const [searchQuery, setSearchQuery] = useState("");

    const expandAll = () => {
        setExpandedCategories(new Set(ALGORITHMS.map(g => g.category)));
    };

    const collapseAll = () => {
        setExpandedCategories(new Set());
    };

    const handleSelect = (val: AlgorithmType) => {
        setAlgorithm(val);

        // Auto-expand the category containing the selected algorithm
        const categoryWithAlgo = ALGORITHMS.find(group =>
            group.items.some(item => item.value === val)
        );
        if (categoryWithAlgo) {
            setExpandedCategories(prev => new Set(prev).add(categoryWithAlgo.category));
        }

        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    // Filter algorithms based on search query
    const filteredAlgorithms = ALGORITHMS.map(group => ({
        ...group,
        items: group.items.filter(item =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(group => group.items.length > 0);

    // Auto-expand categories when searching
    const displayedAlgorithms = searchQuery ? filteredAlgorithms : ALGORITHMS;
    const shouldAutoExpand = searchQuery.length > 0;

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
                    {/* Search Bar and Controls */}
                    <div className="p-4 border-b border-white/5 space-y-3">
                        {/* Search Input */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search algorithms..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Expand/Collapse All Controls */}
                        {!searchQuery && (
                            <div className="flex gap-2">
                                <button
                                    onClick={expandAll}
                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-md transition-all"
                                >
                                    <ChevronsDown size={14} />
                                    Expand All
                                </button>
                                <button
                                    onClick={collapseAll}
                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-md transition-all"
                                >
                                    <ChevronsUp size={14} />
                                    Collapse All
                                </button>
                            </div>
                        )}

                        {/* Search Results Count */}
                        {searchQuery && (
                            <div className="text-xs text-slate-500">
                                Found {filteredAlgorithms.reduce((acc, g) => acc + g.items.length, 0)} algorithm(s)
                            </div>
                        )}
                    </div>

                    {/* Algorithm List */}
                    <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
                        <div className="space-y-2">
                            {displayedAlgorithms.map((group) => {
                                const isExpanded = shouldAutoExpand || expandedCategories.has(group.category);
                                const itemCount = group.items.length;

                                return (
                                    <div key={group.category} className="group/category">
                                        {/* Collapsible Category Header */}
                                        <button
                                            onClick={() => toggleCategory(group.category)}
                                            className="w-full flex items-center justify-between gap-2 px-3 py-3 mb-2 rounded-lg text-xs font-bold uppercase tracking-[0.15em] text-slate-300 bg-gradient-to-r from-slate-800/50 to-slate-900/30 hover:from-slate-700/50 hover:to-slate-800/30 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200 shadow-sm"
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <span className="w-2 h-2 rounded-full bg-blue-500/70 group-hover:bg-blue-400 transition-colors shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                                <span className="font-extrabold">{group.category}</span>
                                                <span className="text-[10px] text-slate-500 font-semibold bg-slate-800/80 px-2 py-0.5 rounded-full">
                                                    {itemCount}
                                                </span>
                                            </div>
                                            <ChevronDown
                                                size={16}
                                                className={clsx(
                                                    "transition-transform duration-300 text-slate-400 group-hover:text-blue-400",
                                                    isExpanded ? "rotate-180" : "rotate-0"
                                                )}
                                            />
                                        </button>

                                        {/* Collapsible Algorithm List */}
                                        <div
                                            className={clsx(
                                                "overflow-hidden transition-all duration-300 ease-in-out",
                                                isExpanded ? "max-h-[2000px] opacity-100 mb-3" : "max-h-0 opacity-0"
                                            )}
                                        >
                                            <div className="space-y-1 pl-2 pr-1">
                                                {group.items.map((item) => {
                                                    const isActive = algorithm === item.value;
                                                    return (
                                                        <div key={item.value} className="relative group/item">
                                                            <button
                                                                onClick={() => handleSelect(item.value)}
                                                                disabled={isPlaying}
                                                                className={clsx(
                                                                    "w-full text-left pl-5 pr-10 py-2 rounded-md text-sm font-normal transition-all duration-200 relative overflow-hidden",
                                                                    isActive
                                                                        ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/10 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)] border-l-2 border-blue-500 font-medium"
                                                                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5 hover:pl-6 border-l-2 border-transparent hover:border-slate-600"
                                                                )}
                                                            >
                                                                {/* Active Indicator Line */}
                                                                {isActive && (
                                                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 bg-blue-500 rounded-r-full shadow-[0_0_10px_#3b82f6]" />
                                                                )}

                                                                <span className={clsx("relative z-10 block transition-transform duration-300", isActive ? "translate-x-2" : "group-hover/item:translate-x-1")}>
                                                                    {searchQuery ? (
                                                                        // Highlight search matches
                                                                        <span dangerouslySetInnerHTML={{
                                                                            __html: item.label.replace(
                                                                                new RegExp(`(${searchQuery})`, 'gi'),
                                                                                '<mark class="bg-blue-500/30 text-blue-200">$1</mark>'
                                                                            )
                                                                        }} />
                                                                    ) : (
                                                                        item.label
                                                                    )}
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
                                    </div>
                                );
                            })}
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
