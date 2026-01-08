import { AnimationStep } from "@/types";

export const binarySearch = (array: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];

    // Sort array copy
    const sortedArray = [...array].sort((a, b) => a - b);

    // Step 1: Instantly replace the array with the sorted one
    steps.push({ type: "replace", indices: [], newArray: sortedArray });

    // Step 2: Pick a target from the sorted array
    const targetIndex = Math.floor(Math.random() * sortedArray.length);
    const target = sortedArray[targetIndex];

    // Step 3: Highlight the target (Visual cheat/hint for the user)
    // We highlight the index where the target IS in the sorted array
    steps.push({ type: "target", indices: [targetIndex] });

    let left = 0;
    let right = sortedArray.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        steps.push({ type: "compare", indices: [mid] });

        if (sortedArray[mid] === target) {
            steps.push({ type: "found", indices: [mid] });
            return steps;
        }

        if (sortedArray[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return steps;
};
