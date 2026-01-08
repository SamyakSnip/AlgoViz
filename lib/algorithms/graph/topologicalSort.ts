import { AnimationStep, NodeType } from "@/types";

export const topologicalSort = (grid: NodeType[][]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const rows = grid.length;
    const cols = grid[0].length;

    // Create visited set and stack for result
    const visited = new Set<string>();
    const stack: [number, number][] = [];

    const getKey = (row: number, col: number) => `${row},${col}`;

    // DFS helper function
    const dfs = (row: number, col: number) => {
        const key = getKey(row, col);
        if (visited.has(key)) return;

        visited.add(key);
        steps.push({ type: "visit", indices: [row, col] });

        // Visit neighbors (right, down, left, up)
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (
                newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols &&
                !grid[newRow][newCol].isWall
            ) {
                const neighborKey = getKey(newRow, newCol);
                if (!visited.has(neighborKey)) {
                    steps.push({ type: "compare", indices: [row, col, newRow, newCol] });
                    dfs(newRow, newCol);
                }
            }
        }

        // Add to stack after visiting all descendants
        stack.push([row, col]);
        steps.push({ type: "path", indices: [row, col] });
    };

    // Start DFS from all unvisited nodes (to handle disconnected components)
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (!grid[row][col].isWall && !visited.has(getKey(row, col))) {
                dfs(row, col);
            }
        }
    }

    // The stack now contains nodes in reverse topological order
    // Mark them in topological order
    while (stack.length > 0) {
        const [row, col] = stack.pop()!;
        steps.push({ type: "found", indices: [row, col] });
    }

    return steps;
};
