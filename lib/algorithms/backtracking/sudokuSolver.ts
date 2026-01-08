import { AnimationStep } from "@/types";

export const sudokuSolver = (initialBoard: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const board = [...initialBoard]; // Work on copy to simulate
    // Note: initialBoard is flattened 81 array. 0 = empty.

    const isValid = (board: number[], row: number, col: number, num: number) => {
        // Row check
        for (let x = 0; x < 9; x++) {
            if (board[row * 9 + x] === num) return false;
        }

        // Col check
        for (let x = 0; x < 9; x++) {
            if (board[x * 9 + col] === num) return false;
        }

        // 3x3 Box check
        const startRow = row - row % 3;
        const startCol = col - col % 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[(startRow + i) * 9 + (startCol + j)] === num) return false;
            }
        }
        return true;
    };

    const solve = (): boolean => {
        for (let i = 0; i < 81; i++) {
            if (board[i] === 0) {
                const row = Math.floor(i / 9);
                const col = i % 9;

                for (let num = 1; num <= 9; num++) {
                    // Visual: Checking this cell
                    steps.push({ type: "compare", indices: [i] });

                    if (isValid(board, row, col, num)) {
                        board[i] = num;
                        // Visual: Place number
                        steps.push({ type: "overwrite", indices: [i], value: num });
                        // Visual: Mark as "safe" temporarily
                        steps.push({ type: "found", indices: [i] });

                        if (solve()) return true;

                        // Backtrack
                        board[i] = 0;
                        // Visual: Remove number (value 0)
                        steps.push({ type: "overwrite", indices: [i], value: 0 });
                        // Visual: Flash red to show backtrack
                        steps.push({ type: "target", indices: [i] });
                    }
                }
                return false;
            }
        }
        return true;
    };

    solve();
    return steps;
};
