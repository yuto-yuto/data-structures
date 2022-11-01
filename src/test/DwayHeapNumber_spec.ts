import "mocha";
import { expect } from "chai";
import { DwayHeapNumber, DwayHeapNumberOptimized } from "../dway_heap/DwayHeapNumber";

describe("DwayHeapNumber", () => {
    let instance: DwayHeapNumberOptimized;

    beforeEach(() => {
        instance = new DwayHeapNumberOptimized();
    });

    describe("push/pop", () => {
        context('No data', () => {
            it("should return undefined", () => {
                expect(instance.pop()).to.be.undefined;
            });
        });

        context('Data exists', () => {
            it("should return top value when having one element", () => {
                instance.push(2);
                expect(instance.pop()).to.equal(2);
            });

            it("should swap correctly when second one is bigger", () => {
                instance.push(2);
                instance.push(9);
                expect(instance.pop()).to.equal(9);
                expect(instance.pop()).to.equal(2);
            });

            it("should move the last value to top when 4th one is the biggest", () => {
                instance.push(2);
                instance.push(9);
                instance.push(4);
                instance.push(10);
                expect(instance.pop()).to.equal(10);
                expect(instance.pop()).to.equal(9);
                expect(instance.pop()).to.equal(4);
                expect(instance.pop()).to.equal(2);
            });

            it("should not swap between the leaf", () => {
                instance.push(2);
                instance.push(9);
                instance.push(4);
                instance.push(6);
                instance.push(8);
                expect(instance.pop()).to.equal(9);
                expect(instance.pop()).to.equal(8);
                expect(instance.pop()).to.equal(6);
                expect(instance.pop()).to.equal(4);
                expect(instance.pop()).to.equal(2);
            });

            it("should when branchFactor is 3", () => {
                instance = new DwayHeapNumberOptimized(3);
                instance.push(2);
                instance.push(9);
                instance.push(4);
                instance.push(6);
                instance.push(8);
                expect(instance.pop()).to.equal(9);
                expect(instance.pop()).to.equal(8);
                expect(instance.pop()).to.equal(6);
                expect(instance.pop()).to.equal(4);
                expect(instance.pop()).to.equal(2);
            });
        });
    });

    describe("remove", () => {
        it("should not restate after removing the last leaf", () => {
            instance.push(2);
            instance.push(9);
            instance.push(4);
            instance.push(6);
            instance.push(8);

            instance.remove(6);
            expect(instance.pop()).to.equal(9);
            expect(instance.pop()).to.equal(8);
            expect(instance.pop()).to.equal(4);
            expect(instance.pop()).to.equal(2);
        });
        it("should restate after removing top node", () => {
            instance.push(2);
            instance.push(9);
            instance.push(4);
            instance.push(6);
            instance.push(8);

            instance.remove(9);
            expect(instance.pop()).to.equal(8);
            expect(instance.pop()).to.equal(6);
            expect(instance.pop()).to.equal(4);
            expect(instance.pop()).to.equal(2);
        });

        it("should restate after removing middle node", () => {
            instance.push(2);
            instance.push(9);
            instance.push(4);
            instance.push(6);
            instance.push(8);

            instance.remove(8);
            expect(instance.pop()).to.equal(9);
            expect(instance.pop()).to.equal(6);
            expect(instance.pop()).to.equal(4);
            expect(instance.pop()).to.equal(2);
        });

        it("should restate when branchFactor is 3 (pushDown)", () => {
            instance.push(2);
            instance.push(9);
            instance.push(4);
            instance.push(6);
            instance.push(8);
            instance.push(7);
            instance.push(1);
            instance.push(3);

            instance.remove(8);
            expect(instance.pop()).to.equal(9);
            expect(instance.pop()).to.equal(7);
            expect(instance.pop()).to.equal(6);
            expect(instance.pop()).to.equal(4);
            expect(instance.pop()).to.equal(3);
            expect(instance.pop()).to.equal(2);
            expect(instance.pop()).to.equal(1);
        });
        it("should restate when branchFactor is 3 (bubbleUp)", () => {
            instance.push(90);
            instance.push(50);
            instance.push(70);
            instance.push(60);
            instance.push(30);
            instance.push(40);
            instance.push(10);
            instance.push(5);
            instance.push(65);

            instance.remove(30);
            expect(instance.pop()).to.equal(90);
            expect(instance.pop()).to.equal(70);
            expect(instance.pop()).to.equal(65);
            expect(instance.pop()).to.equal(60);
            expect(instance.pop()).to.equal(50);
            expect(instance.pop()).to.equal(40);
            expect(instance.pop()).to.equal(10);
            expect(instance.pop()).to.equal(5);
        });
    });

    describe("update", () => {
        it("should restate when updating top node to smaller value", () => {
            instance.push(2);
            instance.push(9);
            instance.push(4);
            instance.push(6);
            instance.push(8);

            instance.update(9, 1);
            expect(instance.pop()).to.equal(8);
            expect(instance.pop()).to.equal(6);
            expect(instance.pop()).to.equal(4);
            expect(instance.pop()).to.equal(2);
            expect(instance.pop()).to.equal(1);
        });

        it("should restate when updating a middle node to smaller value", () => {
            instance.push(2);
            instance.push(9);
            instance.push(4);
            instance.push(6);
            instance.push(8);

            instance.update(8, 1);
            expect(instance.pop()).to.equal(9);
            expect(instance.pop()).to.equal(6);
            expect(instance.pop()).to.equal(4);
            expect(instance.pop()).to.equal(2);
            expect(instance.pop()).to.equal(1);
        });

        it("should restate when updating a middle node to bigger value", () => {
            instance.push(2);
            instance.push(9);
            instance.push(4);
            instance.push(6);
            instance.push(8);

            instance.update(8, 10);
            expect(instance.pop()).to.equal(10);
            expect(instance.pop()).to.equal(9);
            expect(instance.pop()).to.equal(6);
            expect(instance.pop()).to.equal(4);
            expect(instance.pop()).to.equal(2);
        });

        it("should restate when updating a middle node multiple times", () => {
            instance.push(2);
            instance.push(9);
            instance.push(4);
            instance.push(6);
            instance.push(8);

            instance.update(8, 10);
            instance.update(10, 8);
            instance.update(8, 10);
            expect(instance.pop()).to.equal(10);
            expect(instance.pop()).to.equal(9);
            expect(instance.pop()).to.equal(6);
            expect(instance.pop()).to.equal(4);
            expect(instance.pop()).to.equal(2);
        });
    });

    describe("updateAll", () => {
        beforeEach(() => {
            instance.push(7);
            instance.push(4);
            instance.push(6);
            instance.push(4);
            instance.push(3);
            instance.push(1);
            instance.push(5);
            instance.push(2);
        });

        it("should restate correctly when updating 4 to 10", () => {
            instance.updateAll(4, 10);
            expect(instance.pop()).to.equal(10);
            expect(instance.pop()).to.equal(10);
            expect(instance.pop()).to.equal(7);
            expect(instance.pop()).to.equal(6);
            expect(instance.pop()).to.equal(5);
            expect(instance.pop()).to.equal(3);
            expect(instance.pop()).to.equal(2);
            expect(instance.pop()).to.equal(1);
        });

        it("should restate correctly when updating 4 to 1", () => {
            instance.updateAll(4, 1);
            expect(instance.pop()).to.equal(7);
            expect(instance.pop()).to.equal(6);
            expect(instance.pop()).to.equal(5);
            expect(instance.pop()).to.equal(3);
            expect(instance.pop()).to.equal(2);
            expect(instance.pop()).to.equal(1);
            expect(instance.pop()).to.equal(1);
            expect(instance.pop()).to.equal(1);
        });

        it("should restate correctly when branchFactor is 3", () => {
            instance = new DwayHeapNumberOptimized(3);
            instance.push(7);
            instance.push(4);
            instance.push(6);
            instance.push(4);
            instance.push(3);
            instance.push(1);
            instance.push(5);
            instance.push(2);
            instance.updateAll(4, 1);
            expect(instance.pop()).to.equal(7);
            expect(instance.pop()).to.equal(6);
            expect(instance.pop()).to.equal(5);
            expect(instance.pop()).to.equal(3);
            expect(instance.pop()).to.equal(2);
            expect(instance.pop()).to.equal(1);
            expect(instance.pop()).to.equal(1);
            expect(instance.pop()).to.equal(1);
        });
    });
});
