import { AnimationStep } from "@/types";

const N = 8;

export const nQueens = (): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const board = Array(N).fill(-1); // board[row] = col

    // Helper to check safety
    const isSafe = (row: number, col: number) => {
        for (let prevRow = 0; prevRow < row; prevRow++) {
            const prevCol = board[prevRow];

            // Check column conflict
            if (prevCol === col) return false;

            // Check diagonal conflict
            if (Math.abs(row - prevRow) === Math.abs(col - prevCol)) return false;
        }
        return true;
    };

    const solve = (row: number): boolean => {
        if (row === N) {
            return true; // Found a solution
        }

        for (let col = 0; col < N; col++) {
            // Visualize checking (row, col)
            // Flatten index: row * N + col
            steps.push({ type: "compare", indices: [row * N + col] });

            if (isSafe(row, col)) {
                // Place Queen
                board[row] = col;
                steps.push({ type: "overwrite", indices: [row], value: col });

                // Show as "Safe" (Green) temporarily? 
                // "found" type highlights in green.
                steps.push({ type: "found", indices: [row * N + col] });

                if (solve(row + 1)) {
                    return true;
                }

                // Backtrack
                // Remove Queen
                board[row] = -1;
                // We use -1 to represent empty. 
                // However, render logic needs to know -1 is empty.
                // context.tsx uses value for height. ChessBoard uses value for col index.
                // If value is -1, no queen.
                steps.push({ type: "overwrite", indices: [row], value: -1 });
                // Mark as visited/backtracked (maybe red?) or just clear colors?
                // "target" is red.
                steps.push({ type: "target", indices: [row * N + col] });
            } else {
                // Conflict found
                steps.push({ type: "target", indices: [row * N + col] });
            }
        }
        return false;
    };

    solve(0);
    return steps;
};
