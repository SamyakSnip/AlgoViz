import { AnimationStep } from "@/types";

export const lis = (array: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const n = array.length;
    if (n === 0) return [];

    // Initialize DP array with 1s
    const dp: number[] = new Array(n).fill(1);

    // Store previous indices to reconstruct the path
    const prevIndex: number[] = new Array(n).fill(-1);

    // Initial visualization of DP array (all 1s)
    for (let i = 0; i < n; i++) {
        steps.push({ type: "updateAux", indices: [i], value: 1 });
    }

    // LIS Algorithm
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            // Visualize comparison
            steps.push({ type: "compare", indices: [i, j] });

            if (array[j] < array[i]) {
                // Potential candidate, check if it increases length
                if (dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    prevIndex[i] = j; // Track path

                    // Visualize update
                    // Highlight the update
                    steps.push({ type: "overwrite", indices: [i] }); // Highlight the changed bar briefly? 
                    // Better: updateAux shows the DP value change.
                    steps.push({ type: "updateAux", indices: [i], value: dp[i] });
                }
            }
        }
    }

    // Find the maximum element in DP array
    let maxLen = 0;
    let maxIdx = 0;
    for (let i = 0; i < n; i++) {
        if (dp[i] > maxLen) {
            maxLen = dp[i];
            maxIdx = i;
        }
    }

    // Reconstruct the path
    const path: number[] = [];
    let curr = maxIdx;
    while (curr !== -1) {
        path.push(curr);
        curr = prevIndex[curr];
    }

    // Path is reversed (end to start), but for highlighting it doesn't matter order-wise, 
    // unless we want to animate from left to right.
    path.reverse();

    // Highlight the LIS
    steps.push({ type: "found", indices: path });

    return steps;
};
