import { AnimationStep } from "@/types";

export const generateQueueSteps = {
    enqueue: (currentArray: number[], value: number): AnimationStep[] => {
        const steps: AnimationStep[] = [];
        const newArray = [...currentArray, value];
        const newIndex = newArray.length - 1;

        // Step 1: Highlight the "back" of the queue
        if (currentArray.length > 0) {
            steps.push({
                type: "highlight",
                indices: [currentArray.length - 1],
            });
        }

        // Step 2: Add new element
        steps.push({
            type: "replace",
            newArray: newArray,
            indices: [],
        });

        // Step 3: Highlight the new element
        steps.push({
            type: "overwrite",
            indices: [newIndex],
            value: value
        });

        // Step 4: cleanup
        steps.push({
            type: "highlight",
            indices: [],
        });

        return steps;
    },

    dequeue: (currentArray: number[]): AnimationStep[] => {
        const steps: AnimationStep[] = [];
        if (currentArray.length === 0) return steps;

        const newArray = currentArray.slice(1);

        // Step 1: Highlight the "front" element (index 0) to be removed
        steps.push({
            type: "compare", // Red/Highlighted
            indices: [0],
        });

        // Step 2: Remove it (shift array)
        steps.push({
            type: "replace",
            newArray: newArray,
            indices: [],
        });

        // Step 3: Highlight the new front
        if (newArray.length > 0) {
            steps.push({
                type: "highlight",
                indices: [0],
            });
        }

        return steps;
    }
};
