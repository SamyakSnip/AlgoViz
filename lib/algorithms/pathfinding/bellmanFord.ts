import { AnimationStep, NodeType } from "@/types";

export const bellmanFord = (
    grid: NodeType[][],
    startNode: NodeType,
    finishNode: NodeType
): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const rows = grid.length;
    const cols = grid[0].length;

    // Initialize distances
    const distances: { [key: string]: number } = {};
    const getKey = (node: NodeType) => `${node.row},${node.col}`;

    // Set all distances to infinity except start
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const key = getKey(grid[row][col]);
            distances[key] = Infinity;
        }
    }
    distances[getKey(startNode)] = 0;

    // Get all edges (neighbors)
    const getNeighbors = (node: NodeType): NodeType[] => {
        const neighbors: NodeType[] = [];
        const { row, col } = node;
        const directions = [
            [-1, 0], [1, 0], [0, -1], [0, 1]
        ];

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (
                newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols &&
                !grid[newRow][newCol].isWall
            ) {
                neighbors.push(grid[newRow][newCol]);
            }
        }
        return neighbors;
    };

    // Relax edges V-1 times
    for (let i = 0; i < rows * cols - 1; i++) {
        let updated = false;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const node = grid[row][col];
                if (node.isWall) continue;

                const nodeKey = getKey(node);
                const nodeDist = distances[nodeKey];

                if (nodeDist === Infinity) continue;

                steps.push({ type: "visit", indices: [row, col] });

                const neighbors = getNeighbors(node);
                for (const neighbor of neighbors) {
                    const neighborKey = getKey(neighbor);
                    const edgeWeight = 1; // Uniform weight for grid

                    steps.push({
                        type: "compare",
                        indices: [row, col, neighbor.row, neighbor.col]
                    });

                    if (nodeDist + edgeWeight < distances[neighborKey]) {
                        distances[neighborKey] = nodeDist + edgeWeight;
                        updated = true;
                        steps.push({
                            type: "path",
                            indices: [neighbor.row, neighbor.col]
                        });
                    }
                }
            }
        }

        // Early termination if no updates
        if (!updated) break;
    }

    // Mark the path to finish node
    if (distances[getKey(finishNode)] !== Infinity) {
        steps.push({
            type: "found",
            indices: [finishNode.row, finishNode.col]
        });
    }

    return steps;
};
