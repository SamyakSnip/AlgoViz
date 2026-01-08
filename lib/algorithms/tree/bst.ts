import { TreeNode } from "@/types";

// Helper to calculate layout
const CANVAS_WIDTH = 1000;
const INITIAL_Y = 50;
const LEVEL_HEIGHT = 80;

export const recalculateTreeLayout = (root: TreeNode | null): TreeNode | null => {
    if (!root) return null;

    // BFS or DFS to assign coordinates. 
    // Standard approach: root at center.
    // Children at offset.

    // Limits: Max depth ~5-6 for visibility.

    const updateNode = (node: TreeNode, x: number, y: number, offset: number) => {
        node.x = x;
        node.y = y;

        if (node.left) {
            updateNode(node.left, x - offset, y + LEVEL_HEIGHT, offset / 2);
        }
        if (node.right) {
            updateNode(node.right, x + offset, y + LEVEL_HEIGHT, offset / 2);
        }
    };

    updateNode(root, CANVAS_WIDTH / 2, INITIAL_Y, CANVAS_WIDTH / 4);
    return root;
};

export const insertBST = (root: TreeNode | null, value: number): TreeNode => {
    if (!root) {
        return {
            id: Math.random().toString(36).substr(2, 9),
            value,
            left: null,
            right: null,
            height: 1,
            x: CANVAS_WIDTH / 2,
            y: INITIAL_Y
        };
    }

    if (value < root.value) {
        root.left = insertBST(root.left, value);
    } else if (value > root.value) {
        root.right = insertBST(root.right, value);
    }
    // Update height
    root.height = 1 + Math.max(root.left?.height || 0, root.right?.height || 0);

    return root;
};

// Find min value node (for deletion)
const getMinValueNode = (node: TreeNode): TreeNode => {
    let current = node;
    while (current.left) {
        current = current.left;
    }
    return current;
};

export const deleteBST = (root: TreeNode | null, value: number): TreeNode | null => {
    if (!root) return null;

    if (value < root.value) {
        root.left = deleteBST(root.left, value);
    } else if (value > root.value) {
        root.right = deleteBST(root.right, value);
    } else {
        // Node found
        if (!root.left || !root.right) {
            const temp = root.left ? root.left : root.right;
            if (!temp) {
                // No child
                return null;
            } else {
                // One child
                return temp;
            }
        } else {
            // Two children
            const temp = getMinValueNode(root.right);
            root.value = temp.value;
            root.right = deleteBST(root.right, temp.value);
        }
    }

    if (root) {
        root.height = 1 + Math.max(root.left?.height || 0, root.right?.height || 0);
    }

    return root;
};
