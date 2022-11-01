import { DEFAULT_BRANCH_FACTOR } from "./DwayHeapDef";

export abstract class DwayHeapBaseOptimized<T> {
    private positions = new Map<T, number[]>();
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
        const firstElement = this.popElement(0, false);
        const lastElement = this.popElement(this.size - 1);
        this.setElementToPositions(lastElement, 0);
        this.pushDown();
        return firstElement;
    }

    public push(element: T): void {
        if (element === undefined || element === null || typeof element === "function") {
            throw new TypeError("Invalid argument. 'undefined', 'null', and 'function' can not be assigned.");
        }

        this.setElementToPositions(element, this.size);
        this.bubbleUp();
    }

    public remove(element: T): void {
        if (this.size === 0) {
            throw ReferenceError("")
        }

        const indexes = this.positions.get(element);
        if (indexes === undefined) {
            throw ReferenceError(`element nod found: ${element}`);
        }
        const firstOccurrenceIndex = indexes[0];
        if (firstOccurrenceIndex === this.size - 1) {
            this.popElement(this.size - 1);
            return;
        }

        if (indexes.length === 1) {
            this.positions.delete(element);
        } else {
            indexes.shift();
        }

        const lastElement = this.popElement(this.size - 1);
        this.setElementToPositions(lastElement, firstOccurrenceIndex);

        const compareResult = this.compare(element, this.elements[firstOccurrenceIndex])
        if (compareResult === -1) {
            this.bubbleUp(firstOccurrenceIndex);
        } else if (compareResult === 1) {
            this.pushDown(firstOccurrenceIndex);
        }
    }

    public update(oldValue: T, newValue: T): void {
        if (this.compare(oldValue, newValue) === 0) {
            return;
        }
        const indexes = this.positions.get(oldValue);
        if (indexes === undefined) {
            throw Error(`oldValue not found: ${oldValue}`);
        }

        const foundIndex = indexes[0];
        if (indexes.length === 1) {
            this.positions.delete(oldValue);
        } else {
            this.positions.set(oldValue, indexes.slice(1));
        }

        this.setElementToPositions(newValue, foundIndex);
        const compareResult = this.compare(oldValue, newValue);
        if (compareResult === -1) {
            this.bubbleUp(foundIndex);
        } else if (compareResult === 1) {
            this.pushDown(foundIndex);
        }
    }

    public updateAll(oldValue: T, newValue: T): void {
        if (this.compare(oldValue, newValue) === 0) {
            return;
        }
        const indexes = this.positions.get(oldValue);

        if (indexes === undefined) {
            throw Error(`oldValue not found: ${oldValue}`);
        }

        this.positions.delete(oldValue);

        const compareResult = this.compare(oldValue, newValue);
        if (compareResult === -1) {
            // bubbleUp must start with the smaller index (near to top node)
            for (const index of indexes) {
                this.setElementToPositions(newValue, index);
                this.bubbleUp(index);
            }
        } else if (compareResult === 1) {
            // pushDown must start with the bigger index (near to leaf)
            for (const index of indexes.sort((a, b) => b - a)) {
                this.setElementToPositions(newValue, index);
                this.pushDown(index);
            }
        }
    }

    private setElementToPositions(element: T, index: number, oldIndex?: number): void {
        const elementPositions = this.positions.get(element);
        if (elementPositions === undefined) {
            this.positions.set(element, [index]);
        } else {
            if (oldIndex !== undefined) {
                const indexOfOldIndex = elementPositions.indexOf(oldIndex);
                elementPositions.splice(indexOfOldIndex, 1);
            }
            elementPositions.push(index);
        }
        this.elements[index] = element;
    }

    private popElement(index: number, isRemove = true): T {
        const element = this.elements[index];
        const indexes = this.positions.get(element)!;

        if (indexes.length === 1) {
            this.positions.delete(element);
        } else if (indexes.length > 1) {
            const indexToBeDeleted = indexes.indexOf(index);
            if (indexToBeDeleted < 0) {
                throw RangeError(`index was not found: ${index}`);
            }
            indexes.splice(indexToBeDeleted, 1);
        }
        if (isRemove) {
            this.elements.splice(index, 1);
        }
        return element;
    }

    private bubbleUp(index = this.size - 1): void {
        const currentElement = this.elements[index];
        let currentIndex = index;
        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / this._branchFactor);
            if (this.compare(this.elements[parentIndex], currentElement) < 0) {
                this.setElementToPositions(this.elements[parentIndex], currentIndex, parentIndex);
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
        this.setElementToPositions(currentElement, currentIndex, index);
    }

    private pushDown(index = 0): void {
        const firstLeafIndex = Math.floor((this.size - 2) / this.branchFactor + 1);
        const currentElement = this.elements[index];
        let currentIndex = index;

        while (currentIndex < firstLeafIndex) {
            const highestChild = this.getHighestPriorityChild(currentIndex);

            if (this.compare(currentElement, highestChild.element) < 0) {
                this.setElementToPositions(this.elements[highestChild.index], currentIndex, highestChild.index);
                currentIndex = highestChild.index;
            } else {
                break;
            }
        }
        this.setElementToPositions(currentElement, currentIndex, index);
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
