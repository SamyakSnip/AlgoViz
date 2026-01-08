import { AnimationStep } from "@/types";

export const selectionSort = (array: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            steps.push({ type: "compare", indices: [minIdx, j] });
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            // Swap
            steps.push({ type: "swap", indices: [i, minIdx] });
            const temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }

    return steps;
};
