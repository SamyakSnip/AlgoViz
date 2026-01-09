import React, { useState } from "react";
import { useVisualizer } from "@/context/VisualizerContext";
import { Plus, Minus, Trash2 } from "lucide-react";
import { AnimationStep } from "@/types";

import { DraggableControlWrapper } from "@/components/DraggableControlWrapper";

import { generateStackSteps } from "@/lib/algorithms/ds/stack";
import { generateQueueSteps } from "@/lib/algorithms/ds/queue";
import { generateLinkedListSteps } from "@/lib/algorithms/ds/linkedList";

export const DSControls = () => {
    const { algorithm, array, runAnimation, isPlaying, clearBoard, setArray } = useVisualizer();
    const [inputValue, setInputValue] = useState("");

    const isStack = algorithm === "STACK";
    const isIsLL = algorithm === "LINKED_LIST";

    const handleAdd = async (addToHead: boolean = false) => {
        const val = parseInt(inputValue);
        if (isNaN(val) || isPlaying) return;

        let steps: AnimationStep[] = [];

        if (isStack) {
            steps = generateStackSteps.push(array, val);
        } else if (isIsLL) {
            if (addToHead) {
                steps = generateLinkedListSteps.insertHead(array, val);
            } else {
                steps = generateLinkedListSteps.insertTail(array, val);
            }
        } else {
            // Queue Enqueue
            steps = generateQueueSteps.enqueue(array, val);
        }

        if (steps.length > 0) {
            await runAnimation(steps);
        }
        setInputValue("");
    };

    const handleRemove = async (removeFromHead: boolean = true) => {
        if (array.length === 0 || isPlaying) return;

        let steps: AnimationStep[] = [];

        if (isStack) {
            // Stack Pop (remove from end)
            steps = generateStackSteps.pop(array);
        } else if (isIsLL) {
            if (removeFromHead) {
                steps = generateLinkedListSteps.deleteHead(array);
            } else {
                steps = generateLinkedListSteps.deleteTail(array);
            }
        } else {
            // Queue Dequeue (remove from start)
            steps = generateQueueSteps.dequeue(array);
        }

        if (steps.length > 0) {
            await runAnimation(steps);
        }
    };

    const handleClear = () => {
        setArray([]);
    };

    const handleRandom = () => {
        const randomVal = Math.floor(Math.random() * 99) + 1;
        setInputValue(randomVal.toString());
    };

    return (
        <DraggableControlWrapper>
            <div className="flex flex-wrap md:flex-nowrap items-center gap-2 overflow-x-auto max-w-[95vw] scrollbar-hide p-1">
                <div className="flex items-center gap-2 shrink-0">
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Value"
                        className="w-20 md:w-20 h-10 md:h-auto bg-slate-800 border border-slate-700 rounded px-3 md:px-2 py-2 md:py-1 text-white text-sm focus:outline-none focus:border-blue-500"
                        onKeyDown={(e) => e.key === "Enter" && handleAdd(false)}
                    />
                    <button
                        onClick={handleRandom}
                        className="px-3 md:px-2 py-2 md:py-1 min-h-[40px] md:min-h-0 rounded hover:bg-white/10 text-slate-400 hover:text-white text-xs font-medium"
                        title="Random Value"
                        aria-label="Generate Random Value"
                    >
                        Rnd
                    </button>
                </div>

                <div className="h-6 w-px bg-white/10 mx-1 shrink-0 hidden md:block" />

                {!isIsLL && (
                    <>
                        <button
                            onClick={() => handleAdd(false)}
                            disabled={isPlaying || !inputValue}
                            className="flex items-center gap-1 px-3 md:px-3 py-2 md:py-1 min-h-[40px] md:min-h-0 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded transition-colors disabled:opacity-50 text-sm font-bold border border-blue-500/50 shrink-0"
                        >
                            <Plus size={16} className="md:w-3.5 md:h-3.5" />
                            <span>{isStack ? "Push" : "Enqueue"}</span>
                        </button>

                        <button
                            onClick={() => handleRemove(true)}
                            disabled={isPlaying || array.length === 0}
                            className="flex items-center gap-1 px-3 md:px-3 py-2 md:py-1 min-h-[40px] md:min-h-0 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded transition-colors disabled:opacity-50 text-sm font-bold border border-red-500/50 shrink-0"
                        >
                            <Minus size={16} className="md:w-3.5 md:h-3.5" />
                            <span>{isStack ? "Pop" : "Dequeue"}</span>
                        </button>
                    </>
                )}

                {isIsLL && (
                    <>
                        {/* Linked List Specific Controls */}
                        <button
                            onClick={() => handleAdd(true)}
                            disabled={isPlaying || !inputValue}
                            className="flex items-center gap-1 px-3 md:px-2 py-2 md:py-1 min-h-[40px] md:min-h-0 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded transition-colors disabled:opacity-50 text-sm md:text-xs font-bold border border-blue-500/50 shrink-0"
                        >
                            <Plus size={14} className="md:w-3 md:h-3" />
                            Head
                        </button>
                        <button
                            onClick={() => handleAdd(false)}
                            disabled={isPlaying || !inputValue}
                            className="flex items-center gap-1 px-3 md:px-2 py-2 md:py-1 min-h-[40px] md:min-h-0 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded transition-colors disabled:opacity-50 text-sm md:text-xs font-bold border border-blue-500/50 shrink-0"
                        >
                            <Plus size={14} className="md:w-3 md:h-3" />
                            Tail
                        </button>

                        <div className="h-6 w-px bg-white/10 mx-1 shrink-0 hidden md:block" />

                        <button
                            onClick={() => handleRemove(true)}
                            disabled={isPlaying || array.length === 0}
                            className="flex items-center gap-1 px-3 md:px-2 py-2 md:py-1 min-h-[40px] md:min-h-0 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded transition-colors disabled:opacity-50 text-sm md:text-xs font-bold border border-red-500/50 shrink-0"
                        >
                            <Minus size={14} className="md:w-3 md:h-3" />
                            Head
                        </button>
                        <button
                            onClick={() => handleRemove(false)}
                            disabled={isPlaying || array.length === 0}
                            className="flex items-center gap-1 px-3 md:px-2 py-2 md:py-1 min-h-[40px] md:min-h-0 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded transition-colors disabled:opacity-50 text-sm md:text-xs font-bold border border-red-500/50 shrink-0"
                        >
                            <Minus size={14} className="md:w-3 md:h-3" />
                            Tail
                        </button>
                    </>
                )}

                <button
                    onClick={handleClear}
                    className="ml-2 p-2 md:p-1.5 min-h-[40px] min-w-[40px] md:min-h-0 md:min-w-0 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors shrink-0 flex items-center justify-center"
                    title="Clear All"
                    aria-label="Clear All Elements"
                >
                    <Trash2 size={18} className="md:w-4 md:h-4" />
                </button>
            </div>
        </DraggableControlWrapper>
    );
};
