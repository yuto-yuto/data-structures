import { Node } from "./Node";

interface ITreap {
    contains(targetKey: string): boolean;
    insert(key: string, priority: number): void;
    remove(key: string): boolean;
    pop(): string;
    peek(): string;
    min(): string;
    max(): string;
}

type HasParentNode = Node & { Parent: Node };
export class Treap implements ITreap{
    private root?: Node;

    // it's protected for writing test
    protected rotateRight(target: Node): void {
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
            this.root.Parent = undefined;
        }

        parent.Left = target.Right;
        target.Right = parent
    }

    protected rotateLeft(target: Node): void {
        if (!this.hasParent(target)) {
            throw new Error("Specified node is a root node")
        }

        const parent = target.Parent;
        if (parent.Right !== target) {
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
            this.root.Parent = undefined;
        }

        parent.Right = target.Left;
        target.Left = parent;
    }

    // it's protected for writing test
    protected search(targetKey: string): Node | undefined {
        const recursive = (node: Node | undefined, targetKey: string): Node | undefined => {
            if (!node) {
                return undefined;
            }
            if (node.Key == targetKey) {
                return node;
            } else if (node.biggerThan(targetKey)) {
                return recursive(node.Left, targetKey);
            }
            return recursive(node.Right, targetKey);
        }
        return recursive(this.root, targetKey);
    }

    public contains(targetKey: string): boolean {
        return !!this.search(targetKey);
    }

    public insert(key: string, priority: number): void {
        let node = this.root;
        let parent: Node | undefined;
        const newNode = new Node(key, priority);

        // Search for a parent leaf
        while (node) {
            parent = node;
            if (node.biggerThan(key)) {
                node = node.Left;
            } else {
                node = node.Right;
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
                this.rotateRight(newNode);
            } else {
                this.rotateLeft(newNode);
            }
        }

        if (!newNode.Parent) {
            this.root = newNode;
        }
    }

    public remove(key: string): boolean {
        const node = this.search(key);

        if (!node) {
            return false;
        }

        if (!this.hasParent(node) && this.isLeaf(node)) {
            this.root = undefined;
            return true;
        }

        while (!this.isLeaf(node)) {
            if (node.Left && (!node.Right || node.Left.priority > node.Right.priority)) {
                this.rotateRight(node.Left);
            } else if (node.Right) {
                this.rotateLeft(node.Right)
            }

            if (node.Parent && !this.hasParent(node.Parent)) {
                this.root = node.Parent;
            }
        }

        // the node became a leaf here. Parent must exist.
        if (!node.Parent!.Left) {
            node.Parent!.Left = undefined;
        } else {
            node.Parent!.Right = undefined;
        }
        return true;
    }

    public pop(): string {
        if (!this.root) {
            throw new Error("Treap is empty");
        }
        const key = this.root.Key;
        this.remove(key);
        return key;
    }

    public peek(): string {
        if (!this.root) {
            throw new Error("Treap is empty");
        }
        return this.root.Key;
    }

    public min(): string {
        if (!this.root) {
            throw new Error("Treap is empty");
        }
        let node = this.root;
        while (node.Left) {
            node = node.Left;
        }
        return node.Key;
    }

    public max(): string {
        if (!this.root) {
            throw new Error("Treap is empty");
        }
        let node = this.root;
        while (node.Right) {
            node = node.Right;
        }
        return node.Key;
    }

    /**
     * Node is a root if this function returns false.
     * @param node 
     * @returns 
     */
    private hasParent(node: Node): node is HasParentNode {
        return !!node.Parent;
    }

    private isLeaf(node: Node): boolean {
        return !node.Left && !node.Right;
    }
}
