//Operators(연산자)
//1. string concatenation(연쇄)
console.log("my" + "cat");
console.log("1" + 2);
console.log(`string literals : 1 + 2 = ${1 + 2}`);

//2. numeric operators
console.log(1 + 1);
console.log(1 - 1);
console.log(1 / 1);
console.log(1 * 1);
console.log(5 % 2);
console.log(2 ** 3);

//3. Increment & Decrement operators
let counter = 2;
const Inc = ++counter; //1) counter = counter + 1; 2) Inc = counter;
console.log(`Inc: ${Inc}, counter: ${counter}`);
const Inc2 = counter++; //1) Inc2 = counter; 2) counter = counter + 1;
console.log(`Inc: ${Inc}, counter: ${counter}`);

//4. Assignment operators(할당)
let x = 3;
console.log(x, (x += 1));
console.log(x, (x -= 1));
console.log(x, (x *= 3));
console.log(x, (x /= 6));

//5. Comparison operators
console.log(10 < 6);
console.log(10 <= 6);
console.log(10 > 6);
console.log(10 >= 6);

//6. Logical operators : ||(or), &&(and), !(not)
const val1 = true;
const val2 = 4 < 2;

// ||(or) : true를 찾으면 바로 종료
console.log(`or : ${val1 || val2 || check()}`);

// &&(and) : false, null를 찾으면 바로 종료
console.log(`and : ${val1 && val2 && check()}`);

function check() {
  for (let i = 0; i < 10; i++) {
    console.log("hi");
  }
  return true;
}

//7. Equality
const strfive = "5";
const numfive = 5;

console.log(strfive == numfive); //type conversion
console.log(strfive != numfive);

console.log(strfive === numfive); //no type conversion
console.log(strfive !== numfive);

const el1 = { name: "ellie" };
const el2 = { name: "ellie" };
const el3 = el1;
console.log(el1 == el2);
console.log(el1 === el2);
console.log(el1 == el3);
console.log(el1 === el3);

console.log("!Quiz!");
console.log(0 == false);
console.log(0 === false);
console.log("" == false);
console.log("" === false);
console.log(null == undefined);
console.log(null === undefined);

//8. conditional operators : if, else if, else
const name = "taeng";
if (name === "taeng") {
  console.log("true!");
} else if (name === "bum") {
  console.log("bum?");
} else {
  console.log("who are you?");
}

//9. Ternary operator : ? - condition ? val1 : val2;
console.log(name === "taeng" ? "yes!" : "no");

//10. Switch statement : multiple checks
const browser = undefined;
switch (browser) {
  case "IE":
    console.log("go away!");
    break;
  case "Chrome":
  case "Firefox":
    console.log("love you!");
    break;
  default:
    console.log("same all!");
    break;
}

//11. Loops
//while : while the condition is truthy, the block code is executed.
let i = 3;
while (i > 0) {
  console.log(`while : ${i}`);
  i--;
}

//do : block code is executed first, and chek the condition.
let j = 3;
do {
  console.log(`do : ${j}`);
  j--;
} while (j > 0);

//for : for(begin; condition; step)
for (k = 3; k > 0; k--) {
  //inline variable declaration
  console.log(`for :  ${k}`);
}

//nested loop(for map?)
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    console.log(i, j);
  }
}
