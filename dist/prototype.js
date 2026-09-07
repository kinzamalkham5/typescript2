"use strict";
// Har normal JavaScript object ke peeche ek hidden object hota hai jise hum prototype kehte hain.
// const person = {
//   name: "Ali"
// };
// console.log(person.toString());
// --------------------------------
// 2. __proto__ kya hai?
// __proto__ kisi object ke actual prototype ko access karne ka old-style way hai.
// const person = {
//   name: "Ali"
// };
// console.log(person.__proto__);
// ------------------------------
// dono ka main diff ------proto---ye obj ka prototype h  
//  (prtotype)Ye mainly constructor functions/classes ke saath related hota hai.
// ------------------------------------
// 3. Object.create() se hum directly kisi object ko doosre object ka prototype bana sakte hain.
// const person = {
//   greet() {
//     console.log("Hello!");
//   }
// };
// const student = Object.create(person);
// student.greet();
// example 2
// const animal = {
//   eat() {
//     console.log("Animal is eating");
//   }
// };
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Person_age;
// const dog = Object.create(animal);
// dog.bark = function () {
//   console.log("Woof!");
// };
// dog.eat();
// dog.bark();
// -------------------------------
// 4. ES6 class
// Ab JavaScript ne classes ka cleaner syntax provide kiya:
// class Person {
//   constructor(name) {
//     this.name = name;
//   }
//   sayHello() {
//     console.log(`Hello, I am ${this.name}`);
//   }
// }
// -------------------------
// 5. extends — inheritance
// Agar Student, Person se inherit kare:
// class Person {
//   constructor(name) {
//     this.name = name;
//   }
//   sayHello() {
//     console.log(`Hello ${this.name}`);
//   }
// }
// class Student extends Person {
//   study() {
//     console.log("Studying...");
//   }
// }
// ------------------
// 6. super()
// super() parent class ka constructor call karta hai.
// class Person {
//   constructor(name) {
//     this.name = name;
//   }
// }
// class Student extends Person {
//   constructor(name, rollNo) {
//     super(name);
//     this.rollNo = rollNo;
//   }
// }
// --------------------------
// 7. super.method()
// super sirf constructor ke liye nahi hota.
// Parent ka method bhi call kar sakte ho:
// class Person {
//   sayHello() {
//     console.log("Hello from Person");
//   }
// }
// class Student extends Person {
//   sayHello() {
//     super.sayHello();
//     console.log("Hello from Student");
//   }
// }
class Person {
    constructor(name, age) {
        this.name = name;
        _Person_age.set(this, void 0);
        __classPrivateFieldSet(this, _Person_age, age, "f");
    }
    getAge() {
        return __classPrivateFieldGet(this, _Person_age, "f");
    }
    sayHello() {
        return `Hello, my name is ${this.name}`;
    }
    static getType() {
        return "Human";
    }
}
_Person_age = new WeakMap();
class Student extends Person {
    constructor(name, age, rollNo) {
        super(name, age);
        this.rollNo = rollNo;
    }
    getInfo() {
        return `${this.name} | Age: ${this.getAge()} | Roll No: ${this.rollNo}`;
    }
}
const student = new Student("Ali", 20, 101);
const output = document.getElementById("output");
output.innerHTML = `
    <h2>${student.name}</h2>
    <p>${student.sayHello()}</p>
    <p>${student.getInfo()}</p>
    <p>Type: ${Person.getType()}</p>
`;
