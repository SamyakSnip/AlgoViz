import { AnimationStep, NodeType } from "@/types";

export const dijkstra = (grid: NodeType[][], startNode: NodeType, finishNode: NodeType): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const visitedNodesInOrder: NodeType[] = [];

    // Flatten grid to list of unvisited nodes
    // In a real optimized version we would use a Priority Queue (Min Heap)
    // For visualization on this scale, sorting an array is acceptable but slow for large grids.
    // Let's use a simple array handling for now.

    // Reset grid state
    for (const row of grid) {
        for (const node of row) {
            node.distance = Infinity;
            node.isVisited = false;
            node.previousNode = null;
            node.status = node.isWall ? "wall" : "unvisited";
        }
    }

    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);

    while (unvisitedNodes.length > 0) {
        // Sort by distance (simulating priority queue)
        sortNodesByDistance(unvisitedNodes);

        // Shift closest node
        const closestNode = unvisitedNodes.shift();
        if (!closestNode) break; // Should not happen

        // If wall, skip
        if (closestNode.isWall) continue;

        // If trapped (distance infinity), stop
        if (closestNode.distance === Infinity) break;

        visitedNodesInOrder.push(closestNode);
        steps.push({
            type: "visit",
            indices: [closestNode.row, closestNode.col]
        });

        if (closestNode === finishNode) {
            // Construct path
            const pathSteps = getNodesInShortestPathOrder(finishNode);
            pathSteps.forEach(node => {
                steps.push({ type: "path", indices: [node.row, node.col] });
            });
            return steps;
        }

        updateUnvisitedNeighbors(closestNode, grid);
    }

    return steps;
};

function sortNodesByDistance(unvisitedNodes: NodeType[]) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node: NodeType, grid: NodeType[][]) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getUnvisitedNeighbors(node: NodeType, grid: NodeType[][]) {
    const neighbors: NodeType[] = [];
    const { col, row } = node;

    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid: NodeType[][]) {
    const nodes: NodeType[] = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

function getNodesInShortestPathOrder(finishNode: NodeType) {
    const nodesInShortestPathOrder = [];
    let currentNode: NodeType | null = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
