import { AnimationStep } from "@/types";

export const linearSearch = (array: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];

    // Pick random target
    const targetIndex = Math.floor(Math.random() * array.length);
    const target = array[targetIndex];

    // Step 1: Highlight the target (Visual hint)
    steps.push({ type: "target", indices: [targetIndex] });

    for (let i = 0; i < array.length; i++) {
        steps.push({ type: "compare", indices: [i] }); // Highlight current check

        if (array[i] === target) {
            steps.push({ type: "found", indices: [i] });
            return steps;
        }
    }

    return steps;
};
