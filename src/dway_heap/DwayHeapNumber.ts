import { PriorityHeap } from "./DwayHeapBase";
import { DEFAULT_BRANCH_FACTOR } from "./DwayHeapDef";

function compare(x: number, y: number): number {
    if (x < y) {
        return -1;
    } else if (x > y) {
        return 1;
    }
    return 0;
}


export class DwayHeapNumber extends PriorityHeap<number> {
    constructor(
        _branchFactor = DEFAULT_BRANCH_FACTOR,
        elements = [],
    ) {
        super(_branchFactor, elements, compare);
    }
    protected equal(x: number, y: number): boolean {
        return x === y;
    }
}