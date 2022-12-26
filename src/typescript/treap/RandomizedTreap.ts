import { Node } from "./Node";
import { Treap } from "./Treap";

export class RandomizedTreap {
    private treap: Treap;
    public constructor() {
        this.treap = new Treap();
    }

    public contains(targetKey: string): boolean {
        return this.treap.contains(targetKey);
    }

    public insert(key: string): void {
        this.treap.insert(key, Math.random());
    }

    public remove(key: string): boolean {
        return this.treap.remove(key);
    }

    public pop(): string {
        return this.treap.pop();
    }

    public peek(): string {
        return this.treap.peek();
    }

    public min(): string {
        return this.treap.min();
    }

    public max(): string {
        return this.treap.max();
    }
}