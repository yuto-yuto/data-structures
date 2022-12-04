export class Node {
    private _left?: Node;
    public get Left() {
        return this._left;
    }
    private _right?: Node;

    public get Right() {
        return this._right;
    }
    private _parent?: Node;

    public get Parent() {
        return this._parent;
    }

    public constructor(
        public readonly Key: string,
        private readonly priority: number,
    ) { }

    public setLeft(node: Node | undefined): void {
        this._left = node;
        if (node) {
            node._parent = this;
        }
    }
    public setRight(node: Node | undefined): void {
        this._right = node;
        if (node) {
            node._parent = this;
        }
    }

    public biggerThan(targetKey: string): boolean {
        for (let i = 0; i < this.Key.length; i++) {
            const original = this.Key[i].toLowerCase();
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
        // same key
        return true;
    }
}