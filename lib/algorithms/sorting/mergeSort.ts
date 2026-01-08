import { AnimationStep } from "@/types";

export const mergeSort = (array: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const arr = [...array];
    const aux = [...array];

    mergeSortHelper(arr, aux, 0, arr.length - 1, steps);

    return steps;
};

const mergeSortHelper = (
    mainArray: number[],
    auxArray: number[],
    startIdx: number,
    endIdx: number,
    steps: AnimationStep[]
) => {
    if (startIdx === endIdx) return;

    const midIdx = Math.floor((startIdx + endIdx) / 2);

    mergeSortHelper(auxArray, mainArray, startIdx, midIdx, steps);
    mergeSortHelper(auxArray, mainArray, midIdx + 1, endIdx, steps);

    doMerge(mainArray, auxArray, startIdx, midIdx, endIdx, steps);
};

const doMerge = (
    mainArray: number[],
    auxArray: number[],
    startIdx: number,
    midIdx: number,
    endIdx: number,
    steps: AnimationStep[]
) => {
    let k = startIdx;
    let i = startIdx;
    let j = midIdx + 1;

    while (i <= midIdx && j <= endIdx) {
        // Compare
        steps.push({ type: "compare", indices: [i, j] });

        if (auxArray[i] <= auxArray[j]) {
            // Overwrite value at k with value from aux[i]
            steps.push({ type: "overwrite", indices: [k], value: auxArray[i] });
            mainArray[k++] = auxArray[i++];
        } else {
            // Overwrite value at k with value from aux[j]
            steps.push({ type: "overwrite", indices: [k], value: auxArray[j] });
            mainArray[k++] = auxArray[j++];
        }
    }

    while (i <= midIdx) {
        steps.push({ type: "compare", indices: [i, i] });
        steps.push({ type: "overwrite", indices: [k], value: auxArray[i] });
        mainArray[k++] = auxArray[i++];
    }

    while (j <= endIdx) {
        steps.push({ type: "compare", indices: [j, j] });
        steps.push({ type: "overwrite", indices: [k], value: auxArray[j] });
        mainArray[k++] = auxArray[j++];
    }
};
