import { AnimationStep } from "@/types";

export const countingSort = (array: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const arr = [...array];

    // Find max value to determine size of count array
    // Our array values are 1-100 usually (from generateArray).
    const maxVal = Math.max(...arr);
    const countArr = Array(maxVal + 1).fill(0);

    // Initialize Aux in Context (visual reset)
    // We iterate to set them to 0 visually first? 
    // Or just sending first update will trigger render.
    // Let's send 0 updates to initialize the visual array size effectively if we want to show the full range.
    // For visualization, maybe showing all 0-100 is too wide?
    // Let's just show indices that we touch? No, counting sort implies fixed range.
    // If maxVal is 100, 100 bars is fit-able.

    // Step 0: Initialize Count Array Visual
    for (let i = 0; i <= maxVal; i++) {
        steps.push({ type: "updateAux", indices: [i], value: 0 });
    }

    // Step 1: Count Frequencies
    for (let i = 0; i < arr.length; i++) {
        const val = arr[i];
        steps.push({ type: "compare", indices: [i] }); // Highlight current element

        countArr[val]++;
        steps.push({ type: "updateAux", indices: [val], value: countArr[val] });

        // Maybe highlight the aux bin?
        // Current 'updateAux' just sets value. 
        // We could add 'highlightAux'?
    }

    // Step 2: Accumulate Counts (Optional for simple visualization, but key for stability)
    // For simple visualization, we can just reconstruct the array from counts.
    // Standard Counting Sort (Stable) uses accumulation.
    // Let's do the simple reconstruction version first for clear visuals.

    let arrayIndex = 0;
    for (let i = 0; i < countArr.length; i++) {
        while (countArr[i] > 0) {
            // Visual: Decrement count
            steps.push({ type: "target", indices: [i] }); // Highlight the count bucket (conceptually - we don't have aux indices in target yet)
            // Actually targetIndices assumes main array currently in Canvas.
            // Let's just update aux value.

            steps.push({ type: "overwrite", indices: [arrayIndex], value: i });

            countArr[i]--;
            steps.push({ type: "updateAux", indices: [i], value: countArr[i] });

            arrayIndex++;
        }
    }

    return steps;
};
