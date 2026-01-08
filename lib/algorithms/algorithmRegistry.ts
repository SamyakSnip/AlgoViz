import { AnimationStep, AlgorithmType, NodeType } from "@/types";
import { bubbleSort } from "./sorting/bubbleSort";
import { selectionSort } from "./sorting/selectionSort";
import { insertionSort } from "./sorting/insertionSort";
import { mergeSort } from "./sorting/mergeSort";
import { quickSort } from "./sorting/quickSort";
import { heapSort } from "./sorting/heapSort";
import { shellSort } from "./sorting/shellSort";
import { countingSort } from "./sorting/countingSort";
import { radixSort } from "./sorting/radixSort";
import { bucketSort } from "./sorting/bucketSort";
import { dijkstra } from "./pathfinding/dijkstra";
import { astar } from "./pathfinding/astar";
import { bfs } from "./pathfinding/bfs";
import { dfs } from "./pathfinding/dfs";
import { greedyBFS } from "./pathfinding/greedyBFS";
import { bidirectionalSearch } from "./pathfinding/bidirectional";
import { jps } from "./pathfinding/jps";
import { prims } from "./graph/prims";
import { kruskals } from "./graph/kruskals";
import { connectedComponents } from "./graph/connectedComponents";
import { knapsack } from "./dp/knapsack";

import { lcs } from "./dp/lcs";
import { lis } from "./dp/lis";
// ... imports
import { kmp } from "./string/kmp";
import { rabinKarp } from "./string/rabinKarp";



import { linearSearch } from "./searching/linearSearch";
import { binarySearch } from "./searching/binarySearch";
import { nQueens } from "./backtracking/nQueens";
import { sudokuSolver } from "./backtracking/sudokuSolver";

export const generateSteps = (
    algorithm: AlgorithmType,
    array: number[],
    grid?: NodeType[][],
    lcsStrings?: [string, string]
): AnimationStep[] => {

    switch (algorithm) {
        // Sorting
        case "BUBBLE": return bubbleSort(array);
        case "SELECTION": return selectionSort(array);
        case "INSERTION": return insertionSort(array);
        case "MERGE": return mergeSort(array);
        case "QUICK": return quickSort(array);
        case "HEAP": return heapSort(array);
        case "SHELL": return shellSort(array);
        case "COUNTING": return countingSort(array);
        case "RADIX": return radixSort(array);
        case "BUCKET": return bucketSort(array);

        // Searching
        case "LINEAR": return linearSearch(array);
        case "BINARY": return binarySearch(array);

        // Backtracking
        case "NQUEENS": return nQueens();
        case "SUDOKU": return sudokuSolver(array);

        // Pathfinding & Graph (Grid Required)
        case "DIJKSTRA":
        case "ASTAR":
        case "BFS":
        case "DFS":
        case "GREEDY_BFS":
        case "BIDIRECTIONAL":
        case "JPS":
        case "PRIMS":
        case "KRUSKALS":
            if (!grid) {
                console.error("Grid is required for Pathfinding");
                return [];
            }
            // Find start and finish
            let startNode, finishNode;
            for (const row of grid) {
                for (const node of row) {
                    if (node.isStart) startNode = node;
                    if (node.isFinish) finishNode = node;
                }
            }

            // Algorithms that don't STRICTLY need start/finish (like MST) might still work, 
            // but standard pathfinding needs them.
            // Connected Components definitely doesn't need them.

            if (algorithm === "PRIMS" || algorithm === "KRUSKALS") {
                // MST generally works with just grid/graph, but here we might rely on startNode for starting point of Prim's
                // Prim's usually needs a start. 
                if (!startNode || !finishNode) return []; // Require both for safety/types, or use startNode as dummy

                // To satisfy types (assuming they expect NodeType), we ensure they are defined.
                if (algorithm === "PRIMS") return prims(grid, startNode, finishNode);
                if (algorithm === "KRUSKALS") return kruskals(grid, startNode, finishNode);
            }

            if (!startNode || !finishNode) return [];

            if (algorithm === "DIJKSTRA") return dijkstra(grid, startNode, finishNode);
            if (algorithm === "ASTAR") return astar(grid, startNode, finishNode);
            if (algorithm === "BFS") return bfs(grid, startNode, finishNode);
            if (algorithm === "DFS") return dfs(grid, startNode, finishNode);
            if (algorithm === "GREEDY_BFS") return greedyBFS(grid, startNode, finishNode);
            if (algorithm === "BIDIRECTIONAL") return bidirectionalSearch(grid, startNode, finishNode);
            if (algorithm === "JPS") return jps(grid, startNode, finishNode);
            return [];

        case "CONNECTED_COMPONENTS":
            if (!grid) return [];
            return connectedComponents(grid);


        // Dynamic Programming
        case "KNAPSACK": return knapsack();
        case "LCS": return lcs(lcsStrings?.[0] || "", lcsStrings?.[1] || "");
        case "LIS": return lis(array);
        case "KMP": return kmp(lcsStrings?.[0] || "", lcsStrings?.[1] || "");
        case "RABIN_KARP": return rabinKarp(lcsStrings?.[0] || "", lcsStrings?.[1] || "");

        // Data Structures (UI-driven, no step generation needed)
        case "STACK":
        case "QUEUE":
        case "LINKED_LIST":
            console.info(`${algorithm} is UI-driven with DSControls`);
            return [];

        // Tree Algorithms (UI-driven via TreeControls)
        case "BST":
        case "AVL":
            console.info(`${algorithm} is UI-driven with TreeControls`);
            return [];

        // Graph Algorithms (UI-driven via GraphControls)
        case "SCC":
            console.info("SCC is UI-driven with GraphControls");
            return [];

        default:
            console.warn(`Algorithm ${algorithm} not implemented`);
            return [];
    }
};
