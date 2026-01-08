import { AlgorithmType, AnimationStep } from "@/types";

export const generateLog = (step: AnimationStep, algorithm: AlgorithmType): string => {
    const { type, indices, value, val, bucketIndex } = step;

    // Generic fallback for most algos
    switch (type) {
        case "compare":
            return `Comparing elements at indices [${indices.join(", ")}]`;
        case "swap":
            return `Swapping elements at indices [${indices.join(", ")}]`;
        case "overwrite":
            if (value !== undefined) return `Overwriting index ${indices[0]} with value ${value}`;
            return `Overwriting index ${indices[0]}`;
        case "visit":
            return `Visiting node at [${indices.join(", ")}]`;
        case "path":
            return `Marking path at [${indices.join(", ")}]`;
        case "wall":
            return `Encountered wall at [${indices.join(", ")}]`;
        case "found":
            return `Found target at [${indices.join(", ")}]`;
        case "target":
            return `Target set at [${indices.join(", ")}]`;
        case "moveToBucket":
            return `Moving value ${value} to bucket ${bucketIndex}`;
        case "restore":
            return `Restoring value ${value} from bucket to index ${indices[0]}`;
        case "updateTable":
            return `Updating DP table at [${step.row}, ${step.col}] with ${val}`;
        case "updateAux":
            return `Updating auxiliary array index ${indices[0]} with ${value}`;
        default:
            return `Step: ${type}`;
    }
};
