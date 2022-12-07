import "mocha";
import { expect } from "chai";
import { Treap } from "./Treap";
import { Node } from "./Node";

describe("Treap", () => {
    let instance: Treap;

    beforeEach(() => {
        instance = new Treap();
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
            //     Flour
            //      /   \
            // Butter   Water
            //     \
            //    Eggs
            const flour = new Node("Flour", 10);
            const butter = new Node("Butter", 76);
            const eggs = new Node("Eggs", 129)
            const water = new Node("Water", 32);
            flour.Left = butter;
            flour.Right = water;
            butter.Right = eggs;

            instance.rotateRight(butter)
            // Butter
            //     \
            //     Flour
            //      /  \
            //    Eggs Water
            expect(butter.Parent).to.be.undefined;
            expect(butter.Left).to.be.undefined;
            expect(butter.Right).to.deep.equal(flour);
            expect(flour.Left).to.deep.equal(eggs);
            expect(flour.Right).to.deep.equal(water);
        });

        it("should rotate correctly when the parent of parent exist", () => {
            //       Flour
            //        /   \
            //   Butter   Water
            //   /    \
            // Bacon  Eggs
            //  /  \
            // A    Bee
            const flour = new Node("Flour", 10);
            const butter = new Node("Butter", 76);
            const eggs = new Node("Eggs", 129)
            const water = new Node("Water", 32);
            const bacon = new Node("Bacon", 77)
            const a = new Node("A", 2);
            const bee = new Node("Bee", 6);
            flour.Left = butter;
            flour.Right = water;
            butter.Right = eggs;
            butter.Left = bacon;
            bacon.Left = a;
            bacon.Right = bee;

            instance.rotateRight(bacon)
            //       Flour
            //        /   \
            //   Bacon   Water
            //   /    \
            //  A    Butter
            //      /    \
            //     Bee   Eggs
            expect(flour.Parent).to.be.undefined;
            expect(flour.Left).to.deep.equal(bacon);
            expect(flour.Right).to.deep.equal(water);

            expect(bacon.Parent).to.deep.equal(flour);
            expect(bacon.Left).to.deep.equal(a);
            expect(bacon.Right).to.deep.equal(butter);

            expect(butter.Parent).to.deep.equal(bacon);
            expect(butter.Left).to.deep.equal(bee);
            expect(butter.Right).to.deep.equal(eggs);
        });
    });
});