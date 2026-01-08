import { AnimationStep } from "@/types";

export const radixSort = (array: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    let arr = [...array];

    // Find max to determine number of digits
    const maxVal = Math.max(...arr);
    const maxDigits = maxVal === 0 ? 1 : Math.floor(Math.log10(maxVal)) + 1;

    for (let digit = 0; digit < maxDigits; digit++) {
        const placeVal = Math.pow(10, digit);
        const buckets: number[][] = Array.from({ length: 10 }, () => []);

        // Distribution Pass
        for (let i = 0; i < arr.length; i++) {
            const val = arr[i];
            const digitVal = Math.floor(val / placeVal) % 10;

            // Visual: Highlight item being processed
            steps.push({ type: "compare", indices: [i] });

            // Visual: Move to bucket
            steps.push({ type: "moveToBucket", indices: [i], value: val, bucketIndex: digitVal });
            buckets[digitVal].push(val);
        }

        // Collection Pass
        let idx = 0;
        for (let b = 0; b < 10; b++) {
            while (buckets[b].length > 0) {
                const val = buckets[b].shift()!;
                arr[idx] = val;

                // Visual: Restore from bucket to array
                // We specify bucketIndex so Context knows which bucket to pop from visually
                steps.push({ type: "restore", indices: [idx], value: val, bucketIndex: b });
                idx++;
            }
        }
    }

    return steps;
};
