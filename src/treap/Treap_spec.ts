import "mocha";
import { expect } from "chai";
import { Treap } from "./Treap";
import { Node } from "./Node";

class TreapEx extends Treap {
    public rotateRight(target: Node): void {
        super.rotateRight(target);
    }
    public rotateLeft(target: Node): void {
        super.rotateLeft(target);
    }

    public search(targetKey: string): Node | undefined {
        return super.search(targetKey);
    }
}

describe("Treap", () => {
    let instance: TreapEx;

    beforeEach(() => {
        instance = new TreapEx();
    });

    describe("rotateRight", () => {
        it("should throw an error when the target is a root", () => {
            const node = new Node("Flour", 10);
            const result = () => instance.rotateRight(node)
            expect(result).to.throw("Specified node is a root node")
        });

        it("should throw an error when the target is a right node", () => {
            const root = new Node("Flour", 10);
            const node = new Node("Water", 32);
            node.Parent = root;
            root.Right = node;
            const result = () => instance.rotateRight(node)
            expect(result).to.throw(/only on a left node/)
        });

        it("should set the node as root when the parent of parent doesn't exist", () => {
            //         Flour
            //          /   \
            //     Butter   Water
            //     /   \
            // Apple   Eggs
            const flour = new Node("Flour", 10);
            const butter = new Node("Butter", 76);
            const eggs = new Node("Eggs", 129)
            const water = new Node("Water", 32);
            const apple = new Node("Apple", 2)
            flour.Left = butter;
            flour.Right = water;
            butter.Right = eggs;
            butter.Left = apple;

            instance.rotateRight(butter)
            //     Butter
            //     /    \
            // Apple    Flour
            //           /  \
            //         Eggs Water
            expect(butter.Parent).to.be.undefined;
            expect(butter.Left).to.deep.equal(apple);
            expect(butter.Right).to.deep.equal(flour);
            expect(flour.Left).to.deep.equal(eggs);
            expect(flour.Right).to.deep.equal(water);
        });

        it("should rotate correctly when the parent of parent exist", () => {
            //          Flour
            //           /   \
            //      Butter   Water
            //      /    \
            //    Bacon  Eggs
            //    /   \
            // Apple  Bee
            const flour = new Node("Flour", 10);
            const butter = new Node("Butter", 76);
            const eggs = new Node("Eggs", 129)
            const water = new Node("Water", 32);
            const bacon = new Node("Bacon", 77)
            const apple = new Node("Apple", 2);
            const bee = new Node("Bee", 6);
            flour.Left = butter;
            flour.Right = water;
            butter.Right = eggs;
            butter.Left = bacon;
            bacon.Left = apple;
            bacon.Right = bee;

            instance.rotateRight(bacon)
            //       Flour
            //        /   \
            //   Bacon   Water
            //   /    \
            // Apple Butter
            //       /    \
            //     Bee   Eggs
            expect(flour.Parent).to.be.undefined;
            expect(flour.Left).to.deep.equal(bacon);
            expect(flour.Right).to.deep.equal(water);

            expect(bacon.Parent).to.deep.equal(flour);
            expect(bacon.Left).to.deep.equal(apple);
            expect(bacon.Right).to.deep.equal(butter);

            expect(butter.Parent).to.deep.equal(bacon);
            expect(butter.Left).to.deep.equal(bee);
            expect(butter.Right).to.deep.equal(eggs);
        });
    });
    describe("rotateLeft", () => {
        it("should throw an error when the target is a root", () => {
            const node = new Node("Flour", 10);
            const result = () => instance.rotateLeft(node)
            expect(result).to.throw("Specified node is a root node")
        });

        it("should throw an error when the target is a right node", () => {
            const root = new Node("Flour", 10);
            const node = new Node("Water", 32);
            node.Parent = root;
            root.Left = node;
            const result = () => instance.rotateLeft(node)
            expect(result).to.throw(/only on a Right node/)
        });

        it("should set the node as root when the parent of parent doesn't exist", () => {
            //     Flour
            //      /   \
            // Butter   Water
            //          /   \
            //        Vodka  XYZ
            const flour = new Node("Flour", 10);
            const butter = new Node("Butter", 76);
            const xyz = new Node("XYZ", 129)
            const water = new Node("Water", 32);
            const vodka = new Node("Vodka", 60);
            flour.Left = butter;
            flour.Right = water;
            water.Right = xyz;
            water.Left = vodka;

            instance.rotateLeft(water)
            //      Water
            //      /    \
            //    Flour  XYZ
            //    /   \
            // Butter Vodka
            expect(water.Parent).to.be.undefined;
            expect(water.Right).to.equal(xyz);
            expect(water.Left).to.deep.equal(flour);
            expect(flour.Right).to.deep.equal(vodka);
            expect(flour.Left).to.deep.equal(butter);
        });

        it("should rotate correctly when the parent of parent exist", () => {
            //     Flour
            //      /   \
            // Butter   Water
            //          /   \
            //        Vodka  XYZ
            //               /  \
            //            XXX   ZZZ
            const flour = new Node("Flour", 10);
            const butter = new Node("Butter", 76);
            const xyz = new Node("XYZ", 129)
            const water = new Node("Water", 32);
            const vodka = new Node("Vodka", 60);
            const xxx = new Node("XXX", 5);
            const zzz = new Node("ZZZ", 7);

            flour.Left = butter;
            flour.Right = water;
            water.Right = xyz;
            water.Left = vodka;
            xyz.Left = xxx;
            xyz.Right = zzz;

            instance.rotateLeft(xyz)
            //      Flour
            //      /   \
            // Butter   XYZ
            //          /  \
            //        Water ZZZ
            //        /  \
            //     Vodka  XXX
            expect(flour.Parent).to.be.undefined;
            expect(flour.Right).to.equal(xyz);
            expect(flour.Left).to.deep.equal(butter);

            expect(butter.Parent).to.equal(flour);
            expect(butter.Right).to.be.undefined;
            expect(butter.Left).to.be.undefined;

            expect(xyz.Parent).to.equal(flour);
            expect(xyz.Right).to.equal(zzz);
            expect(xyz.Left).to.deep.equal(water);

            expect(water.Parent).to.equal(xyz);
            expect(water.Right).to.equal(xxx);
            expect(water.Left).to.deep.equal(vodka);
        });
    });

    describe("Insert", () => {
        it("should add to the root for the first insertion", () => {
            instance.insert("A", 10);
            const result = instance.search("A");
            expect(result?.Parent).to.be.undefined;
        });

        context("new key is bigger than original", () => {
            it("should add a new node to right", () => {
                instance.insert("A", 10);
                instance.insert("B", 20);
                const result = instance.search("A");
                expect(result?.Right?.Key).to.equal("B")
            });

            it("should add a new node to right for second level", () => {
                instance.insert("A", 10);
                instance.insert("B", 20);
                instance.insert("BB", 30);
                const result = instance.search("B");
                expect(result?.Right?.Key).to.equal("BB")
            });
        });

        context("new key is smaller than original", () => {
            it("should add a new node to left", () => {
                instance.insert("B", 10);
                instance.insert("A", 20);
                const result = instance.search("B");
                expect(result?.Left?.Key).to.equal("A")
            });

            it("should add a new node to left for second level", () => {
                instance.insert("B", 10);
                instance.insert("AA", 20);
                instance.insert("A", 30);
                const result = instance.search("AA");
                expect(result?.Left?.Key).to.equal("A")
            });
        });

        context("rotation", () => {
            it("should rotate right", () => {
                instance.insert("B", 10);
                instance.insert("A", 5);
                const result = instance.search("A");
                expect(result?.Right?.Key).to.equal("B")
            });

            it("should rotate left", () => {
                instance.insert("A", 20);
                instance.insert("B", 10);
                const result = instance.search("B");
                expect(result?.Left?.Key).to.equal("A")
            });
        });
    });

    describe("search", () => {
        it("should return undefined when node is undefined", () => {
            const result = instance.search("abc");
            expect(result).to.be.undefined;
        });

        it("should return a node when key is found", () => {
            instance.insert("Apple", 10);
            const result = instance.search("Apple");
            expect(result?.Key).to.equal("Apple");
            expect(result?.priority).to.equal(10);
        });

        it("should return a node when key is found at right node", () => {
            instance.insert("Apple", 10);
            instance.insert("Bacon", 10);
            const result = instance.search("Bacon");
            expect(result?.Parent?.Right?.Key).to.equal("Bacon");
            expect(result?.Parent?.Right?.priority).to.equal(10);
        });

        it("should return a node when key is found at left node", () => {
            instance.insert("Bacon", 10);
            instance.insert("Apple", 10);
            const result = instance.search("Apple");
            expect(result?.Parent?.Left?.Key).to.equal("Apple");
            expect(result?.Parent?.Left?.priority).to.equal(10);
        });
    });

    describe("remove", () => {
        it("", () => {
        });
    });
});