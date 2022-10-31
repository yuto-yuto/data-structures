import { DwayHeapBase } from "./DwayHeapBase";
import { DEFAULT_BRANCH_FACTOR } from "./DwayHeapDef";

export class DwayHeapNumber extends DwayHeapBase<number> {
    constructor(
        _branchFactor = DEFAULT_BRANCH_FACTOR,
        elements = [],
    ) {
        super(_branchFactor, elements);
    }

    protected compare(x: number, y: number): number {
        if (x < y) {
            return -1;
        } else if (x > y) {
            return 1;
        }
        return 0;
    }

    protected equal(x: number, y: number): boolean {
        return x === y;
    }
}