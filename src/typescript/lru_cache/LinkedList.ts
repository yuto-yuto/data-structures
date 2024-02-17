export class DoubleLinkedNode<T> {
    constructor(
        public value: T,
        public previous: DoubleLinkedNode<T> | undefined = undefined,
        public next: DoubleLinkedNode<T> | undefined = undefined,
    ) { }
}

export class LinkedList<T>{
    private head: DoubleLinkedNode<T> | undefined;

    public addFront(value: T): void {
        const newNode = new DoubleLinkedNode(value);
        if (!this.head) {
            this.head = newNode;

            return;
        }

        const temp = this.head;
        newNode.next = temp;
        this.head = newNode;
    }

    public updateAndMoveToFront(oldValue: T, newValue: T): boolean {
        const found = this.search(oldValue);
        if (!found) {
            return false;
        }

        if (found.previous) {
            found.previous.next = found.next;
        }

        if (!this.head) {
            throw new Error("head doesn't exist.");
        }

        const newNode = new DoubleLinkedNode(newValue);
        const temp = this.head;
        newNode.next = temp;
        this.head = newNode;

        return true;
    }

    private search(value: T): DoubleLinkedNode<T> | undefined {
        const compareNext = (node: DoubleLinkedNode<T>): DoubleLinkedNode<T> | undefined => {
            if (value === node.value) {
                return node;
            }

            return node.next ? compareNext(node.next) : undefined;
        }

        if (!this.head) {
            return;
        }

        return compareNext(this.head)
    }
}