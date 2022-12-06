import { Node } from "./Node";

type HasParentNode = Node & { Parent: Node };
export class Treap {
    private root?: Node;

    public rightRotate(target: Node): void {
        if (!this.hasParent(target)) {
            throw new Error("Specified node is a root node")
        }

        const parent = target.Parent;
        if (parent.Left != target) {
            throw new Error("Right rotation can be performed only on a left node.");
        }

        const parentOfParent = parent.Parent;
        if (parentOfParent) {
            if (parentOfParent.Left === parent) {
                parentOfParent.Left = target;
            } else {
                parentOfParent.Right = target;
            }
        } else {
            this.root = target;
        }

        parent.Left = target.Right;
        target.Right = parent
    }

    public leftRotate(target: Node): void {
        if (!this.hasParent(target)) {
            throw new Error("Specified node is a root node")
        }

        const parent = target.Parent;
        if (parent.Right != target) {
            throw new Error("Left rotation can be performed only on a Right node.");
        }

        const parentOfParent = parent.Parent;
        if (parentOfParent) {
            if (parentOfParent.Left === parent) {
                parentOfParent.Left = target;
            } else {
                parentOfParent.Right = target;
            }
        } else {
            this.root = target;
        }

        parent.Right = target.Left;
        target.Left = parent;
    }

    public search(node: Node | undefined, targetKey: string): Node | undefined {
        if (!node) {
            return undefined;
        }
        if (node.Key == targetKey) {
            return node;
        } else if (node.biggerThan(targetKey)) {
            return this.search(node.Left, targetKey);
        }
        return this.search(node.Right, targetKey);
    }

    public insert(key: string, priority: number): void {
        let node = this.root;
        let parent: Node | undefined;
        const newNode = new Node(key, priority);

        // Search for a parent leaf
        while (node) {
            parent = node;
            if (node.biggerThan(key)) {
                node = node.Right;
            } else {
                node = node.Left;
            }
        }

        // Add the new node as a leaf
        if (!parent) {
            this.root = newNode;
            return;
        } else if (parent.biggerThan(key)) {
            parent.Left = newNode;
        } else {
            parent.Right = newNode;
        }

        newNode.Parent = parent;

        // Fix the priority violations
        while (newNode.Parent && newNode.priority < newNode.Parent.priority) {
            if (newNode == newNode.Parent.Left) {
                this.rightRotate(newNode);
            } else {
                this.leftRotate(newNode);
            }
        }

        if (!newNode.Parent) {
            this.root = newNode;
        }
    }

    /**
     * Node is a root if this function returns false.
     * @param node 
     * @returns 
     */
    private hasParent(node: Node): node is HasParentNode {
        return !!node.Parent;
    }
}
