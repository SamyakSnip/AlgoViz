import { TreeNode } from "@/types";
import { recalculateTreeLayout as layout } from "./bst";

export const recalculateAVLLayout = (root: TreeNode | null) => layout(root);

const getHeight = (node: TreeNode | null): number => node ? node.height : 0;

const updateHeight = (node: TreeNode) => {
    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
};

const getBalance = (node: TreeNode | null): number => {
    return node ? getHeight(node.left) - getHeight(node.right) : 0;
};

// Rotations
const rightRotate = (y: TreeNode): TreeNode => {
    const x = y.left;
    if (!x) return y; // Should not happen in valid AVL call
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    updateHeight(y);
    updateHeight(x);

    return x; // New root
};

const leftRotate = (x: TreeNode): TreeNode => {
    const y = x.right;
    if (!y) return x;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    updateHeight(x);
    updateHeight(y);

    return y; // New root
};

export const insertAVL = (node: TreeNode | null, value: number): TreeNode => {
    // 1. Normal BST Insert
    if (!node) {
        return {
            id: Math.random().toString(36).substr(2, 9),
            value,
            left: null,
            right: null,
            height: 1,
            x: 0,
            y: 0
        };
    }

    if (value < node.value) {
        node.left = insertAVL(node.left, value);
    } else if (value > node.value) {
        node.right = insertAVL(node.right, value);
    } else {
        return node; // Duplicate keys not allowed
    }

    // 2. Update height
    updateHeight(node);

    // 3. Get balance factor
    const balance = getBalance(node);

    // 4. Balancing
    // Left Left
    if (balance > 1 && value < (node.left?.value || 0)) {
        return rightRotate(node);
    }

    // Right Right
    if (balance < -1 && value > (node.right?.value || 0)) {
        return leftRotate(node);
    }

    // Left Right
    if (balance > 1 && value > (node.left?.value || 0)) {
        if (node.left) node.left = leftRotate(node.left);
        return rightRotate(node);
    }

    // Right Left
    if (balance < -1 && value < (node.right?.value || 0)) {
        if (node.right) node.right = rightRotate(node.right);
        return leftRotate(node);
    }

    return node;
};

const getMinValueNode = (node: TreeNode): TreeNode => {
    let current = node;
    while (current.left) {
        current = current.left;
    }
    return current;
};

export const deleteAVL = (root: TreeNode | null, value: number): TreeNode | null => {
    if (!root) return null;

    if (value < root.value) {
        root.left = deleteAVL(root.left, value);
    } else if (value > root.value) {
        root.right = deleteAVL(root.right, value);
    } else {
        // Node found
        if (!root.left || !root.right) {
            const temp = root.left ? root.left : root.right;
            if (!temp) {
                // No child
                root = null;
            } else {
                // One child
                root = temp;
            }
        } else {
            // Two children
            const temp = getMinValueNode(root.right);
            root.value = temp.value;
            root.right = deleteAVL(root.right, temp.value);
        }
    }

    if (!root) return null;

    // Update height
    updateHeight(root);

    // Balance
    const balance = getBalance(root);

    // Left Left
    if (balance > 1 && getBalance(root.left) >= 0) {
        return rightRotate(root);
    }

    // Left Right
    if (balance > 1 && getBalance(root.left) < 0) {
        if (root.left) root.left = leftRotate(root.left);
        return rightRotate(root);
    }

    // Right Right
    if (balance < -1 && getBalance(root.right) <= 0) {
        return leftRotate(root);
    }

    // Right Left
    if (balance < -1 && getBalance(root.right) > 0) {
        if (root.right) root.right = rightRotate(root.right);
        return leftRotate(root);
    }

    return root;
};
