import "mocha";
import { expect } from "chai";
import { Node } from "./Node";

describe("Node", () => {
    describe("biggerThan", () => {
        it("should return false when aBc > Acc", () => {
            const node = new Node("aBc", 10);
            const node2 = new Node("Acc", 10);
            const result = node.biggerThan(node2.Key);
            expect(result).to.be.false;
        });

        it("should return true when Acc > aBc", () => {
            const node = new Node("aBc", 10);
            const node2 = new Node("Acc", 10);
            const result = node2.biggerThan(node2.Key);
            expect(result).to.be.true;
        });
    });
});