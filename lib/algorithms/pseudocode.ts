import { AlgorithmType, AnimationStep } from "@/types";

export interface PseudocodeDef {
    lines: string[];
    getLine: (step: AnimationStep) => number;
}

// Helper to keep code clean
const createDef = (lines: string[], getLine: (step: AnimationStep) => number): PseudocodeDef => ({
    lines,
    getLine
});

export const PSEUDOCODE_DATA: Partial<Record<AlgorithmType, PseudocodeDef>> = {
    BUBBLE: createDef(
        [
            "for i = 0 to n-1:",
            "  for j = 0 to n-i-1:",
            "    if arr[j] > arr[j+1]:",
            "      swap(arr[j], arr[j+1])",
            "return arr"
        ],
        (step) => {
            if (step.type === "compare") return 2; // if arr[j] > arr[j+1]
            if (step.type === "swap") return 3;    // swap(...)
            return 1; // Default to loop
        }
    ),
    SELECTION: createDef(
        [
            "for i = 0 to n-1:",
            "  min_idx = i",
            "  for j = i+1 to n:",
            "    if arr[j] < arr[min_idx]:",
            "      min_idx = j",
            "  swap(arr[i], arr[min_idx])"
        ],
        (step) => {
            if (step.type === "compare") return 3; // if arr[j] < ...
            if (step.type === "swap") return 5;    // swap(...)
            return 2; // scanning
        }
    ),
    INSERTION: createDef(
        [
            "for i = 1 to n:",
            "  key = arr[i], j = i-1",
            "  while j >= 0 and arr[j] > key:",
            "    arr[j+1] = arr[j]",
            "    j = j - 1",
            "  arr[j+1] = key"
        ],
        (step) => {
            if (step.type === "compare") return 2; // while check
            if (step.type === "swap" || step.type === "overwrite") return 3; // shift
            return 0; // loop
        }
    ),
    BFS: createDef(
        [
            "Q.push(start), mark visited",
            "while Q is not empty:",
            "  u = Q.pop()",
            "  for each neighbor v of u:",
            "    if v not visited:",
            "      mark v visited",
            "      Q.push(v)"
        ],
        (step) => {
            // This is tricky without more step details, assuming generic mapping
            // Many BFS steps are just "visit" or "path"
            if (step.type === "visit") return 2; // u = Q.pop() or processing
            if (step.type === "path") return 5;  // mark visited / push
            return 1;
        }
    ),
    DFS: createDef(
        [
            "function DFS(u):",
            "  mark u as visited",
            "  for each neighbor v of u:",
            "    if v not visited:",
            "      DFS(v)"
        ],
        (step) => {
            if (step.type === "visit") return 1;
            if (step.type === "path") return 3;
            return 0;
        }
    ), // Comma added here
    MERGE: createDef(
        [
            "function mergeSort(arr, l, r):",
            "  if l >= r: return",
            "  m = (l + r) / 2",
            "  mergeSort(arr, l, m)",
            "  mergeSort(arr, m+1, r)",
            "  merge(arr, l, m, r)" // We'll highlight this mostly
        ],
        (step) => {
            // Visualize mostly the merge process
            if (step.type === "overwrite") return 5; // Merging/Copying
            if (step.type === "compare") return 5; // Comparing during merge
            return 2; // dividing
        }
    ),
    QUICK: createDef(
        [
            "function partition(arr, low, high):",
            "  pivot = arr[high]",
            "  i = low - 1",
            "  for j = low to high - 1:",
            "    if arr[j] < pivot:",
            "      i++, swap(arr[i], arr[j])",
            "  swap(arr[i + 1], arr[high])",
            "  return i + 1"
        ],
        (step) => {
            if (step.type === "compare") return 4; // if arr[j] < pivot
            if (step.type === "swap") return 5;    // swap(arr[i], arr[j])
            return 3; // looping
        }
    ),
    HEAP: createDef(
        [
            "buildMaxHeap(arr)",
            "for i = n-1 to 1:",
            "  swap(arr[0], arr[i])",
            "  heapify(arr, 0, i)"
        ],
        (step) => {
            if (step.type === "swap") return 2;
            if (step.type === "compare") return 3; // Heapify internals
            return 1;
        }
    ),
    TOPOLOGICAL_SORT: createDef(
        [
            "function topologicalSort(graph):",
            "  visited = set()",
            "  stack = []",
            "  for each vertex v:",
            "    if v not in visited:",
            "      dfs(v, visited, stack)",
            "  return reversed(stack)"
        ],
        (step) => {
            if (step.type === "visit") return 5; // DFS visit
            if (step.type === "compare") return 5; // Checking neighbors
            if (step.type === "path") return 6; // Adding to stack
            if (step.type === "found") return 6; // Final ordering
            return 3; // Loop iteration
        }
    )
};
