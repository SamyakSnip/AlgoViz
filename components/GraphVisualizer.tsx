import React from "react";
import { useVisualizer } from "@/context/VisualizerContext";
import { motion, AnimatePresence } from "framer-motion";

export const GraphVisualizer = () => {
    const { graphNodes, graphEdges, highlightIndices, auxiliaryArray } = useVisualizer();

    // Map for quick node access
    const nodeMap = new Map(graphNodes.map(n => [n.id, n]));

    return (
        <div className="relative w-full h-full min-h-[500px] flex items-center justify-center overflow-auto bg-slate-900/20 rounded-xl border border-slate-700/30">
            {/* SVG Layer for Edges */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="28" // Adjust based on node radius
                        refY="3.5"
                        orient="auto"
                    >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
                    </marker>
                    <marker
                        id="arrowhead-highlight"
                        markerWidth="10"
                        markerHeight="7"
                        refX="28"
                        refY="3.5"
                        orient="auto"
                    >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#facc15" />
                    </marker>
                </defs>
                <AnimatePresence>
                    {graphEdges.map((edge) => {
                        const source = nodeMap.get(edge.source);
                        const target = nodeMap.get(edge.target);
                        if (!source || !target) return null;

                        // Check if edge is highlighted? Not strictly implemented yet, but we could check highlightIndices if mapped to edges
                        // For now, let's just draw standard edges.

                        return (
                            <motion.line
                                key={`${edge.source}-${edge.target}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, x1: source.x, y1: source.y, x2: target.x, y2: target.y }}
                                exit={{ opacity: 0 }}
                                x1={source.x}
                                y1={source.y}
                                x2={target.x}
                                y2={target.y}
                                stroke="#475569"
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                                transition={{ duration: 0.3 }}
                            />
                        );
                    })}
                </AnimatePresence>
            </svg>

            {/* Nodes Layer */}
            <AnimatePresence>
                {graphNodes.map((node, idx) => {
                    // Check highlights
                    // Highlight logic: if highlightIndices contains idx (or id logic?), color it.
                    // Or use auxiliaryArray to store SCC ID?
                    // Let's assume auxiliaryArray stores SCC ID for each node index.

                    const sccId = auxiliaryArray[idx]; // If implemented
                    const isHighlighted = highlightIndices.includes(idx);

                    const colors = [
                        "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500",
                        "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-orange-500"
                    ];

                    const baseColor = sccId !== undefined && sccId !== -1
                        ? colors[sccId % colors.length]
                        : "bg-slate-700";

                    return (
                        <motion.div
                            key={node.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: 1,
                                scale: isHighlighted ? 1.2 : 1,
                                x: node.x,
                                y: node.y,
                                borderColor: isHighlighted ? "#facc15" : (sccId !== undefined ? "#fff" : "#475569")
                            }}
                            className={`absolute w-12 h-12 -ml-6 -mt-6 border-2 rounded-full flex items-center justify-center shadow-lg z-10 ${baseColor} text-white font-bold transition-colors`}
                            style={{ left: 0, top: 0 }} // Using translate via Animate
                        >
                            {node.value}
                        </motion.div>
                    );
                })}
            </AnimatePresence>

            {graphNodes.length === 0 && (
                <div className="absolute text-slate-500 italic">No Graph Data</div>
            )}
        </div>
    );
};
