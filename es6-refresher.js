// 0. Modules — import/export splits code across files (see utils.js)
import { add, APP_NAME } from "./utils.js";
console.log("0. Modules:", APP_NAME, add(2, 3));

// 1. let/const — block-scoped, replaces var
const PI = 3.14159; // cannot be reassigned
let count = 0; // can be reassigned, but only exists inside its block
count += 1;
console.log("1. let/const:", PI, count);

// 2. Template literals — string interpolation, no more + concatenation
const name = "Rita";
console.log(`2. Template literal: Hello, ${name}! Count is ${count}.`);

// 3. Arrow functions — shorter syntax, no own `this`
function square(x) { return x * x; }
const squareArrow = (x) => x * x;
console.log("3. Arrow function:", squareArrow(5), "same as", square(5));

// 4. Destructuring — pull values out of objects/arrays by shape
const user = { username: "ritaghosnn", role: "intern" };
const { username, role } = user;
const [first, second] = [10, 20];
console.log("4. Destructuring:", username, role, first, second);

// 5. Spread / rest — expand or collect values
const base = [1, 2, 3];
const extended = [...base, 4, 5]; // spread: expand array into elements
console.log("5. Spread:", extended);

function sum(...nums) { // rest: collect args into an array
  return nums.reduce((total, n) => total + n, 0);
}
console.log("5. Rest:", sum(1, 2, 3, 4));

// 6. Array methods — map/filter/reduce (used constantly with API data)
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
const evens = numbers.filter((n) => n % 2 === 0);
const total = numbers.reduce((acc, n) => acc + n, 0);
console.log("6. map/filter/reduce:", doubled, evens, total);

// 7. Promises & async/await — how you'll handle DB calls and API requests
function delayedGreeting(who) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Hello, ${who} (after a delay)`), 500);
  });
}

async function runAsyncDemo() {
  const message = await delayedGreeting("intern-project");
  console.log("7. async/await:", message);
}

runAsyncDemo();
