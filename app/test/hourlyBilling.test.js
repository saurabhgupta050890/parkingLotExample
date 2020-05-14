const expect = require("chai").expect;
const hourlyBilling = require("../billing/hourlyBilling");

describe("Hourly Billing Test", () => {
    it("should return 10 if hours are less then 2", () => {
        expect(hourlyBilling(1)).to.equal(10);
    });

    it("should return 10 if hours are equal to 2", () => {
        expect(hourlyBilling(2)).to.equal(10);
    });

    it("should return 20 if hours equal to 3", () => {
        expect(hourlyBilling(3)).to.equal(20);
    });

    it("should return 50 if hours equal to 6", () => {
        expect(hourlyBilling(6)).to.equal(50);
    });
})