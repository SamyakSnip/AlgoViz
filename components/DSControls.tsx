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
            <div className="flex items-center gap-2 overflow-x-auto max-w-[95vw] scrollbar-hide">
                <div className="flex items-center gap-2 mr-2 shrink-0">
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Value"
                        className="w-20 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-blue-500"
                        onKeyDown={(e) => e.key === "Enter" && handleAdd(false)}
                    />
                    <button
                        onClick={handleRandom}
                        className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white text-xs"
                        title="Random Value"
                        aria-label="Generate Random Value"
                    >
                        Rnd
                    </button>
                </div>

                <div className="h-6 w-px bg-white/10 mx-1 shrink-0" />

                {!isIsLL && (
                    <>
                        <button
                            onClick={() => handleAdd(false)}
                            disabled={isPlaying || !inputValue}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded transition-colors disabled:opacity-50 text-sm font-bold border border-blue-500/50"
                        >
                            <Plus size={14} />
                            <span>{isStack ? "Push" : "Enqueue"}</span>
                        </button>

                        <button
                            onClick={() => handleRemove(true)}
                            disabled={isPlaying || array.length === 0}
                            className="flex items-center gap-1 px-3 py-1 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded transition-colors disabled:opacity-50 text-sm font-bold border border-red-500/50"
                        >
                            <Minus size={14} />
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
                            className="flex items-center gap-1 px-2 py-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded transition-colors disabled:opacity-50 text-xs font-bold border border-blue-500/50"
                        >
                            <Plus size={12} />
                            Head
                        </button>
                        <button
                            onClick={() => handleAdd(false)}
                            disabled={isPlaying || !inputValue}
                            className="flex items-center gap-1 px-2 py-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded transition-colors disabled:opacity-50 text-xs font-bold border border-blue-500/50"
                        >
                            <Plus size={12} />
                            Tail
                        </button>

                        <div className="h-6 w-px bg-white/10 mx-1 shrink-0" />

                        <button
                            onClick={() => handleRemove(true)}
                            disabled={isPlaying || array.length === 0}
                            className="flex items-center gap-1 px-2 py-1 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded transition-colors disabled:opacity-50 text-xs font-bold border border-red-500/50"
                        >
                            <Minus size={12} />
                            Head
                        </button>
                        <button
                            onClick={() => handleRemove(false)}
                            disabled={isPlaying || array.length === 0}
                            className="flex items-center gap-1 px-2 py-1 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded transition-colors disabled:opacity-50 text-xs font-bold border border-red-500/50"
                        >
                            <Minus size={12} />
                            Tail
                        </button>
                    </>
                )}

                <button
                    onClick={handleClear}
                    className="ml-2 p-1.5 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors shrink-0"
                    title="Clear All"
                    aria-label="Clear All Elements"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </DraggableControlWrapper>
    );
};
