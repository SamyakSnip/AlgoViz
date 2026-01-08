import { AnimationStep, NodeType } from "@/types";

export const floydWarshall = (
    grid: NodeType[][],
    startNode: NodeType,
    finishNode: NodeType
): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const rows = grid.length;
    const cols = grid[0].length;

    // Create distance matrix
    const dist: number[][] = [];
    const nodeToIndex = new Map<string, number>();
    const indexToNode: NodeType[] = [];

    let nodeCount = 0;

    // Build node mapping
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (!grid[row][col].isWall) {
                const key = `${row},${col}`;
                nodeToIndex.set(key, nodeCount);
                indexToNode.push(grid[row][col]);
                nodeCount++;
            }
        }
    }

    // Initialize distance matrix
    for (let i = 0; i < nodeCount; i++) {
        dist[i] = [];
        for (let j = 0; j < nodeCount; j++) {
            dist[i][j] = i === j ? 0 : Infinity;
        }
    }

    // Set edge weights (adjacent cells have weight 1)
    for (let i = 0; i < nodeCount; i++) {
        const node = indexToNode[i];
        const neighbors = getNeighbors(node, grid, rows, cols);

        for (const neighbor of neighbors) {
            const j = nodeToIndex.get(`${neighbor.row},${neighbor.col}`)!;
            dist[i][j] = 1;
        }
    }

    // Floyd-Warshall algorithm
    for (let k = 0; k < nodeCount; k++) {
        const kNode = indexToNode[k];
        steps.push({ type: "visit", indices: [kNode.row, kNode.col] });

        for (let i = 0; i < nodeCount; i++) {
            for (let j = 0; j < nodeCount; j++) {
                const iNode = indexToNode[i];
                const jNode = indexToNode[j];

                steps.push({
                    type: "compare",
                    indices: [iNode.row, iNode.col, jNode.row, jNode.col]
                });

                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                    steps.push({
                        type: "path",
                        indices: [jNode.row, jNode.col]
                    });
                }
            }
        }
    }

    // Mark the shortest path to finish
    const startIdx = nodeToIndex.get(`${startNode.row},${startNode.col}`)!;
    const finishIdx = nodeToIndex.get(`${finishNode.row},${finishNode.col}`)!;

    if (dist[startIdx][finishIdx] !== Infinity) {
        steps.push({
            type: "found",
            indices: [finishNode.row, finishNode.col]
        });
    }

    return steps;
};

function getNeighbors(node: NodeType, grid: NodeType[][], rows: number, cols: number): NodeType[] {
    const neighbors: NodeType[] = [];
    const { row, col } = node;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

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
}
