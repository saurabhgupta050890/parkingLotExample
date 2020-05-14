const NearestParkingLotStatergy = require("./parkingLot/nearestParkingLotStatergy");
const hourlyBillingStratergy = require("./billing/hourlyBilling");

let parkingLotMap = new Map();
const parkingLot = new NearestParkingLotStatergy();

const getBill = (hours, billingStratergy) => billingStratergy(hours);

const createParking = (capacity) => {
    if (parkingLotMap.size > 0 || parkingLot.getSlotCount() > 0) {
        return "Parking lot already created";
    }

    for (let i = 1; i <= capacity; i++) {
        parkingLot.addSlot(i);
    }

    return `Created parking lot with ${parkingLot.getSlotCount()} slots`;
}

const park = (vehicle) => {
    if (parkingLotMap.has(vehicle)) {
        return null;
    }
    
    let slot = parkingLot.getSlot();
    if (slot) {
        parkingLotMap.set(vehicle, slot);
    }

    return slot;
}

const leave = (vehicle, hours) => {
    let slot = parkingLotMap.get(vehicle);
    if (slot) {
        let billAmount = getBill(hours, hourlyBillingStratergy); //Calculate Bill based on billing stratergy
        parkingLotMap.delete(vehicle); //Update remove vehicle from parking
        parkingLot.addSlot(slot); //Add parking lot to free slots 
        return {
            slot,
            billAmount,
            vehicle
        }
    } else {
        return {
            vehicle
        }
    }
}

const getStatus = () => parkingLotMap;

const destroy = () => {
    parkingLotMap.clear();
    parkingLot.clear();
}

module.exports = {
    park,
    leave,
    getStatus,
    createParking,
    destroy
}