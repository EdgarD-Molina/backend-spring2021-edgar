const { transform } = require("lodash");

class Vehicle {
   constructor(make, model, year, mileage, topSpeedMPH) {
        this.make= make;
        this.model = model;
        if (typeof year!=="number") {
            console.log("The year value is invalid. Please use a number value")
        }
        this.year = year;
        this.lastService = new Date();
        this.mileage = mileage;
        this.topSpeedMPH = topSpeedMPH;    
    }
    service() {
        console.log("Fixing vehicle");
    }

}


class Bicycle extends Vehicle {
    constructor(make, model, year, type, mileage, serial, gears) {
        super(make, model, year, mileage, null);
        this.type = type;
        this.serial= serial;
        this.gears = gears;
    }

    service() {
        console.log("fixing bike");
    }
}


class ElectricBicyle extends Bicycle {
    constructor(make, model, year, type, mileage, serial, gears, kWh, topSpeedMPH) {
        super(make, model, year, type, mileage, serial, gears);
        this.kWh = kWh;
        this.topSpeedMPH = topSpeedMPH;
    }
    service() {
        console.log("fixing ebike");
    }
}


class ElectricCar extends Vehicle {
    constructor(make, model, year, type, empg, mileage, kWh, topSpeedMPH, vin) {
        super (make, model, year, mileage, topSpeedMPH);
        this.type = type;
        this.empg = empg;
        this.kWh = kWh;
        this.vin = vin;
        this.currentCharge
    }
}    


class Car extends Vehicle {
    constructor(make, model, year, type, vin,  mileage, topSpeedMPH, mpg, tankSize) {
        super(make, model, year, mileage, topSpeedMPH);
        this.type = type; 
        this.vin = vin;
        this.mpg = mpg;
        this.tankSize = tankSize; 
        this.currentFuel = tankSize;
    }


    travel(miles) {

        let fuelUsage = miles / this.mpg;

        if (miles > this.currentFuel * this.mpg) {
            console.log(`Cannot go that far. Traveled ${this.currentFuel * this.mpg} miles instead. Unfortunately the fuel tank is empty now.`);

            fuelUsage = this.currentFuel;
            miles = this.currentFuel * this.mpg;
        }

        this.currentFuel = this.currentFuel - fuelUsage;
        this.mileage = this.mileage + miles;

        console.log(`The ${this.make} ${this.model} goes on a ${miles} mile long trip.`);
    }


    refuel(gallons) {
        let freeSpace = this.tankSize - this.currentFuel;
        if (gallons > freeSpace) {
            console.log(`That is too much fuel. Topped off car tank instead. The ${this.make} ${this.model} was filled with ${freeSpace} gallons of gas. `);

            gallons = freeSpace;
        }
            this.currentFuel = this.currentFuel + gallons;
            console.log(`${this.make} ${this.model} was filled up with ${gallons} of gas.`);
    }


    getFuel() {
    console.log(` ${this.make + " " + this.model} has ${this.currentFuel} gallons of gas. `);
    }
}



let car1 = new Car("Subaru", "Forrester", 2017, "SUV", "1C54S7468NX1", 123456, 120, 30, 35);
console.log(car1);
car1.travel(80);
car1.refuel(100);
car1.travel(140);
console.log(car1);
car1.refuel(2);
console.log(car1);



let car2 = new ElectricCar("Tesla", "S", 2016, "Sedan", 112, 123456, 100, 135, "5X4568C463");
console.log(car2);



let bike1 = new Bicycle("Schwinn", "Stingray", 2003, "cruiser", "20123", "Serial 123456", "fixed", 12);
console.log(bike1);



let ebike = new ElectricBicyle ("Kona" , "Unit", 2014, "mountain", 2000, "asdfjkl", 12, 1.4, 30);
console.log(ebike);



let car3 = new Car("Kia", "Sorento", 2011, "SUV", "2938jhfewfe980", 135000, 120, 24, 18);
console.log(car3);
car3.travel(200);
car3.getFuel(30);
car3.travel(10);
car3.getFuel(20);
car3.refuel(2);
car3.getFuel(10);
car3.service();