export class Node {
    private _left?: Node;
    public get Left(): Node | undefined {
        return this._left;
    }
    public set Left(node: Node | undefined) {
        this._left = node;
        if (node) {
            node._parent = this;
        }
    }

    private _right?: Node;
    public get Right(): Node | undefined {
        return this._right;
    }
    public set Right(node: Node | undefined) {
        this._right = node;
        if (node) {
            node._parent = this;
        }
    }

    private _parent?: Node;
    public get Parent(): Node | undefined {
        return this._parent;
    }
    public set Parent(node: Node | undefined) {
        this._parent = node;
    }

    public constructor(
        public readonly Key: string,
        public readonly priority: number,
    ) { }

    public biggerThan(targetKey: string): boolean {
        for (let i = 0; i < this.Key.length; i++) {
            const original = this.Key[i]?.toLowerCase();
            const target = targetKey[i]?.toLowerCase();

            if (original === target) {
                continue;
            }

            if (target === undefined) {
                // original key is longer than target
                return true;
            }

            return original > target;
        }
        // same key or targetKey is longer
        return this.Key.length >= targetKey.length;
    }
}