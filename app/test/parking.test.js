const expect = require("chai").expect
const parkingService = require("../parking");

describe("Parking Test", () => {
    
    afterEach(() => {
        parkingService.destroy();
    });

    it("should created a parking lot with provided capacity", () => {
        let result = parkingService.createParking(4);
        expect(result).equal("Created parking lot with 4 slots");
    });

    it("create function should be able to called once", () => {
        let r = parkingService.createParking(3);
        let dup = parkingService.createParking(3);
        expect(r).equal("Created parking lot with 3 slots");
        expect(dup).equal("Parking lot already created");
    });

    it("should park car to nearest slot", () => {
        parkingService.createParking(3);
        expect(parkingService.park("car_1")).equal(1);
    });

    it("should not return slot if parking is full", () => {
        parkingService.createParking(1);
        parkingService.park("car_1");
        expect(parkingService.park("car_2")).to.be.undefined;
    });

    it("should not return slot if vehicle is already present", () => {
        parkingService.createParking(1);
        parkingService.park("car_1");
        expect(parkingService.park("car_1")).to.be.null;
    });

    it("should return bill when a vehicle leaves", () => {
        parkingService.createParking(1);
        parkingService.park("car_1");
        let leave = parkingService.leave("car_1", 5);
        expect(leave).to.be.an("object");
        expect(leave.billAmount).equal(40);
    });

    it("should not return slot and bill if vehicle is not parked", () => {
        parkingService.createParking(1);
        parkingService.park("car_1");
        let leave = parkingService.leave("car_5", 5);
        expect(leave.slot).to.not.exist;
    });

});