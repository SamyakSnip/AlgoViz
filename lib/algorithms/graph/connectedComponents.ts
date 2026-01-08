import { AnimationStep, NodeType } from "@/types";

export const connectedComponents = (grid: NodeType[][]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const rows = grid.length;
    const cols = grid[0].length;

    // Helper to track visited status within the algorithm execution
    // (Since the grid nodes themselves aren't mutated instantly during animation generation)
    const visited = new Set<string>();

    const getNeighbors = (node: NodeType): NodeType[] => {
        const neighbors: NodeType[] = [];
        const { row, col } = node;
        if (row > 0) neighbors.push(grid[row - 1][col]);
        if (row < rows - 1) neighbors.push(grid[row + 1][col]);
        if (col > 0) neighbors.push(grid[row][col - 1]);
        if (col < cols - 1) neighbors.push(grid[row][col + 1]);
        return neighbors.filter(n => !n.isWall && !visited.has(`${n.row}-${n.col}`));
    };

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const node = grid[r][c];
            const key = `${r}-${c}`;

            if (!node.isWall && !visited.has(key)) {
                // Determine if this is a 'Start' or 'Finish' node from the UI?
                // The algorithm technically treats them as just traversable nodes usually,
                // unless walls block them.

                // Start BFS for this component
                const queue: NodeType[] = [node];
                visited.add(key);
                steps.push({ type: "visit", indices: [r, c] });

                while (queue.length > 0) {
                    const curr = queue.shift()!;

                    const neighbors = getNeighbors(curr);
                    for (const neighbor of neighbors) {
                        visited.add(`${neighbor.row}-${neighbor.col}`);
                        steps.push({ type: "visit", indices: [neighbor.row, neighbor.col] });
                        queue.push(neighbor);
                    }
                }
            }
        }
    }

    return steps;
};
