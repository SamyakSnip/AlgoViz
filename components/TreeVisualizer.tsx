import React from "react";
import { useVisualizer } from "@/context/VisualizerContext";
import { motion, AnimatePresence } from "framer-motion";
import { TreeNode } from "@/types";

export const TreeVisualizer = () => {
    const { treeRoot, visitedNodeIds, activeNodeId } = useVisualizer();

    // Helper to collect nodes and edges for rendering
    const collectRenderData = (node: TreeNode | null, nodes: TreeNode[] = [], edges: { id: string; x1: number; y1: number; x2: number; y2: number }[] = []) => {
        if (!node) return { nodes, edges };

        nodes.push(node);

        if (node.left) {
            edges.push({
                id: `${node.id}-${node.left.id}`,
                x1: node.x,
                y1: node.y,
                x2: node.left.x,
                y2: node.left.y,
            });
            collectRenderData(node.left, nodes, edges);
        }

        if (node.right) {
            edges.push({
                id: `${node.id}-${node.right.id}`,
                x1: node.x,
                y1: node.y,
                x2: node.right.x,
                y2: node.right.y,
            });
            collectRenderData(node.right, nodes, edges);
        }

        return { nodes, edges };
    };

    const { nodes, edges } = collectRenderData(treeRoot);

    return (
        <div className="relative w-full h-full min-h-[500px] flex items-center justify-center overflow-auto bg-slate-900/20 rounded-xl border border-slate-700/30">
            {/* SVG Layer for Edges */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <AnimatePresence>
                    {edges.map((edge) => (
                        <motion.line
                            key={edge.id}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1, x1: edge.x1, y1: edge.y1, x2: edge.x2, y2: edge.y2 }}
                            exit={{ opacity: 0 }}
                            x1={edge.x1}
                            y1={edge.y1}
                            x2={edge.x2}
                            y2={edge.y2}
                            stroke="#475569"
                            strokeWidth="2"
                            transition={{ duration: 0.3 }}
                        />
                    ))}
                </AnimatePresence>
            </svg>

            {/* Nodes Layer */}
            <AnimatePresence>
                {nodes.map((node) => {
                    const isVisited = visitedNodeIds.includes(node.id);
                    const isActive = activeNodeId === node.id;

                    return (
                        <motion.div
                            key={node.id}
                            layoutId={node.id}
                            initial={{ opacity: 0, scale: 0, x: node.x, y: node.y }} // Initial visual position
                            animate={{ opacity: 1, scale: isActive ? 1.2 : 1, x: node.x, y: node.y }} // Animate to actual position (absolute)
                            exit={{ opacity: 0, scale: 0 }}
                            className={`absolute w-10 h-10 -ml-5 -mt-5 border-2 rounded-full flex items-center justify-center shadow-lg z-10 
                                ${isActive ? 'bg-yellow-500 border-yellow-300 shadow-yellow-500/50' :
                                    isVisited ? 'bg-green-600 border-green-400 shadow-green-500/30' :
                                        'bg-indigo-600 border-indigo-400'}`}
                            style={{ left: 0, top: 0 }} // We use x/y translate for positioning
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                            <span className="text-white font-bold text-sm">{node.value}</span>
                        </motion.div>
                    );
                })}
            </AnimatePresence>

            {!treeRoot && (
                <div className="absolute text-slate-500 italic">Tree is Empty</div>
            )}
        </div>
    );
};
