import { AnimationStep } from "@/types";

export const quickSort = (array: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const arr = [...array];

    quickSortHelper(arr, 0, arr.length - 1, steps);

    return steps;
};

const quickSortHelper = (
    arr: number[],
    startIdx: number,
    endIdx: number,
    steps: AnimationStep[]
) => {
    if (startIdx >= endIdx) return;

    const pivotIdx = partition(arr, startIdx, endIdx, steps);

    quickSortHelper(arr, startIdx, pivotIdx - 1, steps);
    quickSortHelper(arr, pivotIdx + 1, endIdx, steps);
};

const partition = (
    arr: number[],
    startIdx: number,
    endIdx: number,
    steps: AnimationStep[]
): number => {
    // Choosing last element as pivot
    const pivotValue = arr[endIdx];
    let i = startIdx - 1;

    // Highlight pivot
    steps.push({ type: "compare", indices: [endIdx] });

    for (let j = startIdx; j < endIdx; j++) {
        // Compare current element with pivot
        steps.push({ type: "compare", indices: [j, endIdx] });

        if (arr[j] <= pivotValue) {
            i++;
            // Swap
            steps.push({ type: "swap", indices: [i, j] });
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    // Move pivot to correct position
    steps.push({ type: "swap", indices: [i + 1, endIdx] });
    const temp = arr[i + 1];
    arr[i + 1] = arr[endIdx];
    arr[endIdx] = temp;

    return i + 1;
};
