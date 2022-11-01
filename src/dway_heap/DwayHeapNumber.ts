import { DwayHeapBase } from "./DwayHeapBase";
import { DwayHeapBaseOptimized } from "./DwayHeapBaseOptimized";
import { DEFAULT_BRANCH_FACTOR } from "./DwayHeapDef";

function compare(x: number, y: number): number {
    if (x < y) {
        return -1;
    } else if (x > y) {
        return 1;
    }
    return 0;
}

export class DwayHeapNumber extends DwayHeapBase<number> {
    constructor(
        _branchFactor = DEFAULT_BRANCH_FACTOR,
        elements = [],
    ) {
        super(_branchFactor, elements);
    }

    protected compare(x: number, y: number): number {
        return compare(x, y);
    }

    protected equal(x: number, y: number): boolean {
        return x === y;
    }
}


export class DwayHeapNumberOptimized extends DwayHeapBaseOptimized<number> {
    constructor(
        _branchFactor = DEFAULT_BRANCH_FACTOR,
        elements = [],
    ) {
        super(_branchFactor, elements);
    }

    protected compare(x: number, y: number): number {
        return compare(x, y);
    }

    protected equal(x: number, y: number): boolean {
        return x === y;
    }
}