import { AnimationStep, NodeType } from "@/types";

export const binaryTreeMaze = (
    grid: NodeType[][],
    startNode: NodeType,
    finishNode: NodeType
): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const rows = grid.length;
    const cols = grid[0].length;

    const passages = new Set<string>();
    const getKey = (row: number, col: number) => `${row},${col}`;

    // For each cell, carve passage either north or east
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Mark current cell as passage
            passages.add(getKey(row, col));

            const canGoNorth = row > 0;
            const canGoEast = col < cols - 1;

            if (canGoNorth && canGoEast) {
                // Randomly choose north or east
                if (Math.random() < 0.5) {
                    // Carve north
                    passages.add(getKey(row - 1, col));
                } else {
                    // Carve east
                    passages.add(getKey(row, col + 1));
                }
            } else if (canGoNorth) {
                // Can only go north
                passages.add(getKey(row - 1, col));
            } else if (canGoEast) {
                // Can only go east
                passages.add(getKey(row, col + 1));
            }
        }
    }

    // Now mark all non-passage cells as walls
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (!passages.has(getKey(row, col)) &&
                !grid[row][col].isStart &&
                !grid[row][col].isFinish) {
                steps.push({ type: "wall", indices: [row, col] });
            }
        }
    }

    return steps;
};
