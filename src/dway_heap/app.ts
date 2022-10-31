import { DwayHeapNumber } from "./DwayHeapNumber";

{
    const numberHeap = new DwayHeapNumber();
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
    const numberHeap = new DwayHeapNumber();
    Math.random()
}