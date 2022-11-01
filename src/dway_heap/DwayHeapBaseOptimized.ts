import { DEFAULT_BRANCH_FACTOR } from "./DwayHeapDef";

export abstract class DwayHeapBaseOptimized<T> {
    private _elements = new WeakMap();
    constructor(
        private readonly _branchFactor = DEFAULT_BRANCH_FACTOR,
        private elements: T[] = [],
    ) { }

    /**
     * Compare the two elements
     * @param x 
     * @param y 
     * @returns 1 if x > y, -1 if x < y, 0 if x = y
     */
    protected abstract compare(x: T, y: T): number;
    /**
     * Compare the two object whether they are the same or not
     * @param x 
     * @param y 
     * @returns true: equal, false: not equal
     */
    protected abstract equal(x: T, y: T): boolean;

    public get size(): number {
        return this.elements.length;
    }

    public get branchFactor(): number {
        return this._branchFactor;
    }

    public showTree(): void {
        console.log(this.elements);
    }

    public peek(): T | undefined {
        return this.elements[0];
    }
    /**
     * Remove the first element and return it if the heap is not empty.
     */
    public pop(): T | undefined {
        if (this.size < 2) {
            return this.elements.shift();
        }

        // Must not delete the first element here
        const firstElement = this.elements[0];
        const lastElement = this.elements.pop();
        this.elements[0] = lastElement!;
        this.pushDown();
        return firstElement;
    }

    public push(element: T): void {
        if (element === undefined || element === null || typeof element === "function") {
            throw new TypeError("Invalid argument. 'undefined', 'null', and 'function' can not be assigned.");
        }

        this.elements.push(element);
        this.bubbleUp();
    }

    public remove(element: T): void {
        if (this.size === 0) {
            throw ReferenceError("")
        }

        const index = this.elements.findIndex((x) => this.equal(x, element));
        if (index < 0) {
            throw ReferenceError(`element nod found: ${element}`);
        }

        this.elements[index] = this.elements.pop()!;
        const compareResult = this.compare(element, this.elements[index])
        if (compareResult === -1) {
            this.bubbleUp(index);
        } else if (compareResult === 1) {
            this.pushDown(index);
        }
    }

    public update(oldValue: T, newValue: T): void {
        const index = this.elements.findIndex((x) => this.equal(x, oldValue));
        if (index < 0) {
            throw Error(`oldValue not found: ${oldValue}`);
        }

        this.elements[index] = newValue;
        const compareResult = this.compare(oldValue, newValue);
        if (compareResult === -1) {
            this.bubbleUp(index);
        } else if (compareResult === 1) {
            this.pushDown(index);
        }
    }

    public updateAll(oldValue: T, newValue: T): void {
        const indexes = this.elements.map((x, index) => {
            return { value: x, index };
        }).filter((x) => this.equal(x.value, oldValue))
            .map((x) => x.index);

        if (indexes.length === 0) {
            throw Error(`oldValue not found: ${oldValue}`);
        }

        const compareResult = this.compare(oldValue, newValue);
        if (compareResult === -1) {
            // bubbleUp must start with the smaller index (near to top node)
            for (const index of indexes) {
                this.elements[index] = newValue;
                this.bubbleUp(index);
            }
        } else if (compareResult === 1) {
            // pushDown must start with the bigger index (near to leaf)
            for (const index of indexes.sort((a, b) => b - a)) {
                this.elements[index] = newValue;
                this.pushDown(index);
            }
        }
    }

    private bubbleUp(index = this.size - 1): void {
        const currentElement = this.elements[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / this._branchFactor);
            if (this.compare(this.elements[parentIndex], currentElement) < 0) {
                this.elements[index] = this.elements[parentIndex];
                index = parentIndex;
            } else {
                break;
            }
        }
        this.elements[index] = currentElement;
    }

    private pushDown(index = 0): void {
        const firstLeafIndex = Math.floor((this.size - 2) / this.branchFactor + 1);
        const currentElement = this.elements[index];
        let currentIndex = index;

        while (currentIndex < firstLeafIndex) {
            const highestChild = this.getHighestPriorityChild(currentIndex);

            if (this.compare(currentElement, highestChild.element) < 0) {
                this.elements[currentIndex] = this.elements[highestChild.index];
                currentIndex = highestChild.index;
            } else {
                break;
            }
        }
        this.elements[currentIndex] = currentElement;
    }

    private getHighestPriorityChild(currentIndex: number): { index: number, element: T } {
        let smallestChildIndex = this.branchFactor * currentIndex + 1;
        const largestChildIndex = Math.min(this.branchFactor * currentIndex + this.branchFactor, this.size);
        let highestPriorityElement = this.elements[smallestChildIndex];
        let childIndex = smallestChildIndex;

        for (let i = smallestChildIndex; i < largestChildIndex; i++) {
            const compareResult = this.compare(highestPriorityElement, this.elements[i + 1]);
            if (compareResult < 0) {
                highestPriorityElement = this.elements[i + 1];
                childIndex = i + 1;
            }
        }
        return {
            index: childIndex,
            element: highestPriorityElement,
        };
    }
}
