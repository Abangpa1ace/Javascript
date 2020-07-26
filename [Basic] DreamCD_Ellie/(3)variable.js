//for Vanila Javascript
"use strict";

//variables

//let : 변수 선언(ES6)
let name = "ttaeng";
console.log(name);

name = "hello";
console.log(name);
// 이전엔 var를 씀. block scope 불가 + hoisting(선언이 위로 올라가는 현상) -> 정교함X

//Block Scope : {} 안의 내용을 밖에서 인식 불가
{
  let name = "ttaeng";
  console.log(name);

  name = "hello";
  console.log(name);
}

name = "nono";

//global 변수 : block scope 상관없이 인식
let globalname = "global name";

//Contants : 변수 선언(불변,immutable)
const weekday = 7;
const maxnum = 5;

//Variable types(모든 프로그래밍 언어는 2가지)
//1. primitive, single item : number, string, boolean, null, undefiend, symbol
//2. object, box container
//3. function, first-class function(지원)

//number : 숫자 type
const count = 17; //integer
const size = 17.1; //decimal
console.log(`value: ${count}, type: ${typeof count}`); //작은따옴표 아님, `
console.log(`value: ${size}, type: ${typeof size}`);

const infinity = 1 / 0; //무한대
const negativeInfinity = -1 / 0; //음의 무한대
const nAn = "not a number" / 2; //숫자가 아님
console.log(infinity);
console.log(negativeInfinity);
console.log(nAn);

//string : 글자 type
const char = "c";
const taeng = "taeng";
const greeting = "hello" + taeng;
console.log(`value: ${greeting}, type: ${typeof greeting}`);
const helloBob = `hi ${taeng}!`; //template literals(string)
console.log(`value: ${helloBob}, type: ${typeof helloBob}`);

//boolean : true/false type
//false : 0, null, undefined, NaN, ''
//true : any other value
const tru = true;
const fal = 3 < 1;
console.log(`value:${tru}, type:${typeof tru}`);
console.log(`value:${fal}, type:${typeof fal}`);

//null(object) : 없는 값
let nothing = null;
console.log(`value:${nothing}, type:${typeof nothing}`);

//undefined : 선언안한 값
let x;
console.log(`value:${x}, type: ${typeof x}`);

//symbol : create unique identifiers for objects
const symbol1 = Symbol("id");
const symbol2 = Symbol("id");
console.log(symbol1 === symbol2); //두 식별자 symbol은 다름(고유)

const gsymbol1 = Symbol.for("id");
const gsymbol2 = Symbol.for("id");
console.log(gsymbol1 === gsymbol2); //두 식별자를 .for로 같게 함

console.log(
  `value: ${symbol1.description}, type: ${typeof symbol1.description}`
); //symbol은 그대로 출력 시 error : .description(string화)

//object, real-life object, data structure
const tangu = { name: "taehyung", age: 20 }; //값의 집합(box)
tangu.age = 28; //const 선언해도 내부요소는 변경가능(let)

//Dynamic Typing: dynamically typed language
//* 변수타입을 최초 선언하지 않음, 런타임에서 설정됨. → Typescript 필요한 이유
let text = "hello";
console.log(text.charAt(0)); //첫글자 h만 출력
console.log(`value: ${text}, type: ${typeof text}`);
text = 1;
console.log(`value: ${text}, type: ${typeof text}`);
text = "7" + 5; //5를 string으로 변환 → 75!
console.log(`value: ${text}, type: ${typeof text}`);
text = "8" / "2"; //8, 2를 number로 변환 → 4!
console.log(`value: ${text}, type: ${typeof text}`);
console.log(text.charAt(0));
