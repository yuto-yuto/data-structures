import { CompareStrategy, DEFAULT_BRANCH_FACTOR, DwayHeap } from "./DwayHeapDef";

export abstract class PriorityHeap<T> implements DwayHeap<T> {
    constructor(
        private readonly _branchFactor = DEFAULT_BRANCH_FACTOR,
        private elements: T[] = [],
        private compare: CompareStrategy<T>,
    ) { }

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

    protected abstract equal(x: T, y: T): boolean;

    private bubbleUp(index = this.size - 1): void {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / this._branchFactor);
            if (this.compare(this.elements[parentIndex], this.elements[index]) < 0) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    private pushDown(index = 0): void {
        const firstLeafIndex = Math.floor((this.size - 2) / this.branchFactor + 1);
        const currentElement = this.elements[index];
        let currentIndex = index;

        while (currentIndex < firstLeafIndex) {
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

            if (this.compare(currentElement, highestPriorityElement) < 0) {
                this.swap(currentIndex, childIndex);
                currentIndex = childIndex;
            } else {
                break;
            }
        }
    }

    private bubbleUpOptimized(index = this.size - 1): void {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / this._branchFactor);
            if (this.compare(this.elements[parentIndex], this.elements[index]) === 1) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    private swap(index1: number, index2: number): void {
        const temp = this.elements[index1];
        this.elements[index1] = this.elements[index2];
        this.elements[index2] = temp;
    }
}
