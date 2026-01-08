import { AnimationStep } from "@/types";
import { DBTableSetup } from "./knapsack";

export const getLCSSetup = (str1: string, str2: string): DBTableSetup => {
    const rLabels = ["ε", ...str1.split("")];
    const cLabels = ["ε", ...str2.split("")];

    const table = Array.from({ length: str1.length + 1 }, (_, r) =>
        Array.from({ length: str2.length + 1 }, (_, c) => (r === 0 || c === 0 ? 0 : null))
    );

    const problemStatement = `Longest Common Subsequence\nString 1: "${str1}"\nString 2: "${str2}"`;

    return { table, labels: { row: rLabels, col: cLabels }, problemStatement };
};

export const lcs = (str1: string, str2: string): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const m = str1.length;
    const n = str2.length;
    const cols = n + 1; // Width of the DP table

    // DP Table initialized with 0s
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Helper to get flat index
    const flat = (r: number, c: number) => r * cols + c;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // Highlight current cell [i, j]
            steps.push({ type: "compare", indices: [flat(i, j)] });

            if (str1[i - 1] === str2[j - 1]) {
                // Match found
                // Highlight diagonal dependency [i-1, j-1]
                steps.push({ type: "target", indices: [flat(i - 1, j - 1)] });

                dp[i][j] = 1 + dp[i - 1][j - 1];

                steps.push({ type: "updateTable", indices: [flat(i, j)], row: i, col: j, val: dp[i][j] });
            } else {
                // Mismatch, take max of left or top
                // Highlight [i-1, j] and [i, j-1]
                steps.push({ type: "target", indices: [flat(i - 1, j), flat(i, j - 1)] });

                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);

                steps.push({ type: "updateTable", indices: [flat(i, j)], row: i, col: j, val: dp[i][j] });
            }
        }
    }

    // Traceback to highlight the LCS
    let i = m, j = n;
    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            steps.push({ type: "found", indices: [flat(i, j)] });
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    // Since "found" steps usually clear highlight/swap, we want to accumulate found indices.
    // The visualizer logic for "found" replaces the foundIndices array. 
    // If we want to show the whole path, we should probably output one final "found" step with ALL indices?
    // Or does the visualizer accumulate?
    // Looking at VisualizerContext: setFoundIndices(step.indices). It REPLACES.
    // So we need to collect all path indices and emit ONE found step at the end, OR emit cumulative found steps.
    // Let's emit cumulative found steps for animation effect.

    // Re-calculating full path for animation effect
    i = m; j = n;
    const pathIndices: number[] = [];
    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            pathIndices.push(flat(i, j));
            steps.push({ type: "found", indices: [...pathIndices] }); // Update with all currently found
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return steps;
};
