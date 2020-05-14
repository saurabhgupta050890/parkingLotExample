const ParkingLot = require("./parkingLot");

class NearestParkingLotStatergy extends ParkingLot {
    constructor() {
        super();
    }

    addSlot(i) {
        if (!this.slotSet.has(i)) {
            this.slotSet.add(i);
            this.slots.push(i);
            this.slots = this.slots.sort();
        }
    }

    getSlot() {
        let slot = this.slots.shift();
        this.slotSet.delete(slot);
        return slot;
    }

    getSlotCount() {
        return this.slots.length;
    }

    clear() {
        this.slotSet.clear();
        this.slots = [];
    }
}

module.exports = NearestParkingLotStatergy;