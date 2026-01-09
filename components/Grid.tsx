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
                "w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 border border-white/5 transition-all duration-200 cursor-pointer hover:brightness-125 active:scale-95",
                bgClass
            )}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={onMouseUp}
            onTouchStart={(e) => {
                e.preventDefault();
                onMouseDown(row, col);
            }}
            onTouchMove={(e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const element = document.elementFromPoint(touch.clientX, touch.clientY);
                if (element && element.hasAttribute('data-row')) {
                    const r = parseInt(element.getAttribute('data-row') || '0');
                    const c = parseInt(element.getAttribute('data-col') || '0');
                    onMouseEnter(r, c);
                }
            }}
            onTouchEnd={onMouseUp}
            data-row={row}
            data-col={col}
        />
    );
});

Node.displayName = "Node";

export const Grid = () => {
    const { grid, handleMouseDown, handleMouseEnter, handleMouseUp } = useVisualizer();

    return (
        <div
            className="flex flex-col items-center justify-center p-2 md:p-4 select-none touch-none overflow-auto max-h-[calc(100vh-12rem)]"
            onMouseLeave={handleMouseUp}
            onTouchEnd={handleMouseUp}
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
