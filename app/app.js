const parkingService = require("./parking");
const filePath = process.argv[2];
const fs = require("fs");

let appCommands = {
    create_parking_lot: {
        message: "Creates a parking lot with provided capacity",
        args: 1,
        execute: (...args) => parkingService.createParking(args[0])
    },
    park: {
        message: "Allocates a parking space to a vehicle",
        args: 1,
        execute: (...args) => parkingService.park(args[0]),
        processResult: (slot) => !!slot ? `Allocated slot number: ${slot}` : `Sorry, parking lot is full`
    },
    leave: {
        message: "Deallocates a parking space and calculates bill based on duration",
        args: 2,
        execute: (...args) => parkingService.leave(args[0], args[1]),
        processResult: (result) => !!result.slot ? `Registration number ${result.vehicle} with Slot Number ${result.slot} is free with Charge ${result.billAmount}` : `Registration number ${result.vehicle} not found`
    },
    status: {
        message: "Prints the current status of parking lot",
        args: 0,
        execute: () => parkingService.getStatus(),
        processResult: (parkingMap) => {
            let slots = Array.from(parkingMap.entries())
                .sort((a, b) => a[1] - b[1])
                .map(x => {
                    let spaces = 12 - x[1].toString().length + 1;
                    return `${x[1]}${Array(spaces).join(" ")}${x[0]}`
                });
            let formatedResult = [`Slot No.${Array(5).join(" ")}Registration No.`]
            return formatedResult.concat(slots).join("\n");
        }
    },
    exit: {
        message: "Exits the program",
        args: 0,
        execute: () => process.exit()
    },
    help: {
        message: "Prints the help document",
        args: 0,
        execute: () => {
            Object.keys(appCommands).forEach(x => {
                console.log(`${x} ${appCommands[x].args > 0 ? `<args>` : ``} : ${appCommands[x].message}`);
            });
        }
    }
}

const processCommand = (com) => {
    com = com.split(" ");
    let commandName = com[0];
    let command = appCommands[commandName];
    let isValidCommand = command !== undefined ? (command.args > 0 ? com.length > 1 : true) : false;
    if (isValidCommand) {
        com.shift();
        let result = command.execute(...com);
        if (command.processResult) {
            console.log(command.processResult(result));
        } else {
            console.log(result);
        }
    } else {
        // Invalid command
        console.log(`Invalid command ${commandName}`);
        process.exit();
    }
}

if (filePath) {
    // Commands will be read from a file
    try {
        const stream = fs.createReadStream(filePath, { encoding: 'utf8' });
        stream.on("data", (data => {
            let commands = data.split("\n");
            commands.forEach(com => {
                processCommand(com);
            })
        }));

        stream.on("error", (err) => {
            console.error("Error occured while reading file", err);
        });

        stream.on("end", () => {
            //console.log("END");
        });
    } catch (e) {
        console.error(e);
    }
} else {
    // Get commands from console
    console.log("Welcome to parking lot system.\nYou can enter commands from following list to interact with system");
    console.log(appCommands.help.execute());
    let stdin = process.openStdin();
    stdin.on("data", (input) => {
        input = input.toString().trim();
        processCommand(input);
    });
}