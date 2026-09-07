"use strict";
// Execution Context = woh environment jahan JavaScript code execute hota hai.
// var name = "Ali";
// function greet() {
//   console.log("Hello");
// }
// greet();
// name kahan hai?
// greet function kahan hai?
// variables ki values kya hain?
// current code kis scope mein execute ho raha hai?
// In sab cheezon ko manage karne ke liye Execution Context use hota hai.
// --------------------------
// tow main phase execution and cretion phase(jhan code execute nhi horha hota)
// ---------------------------
// execuion phase
// console.log(a);
// var a = 10;
// console.log(a);(undefine)
// ---------
// creation phase
// console.log(a);
//  a = 10;
// console.log(a);(10)
// --------------
// hosting
// ---------------
// JavaScript code run karne se pehle declarations ko memory/environment mein register kar leta hai.
// var   → hoisted → undefined
// let   → hoisted → TDZ
// const → hoisted → TDZ
// function declaration → hoisted → directly callable
// sayHello();
// function sayHello() {
//     console.log("Hello");
// }
// --------------------
// environment
// --------------------
// its mean k aik box js m jhan variable function sab hota 
// let name ="ali";
// var age=20;
// ---------------------------
// lexical(Ek aisa environment jo variables ko unke scope ke saath store karta hai.)
// let name = "Ali";
// function test() {
//     let age = 20;
//     console.log(name);
//     console.log(age);
// }
// ---------------
// scops
// -----------
// let x=10;(global scope)
// function outer(){
//     let y=30;
//     function inner(){
//         let z=40;
// console.log(x);
//         console.log(y);
//         console.log(z);
//     }
//     inner();
// }
// Temporal Dead Zone woh period hai jahan let ya const variable scope mein exist karta hai, 
// lekin usko access nahi kar sakte — jab tak uski declaration execute nahi ho jati.
// var TDZ M NHI HOTA
// console.log(name); //  ReferenceError
// let name = "Ali";
const creationBtn = document.getElementById("creationBtn");
const executionBtn = document.getElementById("executionBtn");
const resetBtn = document.getElementById("resetBtn");
const phaseTitle = document.getElementById("phaseTitle");
const phaseDescription = document.getElementById("phaseDescription");
const aValue = document.getElementById("aValue");
const bValue = document.getElementById("bValue");
const cValue = document.getElementById("cValue");
const greetValue = document.getElementById("greetValue");
const tdzText = document.getElementById("tdzText");
const consoleBox = document.getElementById("console");
creationBtn.addEventListener("click", () => {
    phaseTitle.textContent = "Creation Phase";
    phaseDescription.textContent =
        "JavaScript execution se pehle environment prepare karta hai.";
    aValue.textContent = "undefined";
    bValue.textContent = "uninitialized";
    cValue.textContent = "uninitialized";
    greetValue.textContent = "function";
    tdzText.textContent =
        "let aur const TDZ mein hain.";
    consoleBox.innerHTML = `
    <p>Creation phase complete...</p>
    <p>var a → undefined</p>
    <p>let b → uninitialized</p>
    <p>const c → uninitialized</p>
    <p>greet → function</p>
  `;
});
executionBtn.addEventListener("click", () => {
    phaseTitle.textContent = "Execution Phase";
    phaseDescription.textContent =
        "JavaScript ab code ko line by line execute kar raha hai.";
    aValue.textContent = "10";
    bValue.textContent = "20";
    cValue.textContent = "30";
    greetValue.textContent = "executed";
    tdzText.textContent =
        "TDZ khatam. Variables ab accessible hain.";
    consoleBox.innerHTML = `
    <p>undefined</p>
    <p>a = 10</p>
    <p>b = 20</p>
    <p>c = 30</p>
    <p>Hello</p>
  `;
});
resetBtn.addEventListener("click", () => {
    phaseTitle.textContent = 'Click "Creation Phase"';
    phaseDescription.textContent =
        "See what JavaScript prepares before executing the code.";
    aValue.textContent = "?";
    bValue.textContent = "?";
    cValue.textContent = "?";
    greetValue.textContent = "?";
    tdzText.textContent =
        "b and c are waiting for initialization.";
    consoleBox.innerHTML = `
    <p>Waiting...</p>
  `;
});
