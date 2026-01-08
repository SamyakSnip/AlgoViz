export type AlgorithmType =
    | "BUBBLE"
    | "SELECTION"
    | "INSERTION"
    | "MERGE"
    | "QUICK"
    | "HEAP"
    | "RADIX"
    | "COUNTING"
    | "SHELL"
    | "BUCKET"
    | "DIJKSTRA"
    | "ASTAR"
    | "BFS"
    | "DFS"
    | "LINEAR"
    | "BINARY"
    | "NQUEENS"
    | "SUDOKU"
    | "GREEDY_BFS"
    | "BIDIRECTIONAL"
    | "JPS"
    | "PRIMS"
    | "KRUSKALS"
    | "KNAPSACK"
    | "LCS"
    | "LIS"
    | "KMP"
    | "RABIN_KARP"
    | "CONNECTED_COMPONENTS"
    | "STACK"
    | "QUEUE"
    | "LINKED_LIST"
    | "BST"
    | "AVL"
    | "SCC";








export type AlgorithmCategory = "Sorting" | "Pathfinding" | "Searching" | "Backtracking";

export interface AnimationStep {
    type: "compare" | "swap" | "overwrite" | "highlight" | "visit" | "path" | "wall" | "found" | "target" | "replace" | "updateAux" | "moveToBucket" | "restore" | "updateTable";
    indices: number[]; // For sorting: [i, j], For pathfinding: [row, col]
    value?: number; // For overwrite loop
    newArray?: number[]; // For replace loop
    bucketIndex?: number; // For Radix/Bucket sort
    row?: number; // For DP Table
    col?: number; // For DP Table
    val?: number | string; // For DP Table value
    nodeStatus?: NodeStatus; // For pathfinding updates
}

export interface TreeNode {
    id: string;
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
    height: number;
    x: number;
    y: number;
}

export interface GraphNode {
    id: string;
    x: number;
    y: number;
    value: string | number;
}

export interface GraphEdge {
    source: string;
    target: string;
}

export type NodeStatus = "unvisited" | "visited" | "wall" | "path" | "start" | "finish";

export interface NodeType {
    row: number;
    col: number;
    isStart: boolean;
    isFinish: boolean;
    distance: number;
    isVisited: boolean;
    isWall: boolean;
    heuristic?: number; // Added for A* and JPS
    previousNode: NodeType | null;
    status: NodeStatus; // To track visual state cleanly
}
