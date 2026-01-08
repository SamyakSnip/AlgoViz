import { HeapNode } from "@/types";

const CANVAS_WIDTH = 1000;
const INITIAL_Y = 50;
const LEVEL_HEIGHT = 80;

export const recalculateHeapLayout = (heap: number[]): HeapNode[] => {
    if (heap.length === 0) return [];

    const nodes: HeapNode[] = [];

    const updateNode = (index: number, x: number, y: number, offset: number) => {
        if (index >= heap.length) return;

        nodes.push({
            id: `heap-${index}`,
            value: heap[index],
            index,
            x,
            y
        });

        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;

        if (leftChild < heap.length) {
            updateNode(leftChild, x - offset, y + LEVEL_HEIGHT, offset / 2);
        }
        if (rightChild < heap.length) {
            updateNode(rightChild, x + offset, y + LEVEL_HEIGHT, offset / 2);
        }
    };

    updateNode(0, CANVAS_WIDTH / 2, INITIAL_Y, CANVAS_WIDTH / 4);
    return nodes;
};

export const insertHeap = (heap: number[], value: number, isMaxHeap: boolean): number[] => {
    const newHeap = [...heap, value];
    bubbleUp(newHeap, newHeap.length - 1, isMaxHeap);
    return newHeap;
};

export const extractHeap = (heap: number[], isMaxHeap: boolean): number[] => {
    if (heap.length === 0) return heap;
    if (heap.length === 1) return [];

    const newHeap = [...heap];
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();

    if (newHeap.length > 0) {
        bubbleDown(newHeap, 0, isMaxHeap);
    }

    return newHeap;
};

export const buildHeap = (array: number[], isMaxHeap: boolean): number[] => {
    const heap = [...array];

    // Start from last non-leaf node and heapify down
    for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
        bubbleDown(heap, i, isMaxHeap);
    }

    return heap;
};

function bubbleUp(heap: number[], index: number, isMaxHeap: boolean) {
    while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);

        const shouldSwap = isMaxHeap
            ? heap[index] > heap[parentIndex]
            : heap[index] < heap[parentIndex];

        if (shouldSwap) {
            [heap[index], heap[parentIndex]] = [heap[parentIndex], heap[index]];
            index = parentIndex;
        } else {
            break;
        }
    }
}

function bubbleDown(heap: number[], index: number, isMaxHeap: boolean) {
    const length = heap.length;

    while (true) {
        let targetIndex = index;
        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;

        if (leftChild < length) {
            const shouldSwapLeft = isMaxHeap
                ? heap[leftChild] > heap[targetIndex]
                : heap[leftChild] < heap[targetIndex];

            if (shouldSwapLeft) {
                targetIndex = leftChild;
            }
        }

        if (rightChild < length) {
            const shouldSwapRight = isMaxHeap
                ? heap[rightChild] > heap[targetIndex]
                : heap[rightChild] < heap[targetIndex];

            if (shouldSwapRight) {
                targetIndex = rightChild;
            }
        }

        if (targetIndex !== index) {
            [heap[index], heap[targetIndex]] = [heap[targetIndex], heap[index]];
            index = targetIndex;
        } else {
            break;
        }
    }
}
