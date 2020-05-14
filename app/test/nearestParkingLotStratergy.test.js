const expect = require("chai").expect;
const parkingLot = require("../parkingLot/nearestParkingLotStatergy");

describe("Nearest Parking Stratergy Test", () => {
    it("adding slots should increase the size", () => {
        let lot = new parkingLot();
        lot.addSlot(1);
        lot.addSlot(2);
        expect(lot.getSlotCount()).equal(2);
    });

    it("adding duplicate slot should not increase size", () => {
        let lot = new parkingLot();
        lot.addSlot(1);
        lot.addSlot(1);
        expect(lot.getSlotCount()).equal(1);
    });

    it("after getting slot size should be descreased", () => {
        let lot = new parkingLot();
        lot.addSlot(1);
        lot.addSlot(2);
        lot.getSlot();
        expect(lot.getSlotCount()).equal(1);
    });

    it("should return null if no empty slot", () => {
        let lot = new parkingLot();
        lot.addSlot(1);
        lot.addSlot(2);
        lot.getSlot();
        lot.getSlot();
        expect(lot.getSlot()).to.be.undefined;
        expect(lot.getSlotCount()).equal(0);
    });

    it("should return nearest empty slot", () => {
        let lot = new parkingLot();
        lot.addSlot(1);
        lot.addSlot(2);
        expect(lot.getSlot()).equal(1);
    });

    it("should return nearest empty slot after it is added again", () => {
        let lot = new parkingLot();
        lot.addSlot(1);
        lot.addSlot(2);
        lot.getSlot();
        lot.addSlot(3);
        lot.addSlot(1);
        expect(lot.getSlot()).equal(1);
    });

    it("calling clear should clear the lot", () => {
        let lot = new parkingLot();
        lot.addSlot(1);
        lot.addSlot(2);
        lot.clear();
        expect(lot.getSlotCount()).equal(0);
    });
})