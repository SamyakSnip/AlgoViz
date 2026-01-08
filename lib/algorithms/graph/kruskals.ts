import { AnimationStep, NodeType } from "@/types";

interface Edge {
    u: NodeType;
    v: NodeType;
}

export const kruskals = (
    grid: NodeType[][],
    startNode: NodeType,
    finishNode: NodeType
): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const rows = grid.length;
    const cols = grid[0].length;

    // 1. Generate all edges
    const edges: Edge[] = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (r < rows - 1) edges.push({ u: grid[r][c], v: grid[r + 1][c] }); // Down
            if (c < cols - 1) edges.push({ u: grid[r][c], v: grid[r][c + 1] }); // Right
        }
    }

    // 2. Shuffle (Simulate random weights)
    for (let i = edges.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [edges[i], edges[j]] = [edges[j], edges[i]];
    }

    // 3. DSU
    const parent = new Map<string, string>();
    const getKey = (n: NodeType) => `${n.row}-${n.col}`;

    // Initialize DSU
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const key = getKey(grid[r][c]);
            parent.set(key, key);
        }
    }

    const find = (key: string): string => {
        if (parent.get(key) !== key) {
            parent.set(key, find(parent.get(key)!));
        }
        return parent.get(key)!;
    };

    const union = (key1: string, key2: string) => {
        const root1 = find(key1);
        const root2 = find(key2);
        if (root1 !== root2) {
            parent.set(root1, root2);
            return true;
        }
        return false;
    };

    // 4. Process Edges
    for (const edge of edges) {
        steps.push({ type: "compare", indices: [edge.u.row, edge.u.col] });
        steps.push({ type: "compare", indices: [edge.v.row, edge.v.col] });

        const keyU = getKey(edge.u);
        const keyV = getKey(edge.v);

        if (union(keyU, keyV)) {
            // Edge added to MST
            // Visualize by highlighting both nodes as 'part of tree'
            // We can use 'visit' or 'path'
            steps.push({ type: "visit", indices: [edge.u.row, edge.u.col] });
            steps.push({ type: "visit", indices: [edge.v.row, edge.v.col] });

            // Maybe overwrite to ensure they stay highlighted uniquely?
            // Or 'path' for final color.
            steps.push({ type: "path", indices: [edge.u.row, edge.u.col] });
            steps.push({ type: "path", indices: [edge.v.row, edge.v.col] });
        }
    }

    return steps;
};
