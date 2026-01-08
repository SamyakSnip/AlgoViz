import { AnimationStep, NodeType } from "@/types";

export const jps = (
    grid: NodeType[][],
    startNode: NodeType,
    finishNode: NodeType
): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const openSet: NodeType[] = [];

    // Initialize
    startNode.distance = 0;
    startNode.heuristic = getDistance(startNode, finishNode); // Add Heuristic to NodeType if not present? 
    // Types might need 'heuristic' or 'totalDistance'. We use 'distance' as g, 
    // and maybe we need to store f cost specifically or just compute.
    // Let's assume standard A* structure: distance = g-cost.
    // We need a map or property for 'f-cost'.

    // Helper to get F cost
    const fCost = (node: NodeType) => node.distance + getDistance(node, finishNode);

    openSet.push(startNode);

    // Track visited for visualization vs logic
    // Logic: ClosedSet
    const closedSet = new Set<string>();

    while (openSet.length > 0) {
        // Sort by F cost (Simulate Priority Queue)
        openSet.sort((a, b) => fCost(a) - fCost(b));
        const currentNode = openSet.shift()!;

        const key = `${currentNode.row}-${currentNode.col}`;
        if (closedSet.has(key)) continue;
        closedSet.add(key);

        steps.push({ type: "visit", indices: [currentNode.row, currentNode.col] });

        if (currentNode === finishNode) {
            reconstructPath(currentNode, steps);
            return steps;
        }

        const successors = identifySuccessors(currentNode, startNode, finishNode, grid, steps, closedSet);

        for (const successor of successors) {
            const gScore = currentNode.distance + getDistance(currentNode, successor);

            // If improved or not open (simplified for JPS: usually if we find it, it's good)
            // JPS nodes are sparse, finding one essentially means "add to open".
            // But we must check if we found a shorter path to this jump point.
            if (gScore < successor.distance) {
                successor.distance = gScore;
                successor.previousNode = currentNode;
                if (!openSet.includes(successor)) {
                    openSet.push(successor);
                }
            }
        }
    }

    return steps;
};

// --- JPS Helpers ---

function identifySuccessors(
    current: NodeType,
    start: NodeType,
    end: NodeType,
    grid: NodeType[][],
    steps: AnimationStep[],
    closedSet: Set<string>
): NodeType[] {
    const successors: NodeType[] = [];
    const neighbors = getPrunedNeighbors(current, grid);

    for (const neighbor of neighbors) {
        // Direction from current to neighbor
        const dx = neighbor.col - current.col;
        const dy = neighbor.row - current.row;

        const jumpPoint = jump(current, dx, dy, start, end, grid, steps);
        if (jumpPoint) {
            successors.push(jumpPoint);
        }
    }
    return successors;
}

function jump(
    prev: NodeType,
    dx: number,
    dy: number,
    start: NodeType,
    end: NodeType,
    grid: NodeType[][],
    steps: AnimationStep[]
): NodeType | null {
    const nextRow = prev.row + dy;
    const nextCol = prev.col + dx;

    // Bounds check
    if (nextRow < 0 || nextRow >= grid.length || nextCol < 0 || nextCol >= grid[0].length) {
        return null;
    }

    const node = grid[nextRow][nextCol];

    // Wall check
    if (node.isWall) return null;

    // Visualize the "scan" ray
    // Don't mark as 'visit' (blue/yellow) yet, maybe just 'compare' (transient highlight)
    // to show it's being scanned.
    steps.push({ type: "compare", indices: [node.row, node.col] });

    // Goal found
    if (node === end) return node;

    // Check for forced neighbors
    if (hasForcedNeighbors(node, dx, dy, grid)) {
        return node;
    }

    // Diagonal: Check separate horizontal/vertical rays
    if (dx !== 0 && dy !== 0) {
        if (jump(node, dx, 0, start, end, grid, steps) !== null ||
            jump(node, 0, dy, start, end, grid, steps) !== null) {
            return node;
        }
    }

    // Continue jumping in same direction
    return jump(node, dx, dy, start, end, grid, steps);
}

function hasForcedNeighbors(node: NodeType, dx: number, dy: number, grid: NodeType[][]): boolean {
    const { row, col } = node;
    const rows = grid.length;
    const cols = grid[0].length;

    // Diagonal
    if (dx !== 0 && dy !== 0) {
        // Look for blocked neighbors perpendicular to movement combined with open next-diagonal
        // Simplification: JPS rule says check if logic would cut corners if not for forced neighbor
        // If moving NE (1, -1):
        // Check if West is blocked but NW is open? No, if West is blocked we can't go West anyway.
        // Forced neighbor condition for Diagonal (dx, dy):
        // 1. (row - dy, col) is blocked AND (row - dy, col + dx) is not blocked
        // 2. (row, col - dx) is blocked AND (row + dy, col - dx) is not blocked

        const rSubDy = row - dy; // Previous row/col effectively in that axis
        const cSubDx = col - dx;

        // Check vertical constraint causing forced horz
        if (isValid(row, cSubDx, rows, cols) && grid[row][cSubDx].isWall &&
            isValid(row + dy, cSubDx, rows, cols) && !grid[row + dy][cSubDx].isWall) {
            return true;
        }
        // Check horizontal constraint causing forced vert
        if (isValid(rSubDy, col, rows, cols) && grid[rSubDy][col].isWall &&
            isValid(rSubDy, col + dx, rows, cols) && !grid[rSubDy][col + dx].isWall) {
            return true;
        }
    }
    // Horizontal
    else if (dx !== 0) {
        // Moving Horizontally
        // Check Row-1 (Up) and Row+1 (Down)
        // If Up is blocked and Up-Forward is open
        if (isValid(row - 1, col, rows, cols) && grid[row - 1][col].isWall &&
            isValid(row - 1, col + dx, rows, cols) && !grid[row - 1][col + dx].isWall) {
            return true;
        }
        // If Down is blocked and Down-Forward is open
        if (isValid(row + 1, col, rows, cols) && grid[row + 1][col].isWall &&
            isValid(row + 1, col + dx, rows, cols) && !grid[row + 1][col + dx].isWall) {
            return true;
        }
    }
    // Vertical
    else if (dy !== 0) {
        // Moving Vertically
        // Check Left and Right
        if (isValid(row, col - 1, rows, cols) && grid[row][col - 1].isWall &&
            isValid(row + dy, col - 1, rows, cols) && !grid[row + dy][col - 1].isWall) {
            return true;
        }
        if (isValid(row, col + 1, rows, cols) && grid[row][col + 1].isWall &&
            isValid(row + dy, col + 1, rows, cols) && !grid[row + dy][col + 1].isWall) {
            return true;
        }
    }

    return false;
}

function getPrunedNeighbors(node: NodeType, grid: NodeType[][]): NodeType[] {
    const parent = node.previousNode;
    const neighbors: NodeType[] = [];
    const { row, col } = node;

    // If no parent (Start node), return all valid neighbors
    if (!parent) {
        return getAllNeighbors(node, grid);
    }

    // Direction from parent
    const dx = Math.sign(col - parent.col);
    const dy = Math.sign(row - parent.row);

    // Add natural neighbors based on direction
    if (dx !== 0 && dy !== 0) { // Diagonal
        // Add Next Vertical, Next Horizontal, Next Diagonal
        addIfValid(row + dy, col, grid, neighbors);
        addIfValid(row, col + dx, grid, neighbors);
        addIfValid(row + dy, col + dx, grid, neighbors);

        // Forced neighbors handled by jump logic?
        // Actually, pruning rules for recursion vs iteration differ.
        // For JPS+ (preprocessed) vs Online JPS.
        // Online JPS typically scans in all valid directions.
        // But here we need to return *directions to scan*?
        // Wait, 'identifySuccessors' calls 'jump' in directions.
        // So we need to provide the directions to jump.

        // Correct JPS Pruning for successors:
        // We only jump in specific directions.
        // BUT, also need to check for forced neighbors which open NEW directions.

        // To simplify implementation logic:
        // Checking for forced neighbors at `node` is what opens up the "non-natural" directions.
        // But `hasForcedNeighbors` is checked during the jump *arrival* at `node`.
        // So `node` (as a jump point) is effectively a turning point.

        // So from a jump point, we can go in natural directions AND forced directions.

        // Diagonal Natural:
        // (dy, 0), (0, dx), (dy, dx)

        // Forced:
        // If (row-dy, col) blocked -> add (-dy, dx)? No.
        // Look logic from `hasForcedNeighbors`:
        // If "West" blocked, we might need to go "NorthWest".

        // Let's rely on `getAllNeighbors` but filter them?
        // Or closer stick to the definition.

        // Re-adding forced neighbors explicitly:
        if (grid[row - dy][col].isWall) addIfValid(row - dy, col + dx, grid, neighbors);
        if (grid[row][col - dx].isWall) addIfValid(row + dy, col - dx, grid, neighbors);
    } else if (dx !== 0) { // Horizontal
        // Natural
        addIfValid(row, col + dx, grid, neighbors);
        // Forced
        if (isValid(row - 1, col, grid.length, grid[0].length) && grid[row - 1][col].isWall)
            addIfValid(row - 1, col + dx, grid, neighbors);
        if (isValid(row + 1, col, grid.length, grid[0].length) && grid[row + 1][col].isWall)
            addIfValid(row + 1, col + dx, grid, neighbors);
    } else if (dy !== 0) { // Vertical
        // Natural
        addIfValid(row + dy, col, grid, neighbors);
        // Forced
        if (isValid(row, col - 1, grid.length, grid[0].length) && grid[row][col - 1].isWall)
            addIfValid(row + dy, col - 1, grid, neighbors);
        if (isValid(row, col + 1, grid.length, grid[0].length) && grid[row][col + 1].isWall)
            addIfValid(row + dy, col + 1, grid, neighbors);
    }

    return neighbors;
}

function getAllNeighbors(node: NodeType, grid: NodeType[][]) {
    const neighbors: NodeType[] = [];
    const { row, col } = node;
    // 8-way movement for JPS
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            addIfValid(row + dy, col + dx, grid, neighbors);
        }
    }
    return neighbors;
}

function addIfValid(row: number, col: number, grid: NodeType[][], list: NodeType[]) {
    if (isValid(row, col, grid.length, grid[0].length) && !grid[row][col].isWall) {
        list.push(grid[row][col]);
    }
}

function isValid(row: number, col: number, rows: number, cols: number) {
    return row >= 0 && row < rows && col >= 0 && col < cols;
}

function getDistance(a: NodeType, b: NodeType) {
    // Octile distance for 8-way
    const dx = Math.abs(a.col - b.col);
    const dy = Math.abs(a.row - b.row);
    // 1 * (max - min) + sqrt(2) * min
    // Cost 1 for straights, 1.414 for diagonals
    const F = Math.SQRT2 - 1;
    return (dx < dy ? F * dx + dy : F * dy + dx);
}

function reconstructPath(finishNode: NodeType, steps: AnimationStep[]) {
    let currentNode: NodeType | null = finishNode;
    // JPS path reconstruction is tricky because parents are jump points (far away)
    // We need to fill in the gaps.

    // We will just draw lines between jump points effectively, 
    // or we can interpolate indices for the visual.
    // Let's interpolate for smooth visual path.
    const pathNodes: NodeType[] = [];
    while (currentNode) {
        pathNodes.unshift(currentNode); // Prepend
        currentNode = currentNode.previousNode;
    }

    for (let i = 0; i < pathNodes.length - 1; i++) {
        const from = pathNodes[i];
        const to = pathNodes[i + 1];

        // Bresenham or simple line walk
        let r = from.row;
        let c = from.col;
        const dr = Math.sign(to.row - from.row);
        const dc = Math.sign(to.col - from.col);

        while (r !== to.row || c !== to.col) {
            steps.push({ type: "path", indices: [r, c] });
            r += dr;
            c += dc;
        }
    }
    // Add final node
    if (pathNodes.length > 0) {
        const last = pathNodes[pathNodes.length - 1];
        steps.push({ type: "path", indices: [last.row, last.col] });
    }
}
