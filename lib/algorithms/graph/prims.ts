import { AnimationStep, NodeType } from "@/types";

export const prims = (
    grid: NodeType[][],
    startNode: NodeType,
    finishNode: NodeType
): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const rows = grid.length;
    const cols = grid[0].length;

    // Reset grid state conceptually for the algo
    // We treat 'isWall' as 'not in tree yet' or 'unvisited'
    // Actually for MST on a grid, usually we start with a grid of walls and carve paths (Maze Gen)
    // OR we start with empty grid and just highlight the edges.
    // Let's go with the "Connector" approach: The grid nodes are the graph vertices.
    // We want to highlight the edges that form the MST.

    const visited = new Set<string>();
    const frontier: NodeType[] = [];

    // Helper to add to visited
    const addToTree = (node: NodeType) => {
        visited.add(`${node.row}-${node.col}`);
        steps.push({ type: "visit", indices: [node.row, node.col] }); // Mark as part of tree (Blue/Yellow?)
        // actually 'visit' usually means 'scanned'. 
        // We might want a 'found' type or just stick to 'visit'.

        const neighbors = getNeighbors(node, grid);
        for (const n of neighbors) {
            if (!visited.has(`${n.row}-${n.col}`) && !frontier.includes(n)) {
                frontier.push(n);
                // Mark frontier? using 'compare'
                steps.push({ type: "compare", indices: [n.row, n.col] });
            }
        }
    };

    addToTree(startNode);

    while (frontier.length > 0) {
        // Randomized Prim's: Pick random node from frontier
        const randIdx = Math.floor(Math.random() * frontier.length);
        const neighbor = frontier[randIdx];

        // Remove from frontier
        frontier.splice(randIdx, 1);

        if (visited.has(`${neighbor.row}-${neighbor.col}`)) continue;

        // Find a connection to the existing tree
        // We need to find a neighbor of 'neighbor' that IS in the tree
        const neighborsOfNeighbor = getNeighbors(neighbor, grid);
        const treeConnectors = neighborsOfNeighbor.filter(n => visited.has(`${n.row}-${n.col}`));

        if (treeConnectors.length > 0) {
            // Pick random connector
            const connector = treeConnectors[Math.floor(Math.random() * treeConnectors.length)];

            // Logically connect (maybe draw a path step between them?)
            // Since we visualize nodes, we can just mark this node as visited.
            // If we want to show lines... that's harder with just node colors.
            // But we can set 'previousNode' to trace back if needed.
            neighbor.previousNode = connector;

            addToTree(neighbor);

            // To visualize the "Edge", maybe we visit the node?
            // With 'path' type, it turns yellow/green.
            steps.push({ type: "path", indices: [neighbor.row, neighbor.col] });
        }
    }

    // Clean up visualization: Turn everything to a distinct color?
    // The "Path" steps above might look like a growing snake.
    return steps;
};

function getNeighbors(node: NodeType, grid: NodeType[][]) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
}
