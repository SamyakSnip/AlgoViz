import React from "react";
import { useVisualizer } from "@/context/VisualizerContext";
import { Play, RotateCcw, Shuffle } from "lucide-react";
import { generateRandomGraph, scc } from "@/lib/algorithms/graph/scc";

import { DraggableControlWrapper } from "@/components/DraggableControlWrapper";

export const GraphControls = () => {
    const {
        setGraphNodes,
        setGraphEdges,
        graphNodes,
        graphEdges,
        isPlaying,
        runAnimation
    } = useVisualizer();

    const handleRandom = () => {
        if (isPlaying) return;
        const { nodes, edges } = generateRandomGraph(6 + Math.floor(Math.random() * 4));
        setGraphNodes(nodes);
        setGraphEdges(edges);
    };

    // Initial load if empty?
    React.useEffect(() => {
        if (graphNodes.length === 0 && !isPlaying) {
            handleRandom();
        }
    }, []);

    const handleRun = async () => {
        if (isPlaying || graphNodes.length === 0) return;
        const steps = scc(graphNodes, graphEdges);
        await runAnimation(steps);
    };

    const handleReset = () => {
        // Just re-randomize or clear coloring?
        // Usually Reset means clear coloring.
        // But for graph, randomization is common action.
        handleRandom();
    };

    return (
        <DraggableControlWrapper>
            <div className="flex flex-wrap md:flex-nowrap items-center gap-2 overflow-x-auto max-w-[95vw] scrollbar-hide p-1">
                <button
                    onClick={handleRandom}
                    disabled={isPlaying}
                    className="flex items-center gap-1 px-3 md:px-3 py-2 md:py-1 min-h-[40px] md:min-h-0 bg-slate-700 hover:bg-slate-600 rounded transition-colors disabled:opacity-50 text-sm font-bold text-white shrink-0"
                    aria-label="Generate Random Graph"
                >
                    <Shuffle size={16} className="md:w-3.5 md:h-3.5" />
                    <span>Random Graph</span>
                </button>

                <div className="h-6 w-px bg-white/10 mx-1 hidden md:block" />

                <button
                    onClick={handleRun}
                    disabled={isPlaying || graphNodes.length === 0}
                    className="flex items-center gap-1 px-3 md:px-3 py-2 md:py-1 min-h-[40px] md:min-h-0 bg-blue-600 hover:bg-blue-500 rounded transition-colors disabled:opacity-50 text-sm font-bold text-white shadow-lg shadow-blue-500/20 shrink-0"
                    aria-label="Run SCC Algorithm"
                >
                    <Play size={16} className="md:w-3.5 md:h-3.5" />
                    <span>Run SCC</span>
                </button>
            </div>
        </DraggableControlWrapper>
    );
};
