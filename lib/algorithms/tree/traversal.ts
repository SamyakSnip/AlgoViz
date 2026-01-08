import { TreeNode } from "@/types";

export const inorderTraversal = (root: TreeNode | null): string[] => {
    const result: string[] = [];
    const traverse = (node: TreeNode | null) => {
        if (!node) return;
        traverse(node.left);
        result.push(node.id);
        traverse(node.right);
    };
    traverse(root);
    return result;
};

export const preorderTraversal = (root: TreeNode | null): string[] => {
    const result: string[] = [];
    const traverse = (node: TreeNode | null) => {
        if (!node) return;
        result.push(node.id);
        traverse(node.left);
        traverse(node.right);
    };
    traverse(root);
    return result;
};

export const postorderTraversal = (root: TreeNode | null): string[] => {
    const result: string[] = [];
    const traverse = (node: TreeNode | null) => {
        if (!node) return;
        traverse(node.left);
        traverse(node.right);
        result.push(node.id);
    };
    traverse(root);
    return result;
};
