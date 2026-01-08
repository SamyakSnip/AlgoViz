import { AnimationStep, NodeType } from "@/types";

export const dfs = (grid: NodeType[][], startNode: NodeType, finishNode: NodeType): AnimationStep[] => {
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

    const stack: NodeType[] = [startNode];

    // DFS can visit nodes multiple times if we aren't careful, 
    // but typically we track visited.
    // Note: DFS doesn't guarantee shortest path.

    // To avoid immediate rescanning in this iterative version if we push neighbors, 
    // we might check visited upon popping or pushing. Standard is checking on popping or pushing.
    // Pushing check is faster for visualization to not fill stack with duplicates.

    while (stack.length > 0) {
        const currentNode = stack.pop()!;

        if (currentNode.isVisited) continue;

        currentNode.isVisited = true;
        steps.push({
            type: "visit",
            indices: [currentNode.row, currentNode.col]
        });

        if (currentNode === finishNode) {
            // Trace back path (note: this path acts weird in DFS but it's "a" path)
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
                neighbor.previousNode = currentNode;
                stack.push(neighbor);
            }
        }
    }

    return steps;
};

function getNeighbors(node: NodeType, grid: NodeType[][]) {
    const neighbors: NodeType[] = [];
    const { col, row } = node;
    // Order affects DFS shape. 
    if (row > 0) neighbors.push(grid[row - 1][col]); // Up
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
    if (col > 0) neighbors.push(grid[row][col - 1]); // Left
    return neighbors;
}
