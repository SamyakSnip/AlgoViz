import React from "react";
import { useVisualizer } from "@/context/VisualizerContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const DataStructureVisualizer = () => {
    const { array, algorithm } = useVisualizer();
    const isStack = algorithm === "STACK";
    const isLinkedList = algorithm === "LINKED_LIST";

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-8 p-4">
            <h3 className="text-slate-400 text-lg font-mono mb-4">
                {isStack ? "Top" : isLinkedList ? "Head" : "Front"}
            </h3>

            <div className={`flex ${isStack ? "flex-col-reverse items-center justify-start h-[500px] w-56 border-b-4 border-x-4 border-slate-700/50 rounded-b-xl px-6 py-4 bg-slate-900/20 overflow-hidden" : "flex-row items-center justify-start w-full max-w-4xl h-40 border-slate-700/50 p-4 overflow-x-auto gap-4"}`}>
                <AnimatePresence mode="popLayout">
                    {array.map((value, idx) => (
                        <React.Fragment key={`${value}-${idx}`}>
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.5, y: isStack ? -50 : 0, x: isStack ? 0 : 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className={`flex flex-col items-center justify-center relative shrink-0`}
                            >
                                <div className={`flex items-center justify-center border border-white/10 rounded font-bold text-white shadow-lg ${isStack
                                    ? "w-full h-14 mb-2 bg-indigo-500 text-lg" // Increased height and margin
                                    : isLinkedList
                                        ? "w-16 h-16 rounded-full bg-blue-600 border-2 border-blue-400 text-sm"
                                        : "h-20 w-20 min-w-[5rem] bg-emerald-500 text-xl"
                                    }`}>
                                    {value}
                                    <span className="absolute text-[8px] text-white/50 top-1 left-3">{idx}</span>
                                </div>
                                {/* For Linked List: Add Next Pointer visual if not last */}
                                {isLinkedList && (
                                    <div className="text-[10px] text-slate-500 mt-1">Next</div>
                                )}
                            </motion.div>

                            {/* Arrow for Linked List */}
                            {isLinkedList && idx < array.length - 1 && (
                                <motion.div
                                    layout
                                    className="text-slate-500 shrink-0"
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    animate={{ opacity: 1, scaleX: 1 }}
                                >
                                    <ArrowRight size={24} />
                                </motion.div>
                            )}
                        </React.Fragment>
                    ))}
                </AnimatePresence>

                {isLinkedList && array.length > 0 && (
                    <div className="text-slate-600 font-mono text-sm flex items-center shrink-0 gap-2 opacity-50">
                        <ArrowRight size={24} />
                        NULL
                    </div>
                )}

                {array.length === 0 && (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 text-sm italic">
                        Empty
                    </div>
                )}
            </div>

            <h3 className="text-slate-400 text-lg font-mono mt-4">
                {isStack ? "Bottom" : isLinkedList ? "Tail" : "Rear"}
            </h3>
        </div>
    );
};
