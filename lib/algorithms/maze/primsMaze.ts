import { AnimationStep, NodeType } from "@/types";

export const primsMaze = (
    grid: NodeType[][],
    startNode: NodeType,
    finishNode: NodeType
): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const rows = grid.length;
    const cols = grid[0].length;

    // Pick random starting cell
    const startRow = Math.floor(Math.random() * rows);
    const startCol = Math.floor(Math.random() * cols);

    const passages = new Set<string>();
    const walls: [number, number][] = [];

    const getKey = (row: number, col: number) => `${row},${col}`;

    // Mark starting cell as passage
    passages.add(getKey(startRow, startCol));

    // Add walls of starting cell
    addWalls(startRow, startCol, walls, passages, rows, cols);

    // While there are walls in the list
    while (walls.length > 0) {
        // Pick random wall
        const randomIndex = Math.floor(Math.random() * walls.length);
        const [wallRow, wallCol] = walls[randomIndex];
        walls.splice(randomIndex, 1);

        // Check cells on both sides of wall
        const neighbors = getUnvisitedNeighbors(wallRow, wallCol, passages, rows, cols);

        if (neighbors.length > 0) {
            // Make this cell a passage
            passages.add(getKey(wallRow, wallCol));

            // Add neighboring walls
            for (const [nRow, nCol] of neighbors) {
                if (!passages.has(getKey(nRow, nCol))) {
                    passages.add(getKey(nRow, nCol));
                    addWalls(nRow, nCol, walls, passages, rows, cols);
                }
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

function addWalls(
    row: number,
    col: number,
    walls: [number, number][],
    visited: Set<string>,
    rows: number,
    cols: number
) {
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const getKey = (r: number, c: number) => `${r},${c}`;

    for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
            newRow >= 0 && newRow < rows &&
            newCol >= 0 && newCol < cols &&
            !visited.has(getKey(newRow, newCol))
        ) {
            walls.push([newRow, newCol]);
        }
    }
}

function getUnvisitedNeighbors(
    row: number,
    col: number,
    visited: Set<string>,
    rows: number,
    cols: number
): [number, number][] {
    const neighbors: [number, number][] = [];
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const getKey = (r: number, c: number) => `${r},${c}`;

    for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
            newRow >= 0 && newRow < rows &&
            newCol >= 0 && newCol < cols &&
            !visited.has(getKey(newRow, newCol))
        ) {
            neighbors.push([newRow, newCol]);
        }
    }

    return neighbors;
}
