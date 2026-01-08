import { AnimationStep } from "@/types";

export const insertionSort = (array: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        let j = i;
        // Compare
        steps.push({ type: "compare", indices: [j, j - 1] });

        while (j > 0 && arr[j] < arr[j - 1]) {
            // Swap
            steps.push({ type: "swap", indices: [j, j - 1] });
            const temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;

            j--;
            if (j > 0) {
                steps.push({ type: "compare", indices: [j, j - 1] });
            }
        }
    }

    return steps;
};
