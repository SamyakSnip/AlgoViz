"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from "react";
import { getKnapsackSetup } from "@/lib/algorithms/dp/knapsack";
import { type NodeType, AnimationStep, AlgorithmType, TreeNode, GraphNode, GraphEdge } from "@/types";



interface VisualizerContextType {
    array: number[];
    setArray: (arr: number[]) => void;
    // Tree State
    treeRoot: TreeNode | null;
    setTreeRoot: (node: TreeNode | null) => void;
    // Tree Traversal State
    visitedNodeIds: string[];
    setVisitedNodeIds: (ids: string[]) => void;
    activeNodeId: string | null;
    setActiveNodeId: (id: string | null) => void;
    traversalResult: string; // Added result string
    setTraversalResult: (result: string) => void;
    isPlaying: boolean;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
    isPseudocodeOpen: boolean;
    setIsPseudocodeOpen: (isOpen: boolean) => void;



    isSorted: boolean;
    // DP State
    dpTable: (number | string | null)[][];
    dpLabels: { row: string[]; col: string[] };
    problemStatement: string; // Added
    lcsStrings: [string, string];
    setLCSStrings: (strings: [string, string]) => void;
    setDpTable: (table: (number | string | null)[][]) => void;
    setDpLabels: (labels: { row: string[]; col: string[] }) => void;
    setProblemStatement: (text: string) => void;
    // Animation Controls
    algorithm: AlgorithmType;
    speed: number;
    setAlgorithm: (algo: AlgorithmType) => void;
    setSpeed: (speed: number) => void;
    resetArray: () => void;
    runAnimation: (steps: AnimationStep[]) => Promise<void>;
    stopAnimation: () => void;
    setIsPlaying: (isPlaying: boolean) => void;
    highlightIndices: number[];
    swapIndices: number[];
    foundIndices: number[];
    targetIndices: number[];
    auxiliaryArray: number[];
    buckets: number[][];
    hiddenIndices: number[];
    // Pathfinding
    grid: NodeType[][];
    mouseIsPressed: boolean;
    handleMouseDown: (row: number, col: number) => void;
    handleMouseEnter: (row: number, col: number) => void;
    handleMouseUp: () => void;
    clearBoard: () => void;
    // Graph
    graphNodes: GraphNode[];
    graphEdges: GraphEdge[];
    generateGraph: () => void;
    // Step Tracking
    steps: AnimationStep[];
    currentStep: number;
}

const VisualizerContext = createContext<VisualizerContextType | undefined>(undefined);

export const VisualizerProvider = ({ children }: { children: ReactNode }) => {
    const [array, setArray] = useState<number[]>([]);
    const [treeRoot, setTreeRoot] = useState<TreeNode | null>(null);
    const [graphNodes, setGraphNodes] = useState<GraphNode[]>([]);
    const [graphEdges, setGraphEdges] = useState<GraphEdge[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPseudocodeOpen, setIsPseudocodeOpen] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const [algorithm, setAlgorithm] = useState<AlgorithmType>("BUBBLE");
    const [speed, setSpeed] = useState(50);
    const [highlightIndices, setHighlightIndices] = useState<number[]>([]);
    const [swapIndices, setSwapIndices] = useState<number[]>([]);
    const [foundIndices, setFoundIndices] = useState<number[]>([]);
    const [targetIndices, setTargetIndices] = useState<number[]>([]);
    const [steps, setSteps] = useState<AnimationStep[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(-1);

    // DP State
    const [dpTable, setDpTable] = useState<(number | string | null)[][]>([]);
    const [dpLabels, setDpLabels] = useState<{ row: string[]; col: string[] }>({ row: [], col: [] });
    const [problemStatement, setProblemStatement] = useState<string>("");
    const [lcsStrings, setLCSStrings] = useState<[string, string]>(["AGGTAB", "GXTXAYB"]); // Default Strings


    const [visitedNodeIds, setVisitedNodeIds] = useState<string[]>([]);
    const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
    const [traversalResult, setTraversalResult] = useState<string>("");

    // Reset function
    const resetVisualizer = () => {
        setHighlightIndices([]);
        setVisitedNodeIds([]);
        setActiveNodeId(null);
        setTraversalResult("");
        setSteps([]);
        setCurrentStep(-1);
    }
    const [auxiliaryArray, setAuxiliaryArray] = useState<number[]>([]);
    const [buckets, setBuckets] = useState<number[][]>(Array.from({ length: 10 }, () => []));
    const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);

    // ... (rest of the code)

    // In generateArray/initialization hooks, reset them


    // Pathfinding State
    const [grid, setGrid] = useState<NodeType[][]>([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

    // Grid Configuration
    const START_NODE_ROW = 10;
    const START_NODE_COL = 10;
    const FINISH_NODE_ROW = 10;
    const FINISH_NODE_COL = 40;

    const createNode = (col: number, row: number): NodeType => {
        return {
            col,
            row,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
            status: "unvisited",
        };
    };

    const getInitialGrid = useCallback(() => {
        const grid = [];
        for (let row = 0; row < 20; row++) {
            const currentRow = [];
            for (let col = 0; col < 50; col++) {
                currentRow.push(createNode(col, row));
            }
            grid.push(currentRow);
        }
        return grid;
    }, []);

    // Ref to track if we should stop
    const shouldStopRef = useRef(false);

    // Initialize array
    const generateArray = useCallback((length: number = 50) => {
        setVisitedNodeIds([]);
        setActiveNodeId(null);
        setTraversalResult("");
        if (algorithm === "SUDOKU") {
            // Hardcoded "Easy" Puzzle for demo
            // 0 represents empty
            const puzzle = [
                5, 3, 0, 0, 7, 0, 0, 0, 0,
                6, 0, 0, 1, 9, 5, 0, 0, 0,
                0, 9, 8, 0, 0, 0, 0, 6, 0,
                8, 0, 0, 0, 6, 0, 0, 0, 3,
                4, 0, 0, 8, 0, 3, 0, 0, 1,
                7, 0, 0, 0, 2, 0, 0, 0, 6,
                0, 6, 0, 0, 0, 0, 2, 8, 0,
                0, 0, 0, 4, 1, 9, 0, 0, 5,
                0, 0, 0, 0, 8, 0, 0, 7, 9
            ];
            setArray(puzzle);
        } else if (algorithm === "RADIX" || algorithm === "BUCKET") {
            // Increased to 30 as per user request, now that scrolling is supported
            const newArray = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 5);
            setArray(newArray);
        } else if (algorithm === "KNAPSACK") {
            const { table, labels, problemStatement } = getKnapsackSetup();
            setDpTable(table);
            setDpLabels(labels);
            setProblemStatement(problemStatement || "");
            setArray([]);
            setArray([]);
        } else if (algorithm === "LCS" || algorithm === "KMP") {
            // For LCS and KMP, we use lcsStrings.
            // Setup mostly happens in component or on run, but let's clear dpTable if switching to KMP to avoid LCS table showing
            // Actually KMP uses StringSearchVisualizer not DPTable.
            setDpTable([]);
            setDpLabels({ row: [], col: [] });
            setProblemStatement("");
            setArray([]);
            setTreeRoot(null);
        } else if (algorithm === "STACK" || algorithm === "QUEUE" || algorithm === "LINKED_LIST") {
            // Start empty for interactive DS
            setArray([]);
            setProblemStatement("");
        } else if (algorithm === "BST" || algorithm === "AVL") {
            setTreeRoot(null);
            setArray([]);
            setProblemStatement("");
        } else if (algorithm === "SCC") {
            setGraphNodes([]);
            setGraphEdges([]);
            setProblemStatement("");
        } else {
            setTreeRoot(null);
            setProblemStatement("");
            const newArray = Array.from({ length }, () => Math.floor(Math.random() * 100) + 5);
            setArray(newArray);
        }
        setIsSorted(false);
        setHighlightIndices([]);
        setHighlightIndices([]);
        setSwapIndices([]);
        setFoundIndices([]);
        setTargetIndices([]);
        setAuxiliaryArray([]);
        setBuckets(Array.from({ length: 10 }, () => []));
        setHiddenIndices([]);
        // Stop any running animation
        shouldStopRef.current = true;
        setIsPlaying(false);
        setSteps([]);
        setCurrentStep(-1);
    }, [algorithm, lcsStrings]);


    useEffect(() => {
        generateArray();
        const initialGrid = getInitialGrid();
        setGrid(initialGrid);
    }, [generateArray, getInitialGrid]);

    // Grid Handlers
    const toggleWall = (grid: NodeType[][], row: number, col: number) => {
        const newGrid = [...grid];
        const node = newGrid[row][col];
        if (node.isStart || node.isFinish) return newGrid;

        const newNode = {
            ...node,
            isWall: !node.isWall,
            status: !node.isWall ? "wall" as const : "unvisited" as const,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    };

    const handleMouseDown = (row: number, col: number) => {
        if (isPlaying) return;
        const newGrid = toggleWall(grid, row, col);
        setGrid(newGrid);
        setMouseIsPressed(true);
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (!mouseIsPressed || isPlaying) return;
        const newGrid = toggleWall(grid, row, col);
        setGrid(newGrid);

    };

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    };

    const clearBoard = () => {
        if (isPlaying) return;
        const newGrid = getInitialGrid();
        setGrid(newGrid);
    };

    const resetArray = () => {
        if (isPlaying) return;
        generateArray();
    };

    const generateGraph = () => {
        if (isPlaying) return;

        // Generate random graph with 8-12 nodes
        const nodeCount = Math.floor(Math.random() * 5) + 8;
        const nodes: GraphNode[] = [];
        const edges: GraphEdge[] = [];

        // Create nodes in a circular layout
        const centerX = 400;
        const centerY = 300;
        const radius = 150;

        for (let i = 0; i < nodeCount; i++) {
            const angle = (i / nodeCount) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            nodes.push({
                id: `node-${i}`,
                x,
                y,
                value: i
            });
        }

        // Create random edges (ensure connectivity)
        const edgeCount = Math.floor(nodeCount * 1.5);
        const edgeSet = new Set<string>();

        // First, create a spanning tree to ensure connectivity
        for (let i = 1; i < nodeCount; i++) {
            const source = Math.floor(Math.random() * i);
            const target = i;
            const key = `${source}-${target}`;
            edgeSet.add(key);

            edges.push({
                source: `node-${source}`,
                target: `node-${target}`,
                weight: Math.floor(Math.random() * 10) + 1
            });
        }

        // Add additional random edges
        while (edges.length < edgeCount) {
            const source = Math.floor(Math.random() * nodeCount);
            const target = Math.floor(Math.random() * nodeCount);

            if (source !== target) {
                const key = `${Math.min(source, target)}-${Math.max(source, target)}`;
                if (!edgeSet.has(key)) {
                    edgeSet.add(key);
                    edges.push({
                        source: `node-${source}`,
                        target: `node-${target}`,
                        weight: Math.floor(Math.random() * 10) + 1
                    });
                }
            }
        }

        setGraphNodes(nodes);
        setGraphEdges(edges);
    };

    // Helper for async delay
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const stopAnimation = () => {
        shouldStopRef.current = true;
        setIsPlaying(false);
        setHighlightIndices([]);
        setSwapIndices([]);
        setFoundIndices([]);
        setTargetIndices([]);
        setAuxiliaryArray([]);
        setBuckets(Array.from({ length: 10 }, () => []));
        setHiddenIndices([]);
        setIsSorted(false);
        setSteps([]);
        setCurrentStep(-1);
    };

    const runAnimation = async (steps: AnimationStep[]) => {
        setIsPlaying(true);
        setIsSorted(false);
        shouldStopRef.current = false;

        setSwapIndices([]);
        setHighlightIndices([]);

        // Calculate delay based on speed (1-100)
        // 100 = Fast (1ms), 1 = Slow (500ms)
        const getDelay = () => Math.max(1, 400 - (speed * 4));

        setSteps(steps);

        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];

            if (step.type === "compare") {
                setHighlightIndices(step.indices);
                setSwapIndices([]);
            } else if (step.type === "swap") {
                setSwapIndices(step.indices);
                setHighlightIndices([]);

                setArray((prev) => {
                    const newArr = [...prev];
                    const [a, b] = step.indices;
                    [newArr[a], newArr[b]] = [newArr[b], newArr[a]];
                    return newArr;
                });
            } else if (step.type === "overwrite") {
                setHighlightIndices(step.indices);
                setSwapIndices([]);

                if (step.value !== undefined) {
                    setArray((prev) => {
                        const newArr = [...prev];
                        newArr[step.indices[0]] = step.value!;
                        return newArr;
                    });
                }
            } else if (step.type === "visit" || step.type === "path") {
                // Indices for pathfinding are [row, col]
                const [row, col] = step.indices;

                setGrid((prevGrid) => {
                    const newGrid = [...prevGrid];
                    // Clone the row to avoid mutation
                    newGrid[row] = [...newGrid[row]];

                    const node = newGrid[row][col];
                    const newNode = {
                        ...node,
                        status: step.type === "visit" ? "visited" : "path",
                        isVisited: true,
                    } as NodeType; // Explicit cast to avoid type issues if needed

                    newGrid[row][col] = newNode;
                    return newGrid;
                });
            } else if (step.type === "wall") {
                const [row, col] = step.indices;
                setGrid((prevGrid) => {
                    const newGrid = [...prevGrid];
                    newGrid[row] = [...newGrid[row]];
                    const node = newGrid[row][col];

                    if (node.isStart || node.isFinish) return prevGrid; // Protect Start/Finish

                    const newNode = {
                        ...node,
                        isWall: true,
                        status: "wall" as const,
                    };
                    newGrid[row][col] = newNode;
                    return newGrid;
                });
            } else if (step.type === "found") {
                setFoundIndices(step.indices);
                setHighlightIndices([]);
                setSwapIndices([]);
            } else if (step.type === "target") {
                setTargetIndices(step.indices);
            } else if (step.type === "replace") {
                if (step.newArray) {
                    setArray(step.newArray);
                }
            } else if (step.type === "updateAux") {
                if (step.value !== undefined) {
                    setAuxiliaryArray((prev) => {
                        const newArr = [...prev];
                        // Ensure array is large enough if we are setting an index outside current bounds
                        // Though usually we initialized with 0s
                        if (step.indices[0] >= newArr.length) {
                            // fill with 0s up to index? or just sets
                            // Array expansion in JS handles empty slots, but let's be safe if we want 0s
                            // actually counting sort init step will handle size
                        }
                        newArr[step.indices[0]] = step.value!;
                        return newArr;
                    });
                }
            } else if (step.type === "moveToBucket") {
                if (step.value !== undefined && step.bucketIndex !== undefined) {
                    // 1. Hide from main array
                    setHiddenIndices(prev => [...prev, step.indices[0]]);

                    // 2. Add to bucket
                    setBuckets(prev => {
                        const newBuckets = [...prev];
                        newBuckets[step.bucketIndex!] = [...newBuckets[step.bucketIndex!], step.value!];
                        return newBuckets;
                    });
                }
            } else if (step.type === "restore") {
                if (step.value !== undefined) {
                    // Restore to main array (overwrite)
                    setArray(prev => {
                        const newArr = [...prev];
                        newArr[step.indices[0]] = step.value!;
                        return newArr;
                    });

                    // Unhide the index (it's back) - effectively we are re-writing the array
                    // But if we are restoring from buckets, we are effectively emptying buckets too?
                    // Usually "restore" means taking from bucket and putting in array.
                    // So we should remove from bucket?
                    // Simpler visual: Just clear buckets at end of pass? 
                    // Or remove one by one.
                    // Let's remove one by one from the head of the specific bucket if possible?
                    if (step.bucketIndex !== undefined) {
                        setBuckets(prev => {
                            const newBuckets = [...prev];
                            // Remove first item
                            newBuckets[step.bucketIndex!] = newBuckets[step.bucketIndex!].slice(1);
                            return newBuckets;
                        });
                    }

                    // Since we are overwriting array[i], we should ensure it's visible
                    setHiddenIndices(prev => prev.filter(idx => idx !== step.indices[0]));
                }
            } else if (step.type === "updateTable") {
                setDpTable((prev) => {
                    const newTable = prev.map(row => [...row]);
                    if (step.row !== undefined && step.col !== undefined) {
                        newTable[step.row][step.col] = step.val!;
                    }
                    return newTable;
                });
                // DPTable will handle highlighting via highlightIndices being [row, col]
            }

            if (shouldStopRef.current) {
                break;
            }

            // Update current step AFTER processing, before sleep
            setCurrentStep(i);
            await sleep(getDelay());
        }

        setHighlightIndices([]);
        setSwapIndices([]);
        // Keep found/target indices for result view? 
        // Usually we want to keep "Found" state. Target too.
        // But reset isPlaying.
        setIsPlaying(false);

        if (!shouldStopRef.current) {
            setIsSorted(true);
        }
    };

    return (
        <VisualizerContext.Provider
            value={{
                array,
                setArray,
                treeRoot,
                setTreeRoot,
                visitedNodeIds,
                setVisitedNodeIds,
                activeNodeId,
                setActiveNodeId,
                traversalResult,
                setTraversalResult,
                graphNodes,
                setGraphNodes,
                graphEdges,
                setGraphEdges,
                isPlaying,
                isSidebarOpen,
                setIsSidebarOpen,
                isPseudocodeOpen,
                setIsPseudocodeOpen,
                isSorted,
                algorithm,
                speed,
                setAlgorithm,
                setSpeed,
                resetArray,
                runAnimation,
                stopAnimation,
                setIsPlaying,
                highlightIndices,
                swapIndices,
                foundIndices,
                targetIndices,
                auxiliaryArray,
                buckets,
                hiddenIndices,
                dpTable,
                dpLabels,
                problemStatement,
                setDpTable,
                setDpLabels,
                setProblemStatement,
                lcsStrings,
                setLCSStrings,
                grid,

                mouseIsPressed,
                handleMouseDown,
                handleMouseEnter,
                handleMouseUp,
                clearBoard,
                graphNodes,
                graphEdges,
                generateGraph,
                steps,
                currentStep
            }}
        >
            {children}
        </VisualizerContext.Provider>
    );
};

export const useVisualizer = () => {
    const context = useContext(VisualizerContext);
    if (!context) {
        throw new Error("useVisualizer must be used within a VisualizerProvider");
    }
    return context;
};
