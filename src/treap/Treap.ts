import { Node } from "./node";

type HasParentNode = Node & { Parent: Node };
export class Treap {
    private root?: Node;

    public rightRotate(treap: Treap, target: Node): void {
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
                parentOfParent.setLeft(target);
            } else {
                parentOfParent.setRight(target);
            }
        } else {
            treap.root = target;
        }

        parent.setLeft(target.Right);
        target.setRight(parent)
    }

    public leftRotate(treap: Treap, target: Node): void {
        if (!this.hasParent(target)) {
            throw new Error("Specified node is a root node")
        }

        const parent = target.Parent;
        if (parent.Right != target) {
            throw new Error("Right rotation can be performed only on a Right node.");
        }

        const parentOfParent = parent.Parent;
        if (parentOfParent) {
            if (parentOfParent.Left === parent) {
                parentOfParent.setLeft(target);
            } else {
                parentOfParent.setRight(target);
            }
        } else {
            treap.root = target;
        }

        parent.setRight(target.Left);
        target.setLeft(parent)
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

    /**
     * Node is a root if this function returns false.
     * @param node 
     * @returns 
     */
    private hasParent(node: Node): node is HasParentNode {
        return !!node.Parent;
    }
}
