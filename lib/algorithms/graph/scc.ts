import { AnimationStep, GraphNode, GraphEdge } from "@/types";

export const generateRandomGraph = (nodeCount: number = 8): { nodes: GraphNode[], edges: GraphEdge[] } => {
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];

    const centerX = 400; // Half of 800 roughly
    const centerY = 250;
    const radius = 200;

    for (let i = 0; i < nodeCount; i++) {
        const angle = (2 * Math.PI * i) / nodeCount;
        nodes.push({
            id: i.toString(),
            value: i,
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
        });
    }

    // Random edges
    for (let i = 0; i < nodeCount; i++) {
        // Ensure at least one outgoing or incoming to keep things interesting? 
        // Just random connections.
        const targetCount = 1 + Math.floor(Math.random() * 2);
        for (let j = 0; j < targetCount; j++) {
            const target = Math.floor(Math.random() * nodeCount);
            if (i !== target) {
                // Avoid duplicates
                if (!edges.some(e => e.source === i.toString() && e.target === target.toString())) {
                    edges.push({ source: i.toString(), target: target.toString() });
                }
            }
        }
    }

    return { nodes, edges };
};

export const scc = (nodes: GraphNode[], edges: GraphEdge[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const n = nodes.length;
    const adj: number[][] = Array.from({ length: n }, () => []);

    // Build adj list using indices
    edges.forEach(e => {
        const u = parseInt(e.source);
        const v = parseInt(e.target);
        if (!isNaN(u) && !isNaN(v)) {
            adj[u].push(v);
        }
    });

    let ids = new Array(n).fill(-1);
    let low = new Array(n).fill(-1);
    let onStack = new Array(n).fill(false);
    let stack: number[] = [];

    let idCounter = 0;
    let sccCount = 0;

    // To visualize SCCs, we will use auxiliaryArray to store the SCC ID found (initially -1)
    // We initialize aux array to -1s
    for (let i = 0; i < n; i++) {
        steps.push({ type: "updateAux", indices: [i], value: -1 });
    }

    const dfs = (at: number) => {
        stack.push(at);
        onStack[at] = true;
        ids[at] = low[at] = idCounter++;

        steps.push({ type: "visit", indices: [0, at] }); // reusing visit for highlight node 'at'. indices: [row, col], let's use [0, at] or just use highlight? 
        // Better: step type "highlight" with indices [at]
        steps.push({ type: "compare", indices: [at] }); // Highlight current node

        for (const to of adj[at]) {
            if (ids[to] === -1) {
                dfs(to);
                low[at] = Math.min(low[at], low[to]);
            } else if (onStack[to]) {
                low[at] = Math.min(low[at], ids[to]);
            }
        }

        if (ids[at] === low[at]) {
            // SCC found
            while (stack.length > 0) {
                const node = stack.pop()!;
                onStack[node] = false;
                low[node] = ids[at];

                // Assign SCC ID to this node
                steps.push({ type: "updateAux", indices: [node], value: sccCount });
                steps.push({ type: "found", indices: [node] }); // Highlight as found/permanent

                if (node === at) break;
            }
            sccCount++;
        }
    };

    for (let i = 0; i < n; i++) {
        if (ids[i] === -1) {
            dfs(i);
        }
    }

    return steps;
};
