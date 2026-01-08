import { AnimationStep } from "@/types";

export const shellSort = (array: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    // Work on a copy
    const arr = [...array];
    const n = arr.length;

    // Start with a large gap, then reduce the gap
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // Do a gapped insertion sort for this gap size.
        for (let i = gap; i < n; i += 1) {
            // Visualize the current element being considered
            steps.push({ type: "compare", indices: [i] });

            const temp = arr[i];
            let j: number;

            // Shift earlier gap-sorted elements up until the correct location for a[i] is found
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                // Visualize comparison
                steps.push({ type: "compare", indices: [j, j - gap] });

                // Swap/Overwrite visual
                steps.push({ type: "overwrite", indices: [j], value: arr[j - gap] });
                arr[j] = arr[j - gap];
            }

            // Put temp (the original a[i]) in its correct location
            steps.push({ type: "overwrite", indices: [j], value: temp });
            arr[j] = temp;
        }
    }

    return steps;
};
