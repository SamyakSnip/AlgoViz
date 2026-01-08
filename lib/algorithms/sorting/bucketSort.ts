import { AnimationStep } from "@/types";

export const bucketSort = (array: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    let arr = [...array];
    const n = arr.length;
    if (n <= 1) return steps;

    // 1. Create Buckets
    // We'll use 10 buckets for visualization (matching our UI)
    const bucketCount = 10;
    const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

    // Find max value to normalize
    const maxVal = Math.max(...arr, 1); // Avoid div by 0

    // 2. Scatter: Move elements to buckets
    for (let i = 0; i < n; i++) {
        const val = arr[i];
        // Normalize value to 0-(bucketCount-1)
        // e.g. val 50, max 100 -> 0.5 * 10 = 5
        let bIdx = Math.floor((val / (maxVal + 1)) * bucketCount);

        // Visual: Compare/Highlight
        steps.push({ type: "compare", indices: [i] });

        // Visual: Move to Bucket
        steps.push({ type: "moveToBucket", indices: [i], value: val, bucketIndex: bIdx });

        buckets[bIdx].push(val);
    }

    // 3. Gather: Restore from buckets to main array
    let currentIndex = 0;
    for (let b = 0; b < bucketCount; b++) {
        while (buckets[b].length > 0) {
            const val = buckets[b].shift()!;
            arr[currentIndex] = val;

            // Visual: Restore
            steps.push({ type: "restore", indices: [currentIndex], value: val, bucketIndex: b });
            currentIndex++;
        }
    }

    // 4. Sort: Run Insertion Sort on the whole array to ensure it's fully sorted
    // (Since buckets might not be perfectly sorted internally if ranges are wide)
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        steps.push({ type: "highlight", indices: [i] }); // Key we are inserting

        while (j >= 0 && arr[j] > key) {
            steps.push({ type: "compare", indices: [j, i] });
            arr[j + 1] = arr[j];
            steps.push({ type: "overwrite", indices: [j + 1], value: arr[j] });
            j--;
        }
        arr[j + 1] = key;
        steps.push({ type: "overwrite", indices: [j + 1], value: key });
    }

    return steps;
};
