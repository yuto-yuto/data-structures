export interface DwayHeap<T> {
    peek(): T | undefined;
    /**
     * Remove the first element and return it if the heap is not empty.
     */
    pop(): T | undefined;
    push(element: T): void;
    remove(element: T): void;
    update(oldValue: T, newValue: T): void;
}

/**
 * Compare the two elements
 * @param x 
 * @param y 
 * @returns 1 if x > y, -1 if x < y, 0 if x = y
 */
 export type CompareStrategy<T> = (x: T, y: T) => number;

 export const DEFAULT_BRANCH_FACTOR = 2;