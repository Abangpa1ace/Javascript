//Objects

//1. Literals and properties
const taeng = { name: "taeng", age: 28, home: "bucheon" }; //'Object Literal' syntax
const taeng2 = new Object(); //'Object Constructor' syntax(class활용)

function print(person) {
  console.log(person.name);
  console.log(person.home);
}
print(taeng);

taeng.hasJob = true; //런타임 추가가능(동적인 언어)
console.log(taeng);
delete taeng.home; //런타임 삭제가능
console.log(taeng);

//2. Computed properties(개선 속성)
console.log(taeng.name);
console.log(taeng["name"]); //key의 value를 받아올 때 유용함

//3. Property value shorthand
const person1 = { name: "bob", age: 2 };
const person2 = { name: "steve", age: 3 };
const person3 = { name: "dave", age: 4 };
const person4 = makePerson("taeng", 28); //새로운 object 추가방법
console.log(person4);
function makePerson(name, age) {
  return {
    name, //shorthand
    age,
  };
}

//4. Constructor Function
function Person(name, age) {
  //class(template) 이전 object 생성(class 제외 구성동일)
  this.name = name;
  this.age = age;
}

//5. in operator : operater 유무검사
console.log("age" in taeng);
console.log("company" in taeng);

//6. for..in & for..of
//for (key in object)
for (key in taeng) {
  console.log(key);
}
//for (value of iterable)
const array = [1, 2, 4, 5]; //배열 요소출력(for문)
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

for (value of array) {
  //배열 요소출력(for-of)
  console.log(value);
}

//7. Cloning
const user1 = { name: "ellie", age: "20" };
const user2 = user1; //Cloning
user2.name = "coder";
console.log(user1);

//old way
const user3 = {}; //빈 object 생성
for (key in user1) {
  user3[key] = user1[key];
}
console.log(user3);

//new way : Object.assign
const user4 = Object.assign({}, user1);
console.log(user4);
//another example
const fruit1 = { color: "red" };
const fruit2 = { color: "blue", size: "big" };
const mixed = Object.assign({}, fruit1, fruit2); //뒤에 properties가 기존 내용 덮어씀!
console.log(mixed);
