import { DwayHeapNumber, DwayHeapNumberOptimized } from "./DwayHeapNumber";

function DwayHeapNumberFactory(type: 1 | 2, branchFactor: number = 2) {
    if (type === 1) {
        return new DwayHeapNumber(branchFactor);
    }
    return new DwayHeapNumberOptimized(branchFactor);
}

{
    const numberHeap = DwayHeapNumberFactory(2);
    numberHeap.push(2); numberHeap.showTree(); // 2
    numberHeap.push(9); numberHeap.showTree(); // 9, 2
    numberHeap.push(4); numberHeap.showTree(); // 9, 2, 4
    numberHeap.push(6); numberHeap.showTree(); // 9, 6, 4, 2
    numberHeap.push(8); numberHeap.showTree(); // 9  8, 4, 2, 6

    let results = [];
    for (let i = numberHeap.size; i > 0; i--) {
        results.push(numberHeap.pop());
    }
    console.log(`Result: ${results}`);
}

{
    console.log("=== random value === ")
    for (let ii = 0; ii < 10; ii++) {
        const numberHeap = DwayHeapNumberFactory(2, 4);
        const values = Array.from(Array(100)).map(() => Math.floor(Math.random() * 100));
        for (const value of values) {
            numberHeap.push(value);
        }

        for (let i = 0; i < 10; i++) {
            const index = Math.floor(Math.random() * 100);
            const oldValue = values[index];
            const newValue = Math.floor(Math.random() * 100);
            values[index] = newValue;
            numberHeap.update(oldValue, newValue);
        }

        for (let i = 0; i < 10; i++) {
            const index = Math.floor(Math.random() * 100);
            const oldValue = values[index];
            const newValue = Math.floor(Math.random() * 100);
            numberHeap.updateAll(oldValue, newValue);

            for (let j = 0; j < 100; j++) {
                if (values[j] === oldValue) {
                    values[j] = newValue;
                }
            }
        }

        numberHeap.remove(values[12]);
        numberHeap.remove(values[27]);
        numberHeap.remove(values[48]);
        numberHeap.remove(values[87]);
        numberHeap.remove(values[98]);

        let results: number[] = [];
        for (let i = numberHeap.size; i > 0; i--) {
            results.push(numberHeap.pop()!);
        }
        const isSorted = isDescSorted(results);
        if (!isSorted) {
            console.log(`Length: ${results.length}`);
            console.log(`Is desc sorted: ${isDescSorted(results)}`);
            console.log(results)
            break;
        }
    }
}

function isDescSorted(nums: number[]) {
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] < nums[i + 1]) {
            return false;
        }
    }
    return true;
}