"use client";

import React from "react";
import { useVisualizer } from "@/context/VisualizerContext";
import { clsx } from "clsx";
import { NodeType } from "@/types";

// Memoized Node component to prevent unnecessary re-renders
const Node = React.memo(({
    row,
    col,
    isStart,
    isFinish,
    isWall,
    status,
    onMouseDown,
    onMouseEnter,
    onMouseUp
}: NodeType & {
    onMouseDown: (row: number, col: number) => void;
    onMouseEnter: (row: number, col: number) => void;
    onMouseUp: () => void;
}) => {
    let bgClass = "bg-white/5"; // Default
    if (isStart) bgClass = "bg-green-500 shadow-[0_0_10px_#22c55e]";
    else if (isFinish) bgClass = "bg-red-500 shadow-[0_0_10px_#ef4444]";
    else if (isWall) bgClass = "bg-gradient-to-br from-slate-700 to-slate-900 border-2 border-slate-500 shadow-inner";
    else if (status === "visited") bgClass = "bg-blue-500/50";
    else if (status === "path") bgClass = "bg-yellow-400 shadow-[0_0_10px_#facc15]";

    return (
        <div
            className={clsx(
                "w-6 h-6 border border-white/5 transition-all duration-200",
                bgClass
            )}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={onMouseUp}
        />
    );
});

Node.displayName = "Node";

export const Grid = () => {
    const { grid, handleMouseDown, handleMouseEnter, handleMouseUp } = useVisualizer();

    return (
        <div
            className="flex flex-col items-center justify-center p-4 select-none"
            onMouseLeave={handleMouseUp}
        >
            {grid.map((row, rowIdx) => (
                <div key={rowIdx} className="flex">
                    {row.map((node, nodeIdx) => (
                        <Node
                            key={`${rowIdx}-${nodeIdx}`}
                            {...node}
                            onMouseDown={handleMouseDown}
                            onMouseEnter={handleMouseEnter}
                            onMouseUp={handleMouseUp}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};
