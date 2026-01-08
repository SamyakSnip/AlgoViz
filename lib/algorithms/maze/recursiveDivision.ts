import { AnimationStep, NodeType } from "@/types";

export const recursiveDivisionMaze = (
    grid: NodeType[][],
    startNode: NodeType,
    finishNode: NodeType
): AnimationStep[] => {
    const steps: AnimationStep[] = [];

    // Start with empty grid (clear existing walls handled by caller usually, but let's assume clear)
    const rowStart = 0;
    const rowEnd = grid.length - 1;
    const colStart = 0;
    const colEnd = grid[0].length - 1;

    // Enclose with walls
    for (let r = 0; r < grid.length; r++) {
        steps.push({ type: "wall", indices: [r, 0] });
        steps.push({ type: "wall", indices: [r, grid[0].length - 1] });
    }
    for (let c = 0; c < grid[0].length; c++) {
        steps.push({ type: "wall", indices: [0, c] });
        steps.push({ type: "wall", indices: [grid.length - 1, c] });
        // Context handles 'visit' as changing status to parsed 'visited'. 

    }

    // Implementation Note: Since I cannot easily change types across multiple files instantly without errors,
    // I will use a custom helper in Context to handle "wall" toggles if I send a "visit" step with a specific hint? 
    // No, let's update types properly. It is safer.

    // Waiting for type update...
    // For now let's write the recursive logic.

    divide(grid, rowStart, rowEnd, colStart, colEnd, "horizontal", steps);

    return steps;
};

// Simple recursive division
const divide = (
    grid: NodeType[][],
    rowStart: number,
    rowEnd: number,
    colStart: number,
    colEnd: number,
    orientation: "horizontal" | "vertical",
    steps: AnimationStep[]
) => {
    if (rowEnd < rowStart || colEnd < colStart) return;

    if (orientation === "horizontal") {
        if (rowEnd - rowStart < 2) return;

        const y = Math.floor(Math.random() * (rowEnd - rowStart + 1)) + rowStart;
        // Ensure even y for walls usually looks better in grid systems, but odd is fine too.
        // Let's stick to random for now.
        const passage = Math.floor(Math.random() * (colEnd - colStart + 1)) + colStart;

        for (let i = colStart; i <= colEnd; i++) {
            if (i !== passage) {
                // Check if valid to place wall (not start/finish) - handled by Context but good to avoid redundant steps
                // Note: We don't have isStart/isFinish property here easily accessible unless we pass it or check coords
                steps.push({ type: "wall", indices: [y, i] });
            }
        }

        divide(grid, rowStart, y - 1, colStart, colEnd, "vertical", steps);
        divide(grid, y + 1, rowEnd, colStart, colEnd, "vertical", steps);
    } else {
        if (colEnd - colStart < 2) return;

        const x = Math.floor(Math.random() * (colEnd - colStart + 1)) + colStart;
        const passage = Math.floor(Math.random() * (rowEnd - rowStart + 1)) + rowStart;

        for (let i = rowStart; i <= rowEnd; i++) {
            if (i !== passage) {
                steps.push({ type: "wall", indices: [i, x] });
            }
        }

        divide(grid, rowStart, rowEnd, colStart, x - 1, "horizontal", steps);
        divide(grid, rowStart, rowEnd, x + 1, colEnd, "horizontal", steps);
    }
};
