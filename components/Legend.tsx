import React from "react";
import { useVisualizer } from "@/context/VisualizerContext";

export const Legend = () => {
    const { algorithm } = useVisualizer();

    const isSorting = ["BUBBLE", "SELECTION", "INSERTION", "MERGE", "QUICK", "HEAP", "SHELL", "COUNTING", "RADIX", "BUCKET"].includes(algorithm);
    const isPathfinding = ["DIJKSTRA", "ASTAR", "BFS", "DFS", "GREEDY_BFS", "BIDIRECTIONAL", "JPS"].includes(algorithm);
    const isGraph = ["PRIMS", "KRUSKALS", "CONNECTED_COMPONENTS", "SCC"].includes(algorithm);
    const isTree = ["BST", "AVL"].includes(algorithm);
    const isString = ["KMP", "RABIN_KARP"].includes(algorithm);

    const items: { label: string; color: string; desc?: string }[] = [];

    if (isSorting) {
        items.push(
            { label: "Unsorted", color: "bg-cyan-500" },
            { label: "Compare", color: "bg-yellow-400" },
            { label: "Swap", color: "bg-red-500" },
            { label: "Sorted", color: "bg-green-500" }
        );
    } else if (isPathfinding) {
        items.push(
            { label: "Start", color: "bg-green-500" },
            { label: "Target", color: "bg-red-500" },
            { label: "Wall", color: "bg-slate-700" },
            { label: "Visited", color: "bg-cyan-500/50" },
            { label: "Path", color: "bg-yellow-400" }
        );
    } else if (isGraph) {
        if (algorithm === "SCC") {
            items.push(
                { label: "Unvisited", color: "bg-slate-700" },
                { label: "Visited", color: "bg-slate-500" },
                { label: "SCC Group 1", color: "bg-red-500" },
                { label: "SCC Group 2", color: "bg-blue-500" },
                { label: "SCC Group 3", color: "bg-green-500" },
            );
        } else {
            items.push(
                { label: "Node", color: "bg-slate-700" },
                { label: "Selected", color: "bg-yellow-400" },
                { label: "MST Edge", color: "bg-green-500" }
            );
        }
    } else if (isTree) {
        items.push(
            { label: "Node", color: "bg-slate-700" },
            { label: "New / Active", color: "bg-yellow-400" },
            { label: "Found / Match", color: "bg-green-500" },
            { label: "Edge", color: "bg-slate-500" }
        );
    } else if (isString) {
        items.push(
            { label: "Text", color: "bg-slate-800" },
            { label: "Match", color: "bg-green-500/20 text-green-400 border-green-500" },
            { label: "Comparing", color: "bg-blue-500/30 text-blue-300 border-blue-500" }
        );
    }

    if (items.length === 0) return null;

    return (
        <div className="absolute bottom-6 right-6 z-30 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 border-b border-white/10 pb-2">Legend</h4>
            <div className="space-y-2">
                {items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] ${item.color} ${item.color.includes("border") ? "border" : ""}`} />
                        <span className="text-xs font-medium text-slate-200">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
