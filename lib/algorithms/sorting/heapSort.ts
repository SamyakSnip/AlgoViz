import { AnimationStep } from "@/types";

export const heapSort = (array: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const arr = [...array];
    const n = arr.length;

    const swap = (i: number, j: number) => {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({ type: "swap", indices: [i, j] });
    };

    const heapify = (n: number, i: number) => {
        let largest = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;

        if (l < n) {
            steps.push({ type: "compare", indices: [largest, l] });
            if (arr[l] > arr[largest]) {
                largest = l;
            }
        }

        if (r < n) {
            steps.push({ type: "compare", indices: [largest, r] });
            if (arr[r] > arr[largest]) {
                largest = r;
            }
        }

        if (largest !== i) {
            swap(i, largest);
            heapify(n, largest);
        }
    };

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
    }

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        swap(0, i);

        // call max heapify on the reduced heap
        heapify(i, 0);
    }

    return steps;
};
