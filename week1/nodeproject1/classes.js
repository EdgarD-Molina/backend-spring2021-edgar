let firstName ="Charlotte";

let handmadeobject = {
    firstName : "danny",
    lastName : "molina",
    position : "student",
    location : "bay area",
    active : true,
    doWork: function () {
        console.log(this.firstName + " is now working" );
    }
};


class Employee {
    constructor (firstName, lastName, position, workplace) {
        // console.log("new object");
        this.sayHello();
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.location = workplace;
        this.active = false;
        this.energyHours = 16; // hours of energy
        this.checkValues();
    }

    checkValues() {
        if (!(typeof this.active === "boolean")) {
            console.log("This object has an improper active value!");
        }

        if (this.energyHours < 0) {
            this.energyHours = 0;
        }
            else if (this.energyHours >24) {
                this.energyHours = 24;
        }
    }

    sayHello() {
        console.log(`Hello, my name is ${this.firstName}. I work here as the ${this.position} at 
        ${this.location} . How are you today? `);
    }

    doWork(hours) {

        if (typeof hours != "number") {
            console.log("The value for hours is not valid. Use a number instead, please.");
            return;
        }

        if (this.energyHours - hours < 0) {
            console.log(`${this.firstName} does not have enough energy. They can only work for ${this.energyHours} hours `);

            hours = this.energyHours;
            this.energyHours = 0;
        } 
        
        else this.energyHours = this.energyHours - hours;

        console.log(` ${this.firstName} works for ${hours} hours. They have ${ this.energyHours }  hours left of energy`);
        // console.log(this.firstName + " works for " + hours + " hours.");  
    }

    goToSleep(hours) {

        if ( !( Number.isNaN( parseInt (hours) ) ) ) {
            hours = parseInt(hours);
        }
            else if (typeof hours != "number") {
            console.log("The value of hours is not valid. Cannot work.");
            return;

        
            }
        if (hours + this.energyHours > 24) {
            let maxSleep = 24 - this.energyHours;
            console.log(` ${this.firstName} goes to sleep for ${hours} hours.  `)
        }    
        this.energyHours = this.energyHours + hours;
        console.log(` ${this.firstName} goes to sleep for ${hours} hours. They have ${ this.energyHours } left of energy`);
        // console.log(this.firstName + " goes to sleep for " + hours + " hours.")    
    
    }
}

let myFirstFactoryObject = new Employee("danny", "molina", "student", "bay area");
let secondEmployee = new Employee("cool", "johnson", "clerk", "quick stop");



myFirstFactoryObject.doWork(22);
secondEmployee.doWork(4);

handmadeobject.doWork();

let thirdEmployee = new Employee("Charlotte", "Bishop", "owner", "RST Video");
thirdEmployee.doWork(14);

secondEmployee.goToSleep(2);

secondEmployee.checkValues();

let myNumber = 85;

let myString = "random stuff " + myNumber + "more text" ;

// let myStringLiteral = `Hello, my name is ${ thirdEmployee.firstName }, what can I help you find?`;

// console.log(myStringLiteral);
// console.log(myFirstFactoryObject, secondEmployee, thirdEmployee);