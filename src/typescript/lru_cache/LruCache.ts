import { DoubleLinkedNode } from "./DoubleLinkedNode";

export class LRUCache<T> {
    private head: DoubleLinkedNode<T> | undefined;
    private tail: DoubleLinkedNode<T> | undefined;
    private mapping = new Map<string, DoubleLinkedNode<T>>();
    private currentSize = 0;

    constructor(
        private readonly maxSize: number,
    ) { }

    public get(key: string): T | undefined {
        const found = this.mapping.get(key);
        if (!found) {
            return undefined
        }

        return found.value
    }

    public set(key: string, value: T): void {
        const node = this.mapping.get(key);
        if (node) {
            node.value = value;
            this.moveToFront(node);

            return;
        }

        if (this.maxSize <= this.currentSize) {
            this.removeOldCache();
        }

        const newNode = new DoubleLinkedNode<T>(key, value);
        this.addFront(newNode);
        this.mapping.set(key, newNode);

        if (!this.tail) {
            this.tail = newNode;
        }
    }

    public showCaches() {
        console.log("--------------------------------")

        if (!this.head) {
            console.log("no chache has been registered.")
        } else {
            this.showNodeRecursively(this.head)
        }

        console.log();
    }

    private showNodeRecursively(node: DoubleLinkedNode<T>) {
        const prev = `prev: ${this.keyValueOf(node.previous)}`;
        const self = `self: ${this.keyValueOf(node)}`
        console.log(`${prev.padEnd(20, " ")} ${self}`);
        if (node.next) {
            this.showNodeRecursively(node.next)
        }
    }

    private keyValueOf(node: DoubleLinkedNode<T> | undefined): string {
        if (node) {
            return `(${node.key}, ${node.value})`
        }

        return "N/A";
    }

    private addFront(node: DoubleLinkedNode<T>) {
        const oldHead = this.head;
        if (oldHead) {
            oldHead.previous = node;
        }

        node.next = oldHead;
        this.head = node;
    }

    private moveToFront(node: DoubleLinkedNode<T>) {
        if (node.previous) {
            node.previous.next = node.next;
            node.previous = undefined;
        }

        this.addFront(node);
    }

    private removeOldCache(): void {
        if (this.mapping.size === 0) {
            return;
        }

        const removedNode = this.tail;
        if (!removedNode) {
            throw new Error("tail doesn't exist.");
        }

        this.tail = removedNode?.previous;
        if (this.tail) {
            this.tail.next = undefined;
        }

        this.mapping.delete(removedNode.key)
    }
}
