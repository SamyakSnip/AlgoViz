import React, { useState } from "react";
import { useVisualizer } from "@/context/VisualizerContext";
import { Plus, Minus, Trash2, Play } from "lucide-react";
import { insertBST, deleteBST, recalculateTreeLayout } from "@/lib/algorithms/tree/bst";
import { insertAVL, deleteAVL, recalculateAVLLayout } from "@/lib/algorithms/tree/avl";
import { inorderTraversal, preorderTraversal, postorderTraversal } from "@/lib/algorithms/tree/traversal";
import { DraggableControlWrapper } from "@/components/DraggableControlWrapper";

export const TreeControls = () => {
    const {
        algorithm,
        treeRoot,
        setTreeRoot,
        isPlaying,
        setIsPlaying,
        setVisitedNodeIds,
        setActiveNodeId,
        traversalResult,
        setTraversalResult
    } = useVisualizer();
    const [inputValue, setInputValue] = useState("");

    const isAVL = algorithm === "AVL";

    const handleOp = (op: "insert" | "delete") => {
        // Clear any previous traversal state
        setVisitedNodeIds([]);
        setActiveNodeId(null);
        setTraversalResult("");

        const val = parseInt(inputValue);
        if (isNaN(val)) return;

        let newRoot = treeRoot ? { ...treeRoot } : null;

        // Simple Deep Clone for safety (can optimize later)
        if (newRoot) newRoot = JSON.parse(JSON.stringify(treeRoot));

        if (op === "insert") {
            if (isAVL) {
                newRoot = insertAVL(newRoot, val);
            } else {
                newRoot = insertBST(newRoot, val);
            }
        } else {
            if (isAVL) {
                newRoot = deleteAVL(newRoot, val);
            } else {
                newRoot = deleteBST(newRoot, val);
            }
        }

        // Layout
        if (isAVL) {
            recalculateAVLLayout(newRoot);
        } else {
            recalculateTreeLayout(newRoot);
        }
        setTreeRoot(newRoot);
        setInputValue("");
    };

    const runTraversal = async (type: "inorder" | "preorder" | "postorder") => {
        if (!treeRoot || isPlaying) return;
        setIsPlaying(true);
        setVisitedNodeIds([]);
        setActiveNodeId(null);
        setTraversalResult("");

        let ids: string[] = [];
        if (type === "inorder") ids = inorderTraversal(treeRoot);
        if (type === "preorder") ids = preorderTraversal(treeRoot);
        if (type === "postorder") ids = postorderTraversal(treeRoot);

        // Map IDs to values since ID != Value in our implementation
        // But wait, our ID is random string, Value is number.
        // We need a helper to find value by ID, or just store values in traversal.
        // Actually traversal logic returns IDs.
        // We can find the node by ID in the tree.
        const findValueById = (node: any, id: string): number | null => {
            if (!node) return null;
            if (node.id === id) return node.value;
            return findValueById(node.left, id) || findValueById(node.right, id);
        };

        const visited: string[] = [];
        const resultValues: number[] = [];

        for (const id of ids) {
            setActiveNodeId(id);
            const val = findValueById(treeRoot, id);
            if (val !== null) {
                resultValues.push(val);
                setTraversalResult(resultValues.join(" -> "));
            }

            await new Promise(r => setTimeout(r, 600));
            visited.push(id);
            setVisitedNodeIds([...visited]);
        }
        setActiveNodeId(null);
        setIsPlaying(false);
    };

    const handleClear = () => {
        setTreeRoot(null);
        setVisitedNodeIds([]);
        setActiveNodeId(null);
        setTraversalResult("");
    };

    const handleRandom = () => {
        const randomVal = Math.floor(Math.random() * 99) + 1;
        setInputValue(randomVal.toString());
    };

    return (
        <DraggableControlWrapper>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 overflow-x-auto max-w-[95vw] scrollbar-hide">
                    {/* Input Group */}
                    <div className="flex items-center gap-2 mr-2 shrink-0">
                        <input
                            type="number"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Value"
                            className="w-16 md:w-20 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-blue-500"
                            onKeyDown={(e) => e.key === "Enter" && handleOp("insert")}
                        />
                        <button
                            onClick={handleRandom}
                            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white text-xs"
                            title="Random Value"
                        >
                            Rnd
                        </button>
                    </div>

                    <div className="h-6 w-px bg-white/10 mx-1 shrink-0" />

                    {/* Operations */}
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={() => handleOp("insert")}
                            disabled={isPlaying || !inputValue}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded transition-colors disabled:opacity-50 text-sm font-bold border border-blue-500/50"
                        >
                            <Plus size={14} />
                            <span>Insert</span>
                        </button>

                        <button
                            onClick={() => handleOp("delete")}
                            disabled={isPlaying || !treeRoot}
                            className="flex items-center gap-1 px-3 py-1 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded transition-colors disabled:opacity-50 text-sm font-bold border border-red-500/50"
                        >
                            <Minus size={14} />
                            <span>Delete</span>
                        </button>
                    </div>

                    <div className="h-6 w-px bg-white/10 mx-1 shrink-0" />

                    {/* Traversals */}
                    <div className="flex items-center gap-1 shrink-0">
                        <button
                            onClick={() => runTraversal("inorder")}
                            disabled={isPlaying || !treeRoot}
                            className="px-2 py-1 hover:bg-white/10 text-slate-300 rounded text-xs font-medium transition-colors"
                        >
                            InOrder
                        </button>
                        <button
                            onClick={() => runTraversal("preorder")}
                            disabled={isPlaying || !treeRoot}
                            className="px-2 py-1 hover:bg-white/10 text-slate-300 rounded text-xs font-medium transition-colors"
                        >
                            PreOrder
                        </button>
                        <button
                            onClick={() => runTraversal("postorder")}
                            disabled={isPlaying || !treeRoot}
                            className="px-2 py-1 hover:bg-white/10 text-slate-300 rounded text-xs font-medium transition-colors"
                        >
                            PostOrder
                        </button>
                    </div>

                    <button
                        onClick={handleClear}
                        className="ml-2 p-1.5 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors shrink-0"
                        title="Clear Tree"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>

                {/* Result Display */}
                {traversalResult && (
                    <div className="px-2 py-1 bg-slate-800/50 rounded border border-white/5 text-xs text-slate-300 font-mono overflow-hidden text-ellipsis whitespace-nowrap max-w-[95vw]">
                        <span className="text-slate-500 mr-2">Result:</span>
                        {traversalResult}
                    </div>
                )}
            </div>
        </DraggableControlWrapper>
    );
};
