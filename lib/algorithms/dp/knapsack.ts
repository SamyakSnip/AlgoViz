import { AnimationStep } from "@/types";

export interface DBTableSetup {
    table: (number | string | null)[][];
    labels: { row: string[]; col: string[] };
    problemStatement?: string;
}

// Sample Data
const items = [
    { name: "Item 1", w: 1, v: 4 },
    { name: "Item 2", w: 3, v: 9 },
    { name: "Item 3", w: 4, v: 10 },
];
const capacity = 6;

// Function to get initial table setup (called by generateArray probably? or separate)
export const getKnapsackSetup = (): DBTableSetup => {
    const rowLabels = ["-", ...items.map(i => `${i.name} (w:${i.w}, v:${i.v})`)];
    const colLabels = Array.from({ length: capacity + 1 }, (_, i) => `C${i}`); // Shortened to C0, C1.. for space

    // Init table with 0s for first row/col, null otherwise
    const table = Array.from({ length: items.length + 1 }, (_, r) =>
        Array.from({ length: capacity + 1 }, (_, c) => (r === 0 || c === 0 ? 0 : null))
    );

    const problemStatement = `Problem: Maximize Value (Capacity: ${capacity})\n` +
        items.map(i => `• ${i.name}: W=${i.w}, V=${i.v}`).join("\n");

    return { table, labels: { row: rowLabels, col: colLabels }, problemStatement };
};

export const knapsack = (): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    // We simulate the DP calculation
    const n = items.length;
    const dp: number[][] = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

    // Fill steps
    for (let i = 1; i <= n; i++) {
        const item = items[i - 1]; // 0-indexed items
        for (let w = 1; w <= capacity; w++) {
            // Highlight current cell
            steps.push({ type: "compare", indices: [i, w] }); // Highlight [Row, Col]

            // Check if we can include item
            if (item.w <= w) {
                // Compare options:
                // 1. Exclude item: dp[i-1][w]
                // 2. Include item: item.v + dp[i-1][w-item.w]

                // Visualize comparing: Highlight dependencies
                steps.push({ type: "target", indices: [i - 1, w] }); // Exclude option
                steps.push({ type: "target", indices: [i - 1, w - item.w] }); // Include base option

                const valExclude = dp[i - 1][w];
                const valInclude = item.v + dp[i - 1][w - item.w];

                const maxVal = Math.max(valExclude, valInclude);
                dp[i][w] = maxVal;

                steps.push({ type: "updateTable", indices: [i, w], row: i, col: w, val: maxVal });
            } else {
                // Cannot include
                steps.push({ type: "target", indices: [i - 1, w] });
                dp[i][w] = dp[i - 1][w];
                steps.push({ type: "updateTable", indices: [i, w], row: i, col: w, val: dp[i][w] });
            }
        }
    }

    // Traceback
    let w = capacity;
    for (let i = n; i > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            // Item included
            steps.push({ type: "found", indices: [i, w] }); // Mark path Green
            w -= items[i - 1].w;
        } else {
            // Not included
        }
    }

    return steps;
};
