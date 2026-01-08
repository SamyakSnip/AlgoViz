import { AnimationStep, NodeType } from "@/types";

export const astar = (grid: NodeType[][], startNode: NodeType, finishNode: NodeType): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const visitedNodesInOrder: NodeType[] = [];

    // Reset
    for (const row of grid) {
        for (const node of row) {
            node.distance = Infinity;
            node.isVisited = false;
            node.previousNode = null;
            node.status = node.isWall ? "wall" : "unvisited";
        }
    }

    // Initialize
    startNode.distance = 0; // This is 'g' score

    // We need to track 'f' score: f = g + h
    // Since we don't want to modify the global NodeType with 'f', we can use a Map or just calculate it when sorting.
    // For this simple implementation, we'll calculate on the fly or just assume 'distance' implies 'g'.

    const unvisitedNodes = getAllNodes(grid);

    while (unvisitedNodes.length > 0) {
        // Sort by f-score (distance + heuristic)
        sortNodesByFScore(unvisitedNodes, finishNode);

        const closestNode = unvisitedNodes.shift();
        if (!closestNode) break;

        if (closestNode.isWall) continue;

        // If trapped
        if (closestNode.distance === Infinity) break;

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        steps.push({
            type: "visit",
            indices: [closestNode.row, closestNode.col]
        });

        if (closestNode === finishNode) {
            const pathSteps = getNodesInShortestPathOrder(finishNode);
            pathSteps.forEach(node => {
                steps.push({ type: "path", indices: [node.row, node.col] });
            });
            return steps;
        }

        updateUnvisitedNeighbors(closestNode, grid, finishNode);
    }

    return steps;
};

// Heuristic: Manhattan Distance
function manhattanDistance(nodeA: NodeType, nodeB: NodeType): number {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

function sortNodesByFScore(nodes: NodeType[], finishNode: NodeType) {
    nodes.sort((nodeA, nodeB) => {
        // f = g + h
        const fA = nodeA.distance + manhattanDistance(nodeA, finishNode);
        const fB = nodeB.distance + manhattanDistance(nodeB, finishNode);
        return fA - fB;
    });
}

function updateUnvisitedNeighbors(node: NodeType, grid: NodeType[][], finishNode: NodeType) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        const tentativeGScore = node.distance + 1; // Assuming weight 1

        // In strict A*, we update if new path is better.
        // Here, since weights are 1, first time visit is usually best if using BFS, but with heuristic it varies.
        // 'distance' initializes as Infinity.
        if (tentativeGScore < neighbor.distance) {
            neighbor.distance = tentativeGScore;
            neighbor.previousNode = node;
        }
    }
}

// Helpers reused/adapted from Dijkstra (could be shared utils)
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
