import { AnimationStep, NodeType } from "@/types";

export const bfs = (grid: NodeType[][], startNode: NodeType, finishNode: NodeType): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    // Reset
    for (const row of grid) {
        for (const node of row) {
            node.distance = Infinity;
            node.isVisited = false;
            node.previousNode = null;
            node.status = node.isWall ? "wall" : "unvisited";
        }
    }

    const queue: NodeType[] = [startNode];
    startNode.isVisited = true;
    startNode.distance = 0;

    while (queue.length > 0) {
        const currentNode = queue.shift()!;

        // Visit animation
        steps.push({
            type: "visit",
            indices: [currentNode.row, currentNode.col]
        });

        if (currentNode === finishNode) {
            // Trace back path
            let curr: NodeType | null = finishNode;
            const pathNodes: NodeType[] = [];
            while (curr) {
                pathNodes.unshift(curr);
                curr = curr.previousNode;
            }
            pathNodes.forEach(node => {
                steps.push({ type: "path", indices: [node.row, node.col] });
            });
            return steps;
        }

        const neighbors = getNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited && !neighbor.isWall) {
                neighbor.isVisited = true;
                neighbor.previousNode = currentNode;
                neighbor.distance = currentNode.distance + 1;
                queue.push(neighbor);
            }
        }
    }

    return steps;
};

function getNeighbors(node: NodeType, grid: NodeType[][]) {
    const neighbors: NodeType[] = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
}
