import { AnimationStep } from "@/types";

export const generateStackSteps = {
    push: (currentArray: number[], value: number): AnimationStep[] => {
        const steps: AnimationStep[] = [];
        const newArray = [...currentArray, value];
        const newIndex = newArray.length - 1;

        // Step 1: Highlight where the new value will go (conceptually) or just pause
        // Since it's a new index, we can't highlight it on the OLD array easily if it doesn't exist.
        // So we just highlight the 'top' of the old array to show activity.
        if (currentArray.length > 0) {
            steps.push({
                type: "highlight",
                indices: [currentArray.length - 1],
            });
        }

        // Step 2: Update the array structure
        steps.push({
            type: "replace",
            newArray: newArray,
            indices: [], // No specific indices needed for replace
        });

        // Step 3: Highlight the newly added value (green/color)
        steps.push({
            type: "overwrite", // "overwrite" usually highlights in a specific color in the visualizer
            indices: [newIndex],
            value: value
        });

        // Step 4: Clear highlights
        steps.push({
            type: "highlight",
            indices: [],
        });

        return steps;
    },

    pop: (currentArray: number[]): AnimationStep[] => {
        const steps: AnimationStep[] = [];
        if (currentArray.length === 0) return steps;

        const lastIndex = currentArray.length - 1;
        const newArray = currentArray.slice(0, -1);

        // Step 1: Highlight the element to be removed (simulate "selecting" it)
        steps.push({
            type: "compare", // Usually red/yellow
            indices: [lastIndex],
        });

        // Step 2: Remove it (update array)
        steps.push({
            type: "replace",
            newArray: newArray,
            indices: [],
        });

        // Step 3: Highlight new top if exists
        if (newArray.length > 0) {
            steps.push({
                type: "highlight",
                indices: [newArray.length - 1],
            });
        }

        return steps;
    }
};
