import { AnimationStep, NodeType } from "@/types";

export const greedyBFS = (
    grid: NodeType[][],
    startNode: NodeType,
    finishNode: NodeType
): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const visitedNodesInOrder: NodeType[] = [];

    // Priority Queue substitute (simple array sort for demo)
    // For Greedy BFS, priority is just the heuristic (distance to finish)
    const openSet: NodeType[] = [];

    startNode.distance = 0;
    // We'll use 'distance' field as 'h-cost' effectively for sorting, 
    // or just calculate h on the fly. Let's use h only.

    // Helper for Heuristic (Manhattan)
    const getHeuristic = (node: NodeType) => {
        return Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col);
    };

    openSet.push(startNode);

    while (openSet.length > 0) {
        // Sort by heuristic (closest to goal)
        openSet.sort((a, b) => getHeuristic(a) - getHeuristic(b));
        const closestNode = openSet.shift()!;

        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) return steps; // Trapped

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        steps.push({ type: "visit", indices: [closestNode.row, closestNode.col] });

        if (closestNode === finishNode) {
            // Backtrack path
            let currentNode: NodeType | null = finishNode;
            while (currentNode !== null) {
                steps.push({ type: "path", indices: [currentNode.row, currentNode.col] });
                currentNode = currentNode.previousNode;
            }
            return steps;
        }

        const updateUnvisitedNeighbors = (node: NodeType) => {
            const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
            for (const neighbor of unvisitedNeighbors) {
                neighbor.isVisited = true; // Mark as visited immediately to avoid re-adding
                neighbor.previousNode = node;
                neighbor.distance = getHeuristic(neighbor); // Store h-cost for reference if needed
                openSet.push(neighbor);
            }
        };

        updateUnvisitedNeighbors(closestNode);
    }

    return steps;
};

function getUnvisitedNeighbors(node: NodeType, grid: NodeType[][]) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
}
