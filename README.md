### Program Description

Program to implemet a basic parking log solution in `Node.js`. 
This is a command line application and certain commands needs to be provided for operation

### Setup and Tests

In the root directory

-  `bin/setup`: This command will initiate setup and run unit test cases

### How to run the program

Program can run in a couple of ways:

- `bin/parking_lot <path_to_input_file>`: This will execute all the commands in the from the input file. Input file must contain list of valid commands separated by line breaks

- `bin/parking_lot`: This will start an interactive command line program where valid commands can be executed. User can execute a command by pressing return after typing valid command and arguments

**Note:** Program will exit if an invalid command or invalid number of arguments to a command are provided

### List of Commands

- `create_parking_lot <capacity>`: Creates a parking lot with provided capacity
- `park <vehicle_no>`: Allocates a free parking lot to the provided vehicle_no
- `leave <vehicle_no> <hours>`: Frees up the parking lot allocated to the vehicle and prints the total bill
- `status`: Prints the current status of the parking lot
- `exit`: Closes the program
- `help`: Prints the help document

### Assumptions

- A Nearest Parking Spot stratergy is applied by default
- A customer parks at the alloted spot




