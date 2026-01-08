import { AnimationStep } from "@/types";

export const bubbleSort = (array: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const arr = [...array];
    const n = arr.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            // Compare
            steps.push({ type: "compare", indices: [j, j + 1] });

            if (arr[j] > arr[j + 1]) {
                // Swap locally
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
                // Record swap
                steps.push({ type: "swap", indices: [j, j + 1] });
            }
        }
        if (!swapped) break;
    }

    return steps;
};
