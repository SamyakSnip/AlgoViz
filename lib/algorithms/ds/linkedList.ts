import { AnimationStep } from "@/types";

export const generateLinkedListSteps = {
    insertHead: (currentArray: number[], value: number): AnimationStep[] => {
        const steps: AnimationStep[] = [];
        const newArray = [value, ...currentArray];

        // Step 1: Highlight current head if exists
        if (currentArray.length > 0) {
            steps.push({
                type: "highlight",
                indices: [0],
            });
        }

        // Step 2: Update array (insert at start)
        steps.push({
            type: "replace",
            newArray: newArray,
            indices: [],
        });

        // Step 3: Highlight new head
        steps.push({
            type: "overwrite",
            indices: [0],
            value: value
        });

        // Step 4: cleanup
        steps.push({
            type: "highlight",
            indices: [],
        });

        return steps;
    },

    insertTail: (currentArray: number[], value: number): AnimationStep[] => {
        const steps: AnimationStep[] = [];
        const newArray = [...currentArray, value];
        const newIndex = newArray.length - 1;

        // Step 1: Highlight current tail
        if (currentArray.length > 0) {
            steps.push({
                type: "highlight",
                indices: [currentArray.length - 1],
            });
        }

        // Step 2: Update array
        steps.push({
            type: "replace",
            newArray: newArray,
            indices: [],
        });

        // Step 3: Highlight new tail
        steps.push({
            type: "overwrite",
            indices: [newIndex],
            value: value
        });

        steps.push({
            type: "highlight",
            indices: [],
        });

        return steps;
    },

    deleteHead: (currentArray: number[]): AnimationStep[] => {
        const steps: AnimationStep[] = [];
        if (currentArray.length === 0) return steps;

        const newArray = currentArray.slice(1);

        // Step 1: Select Head
        steps.push({
            type: "compare",
            indices: [0],
        });

        // Step 2: Remove
        steps.push({
            type: "replace",
            newArray: newArray,
            indices: [],
        });

        return steps;
    },

    deleteTail: (currentArray: number[]): AnimationStep[] => {
        const steps: AnimationStep[] = [];
        if (currentArray.length === 0) return steps;

        const lastIndex = currentArray.length - 1;
        const newArray = currentArray.slice(0, -1);

        // Step 1: Select Tail
        steps.push({
            type: "compare",
            indices: [lastIndex],
        });

        // Step 2: Remove
        steps.push({
            type: "replace",
            newArray: newArray,
            indices: [],
        });

        if (newArray.length > 0) {
            steps.push({
                type: "highlight",
                indices: [newArray.length - 1],
            });
        }

        return steps;
    }
};
