'use strict';

//Array

//1. Declaration
const arr1 = new Array();
const arr2 = [1,2];

//2. Index Position
const fruits = ['apple','banana'];
console.log(fruits);
console.log(fruits[1]);

//3. Looping
for (let fruit of fruits) {
    console.log(fruit);
}

fruits.forEach(function(fruit, index, array) {
    console.log(fruit, index)
});

fruits.forEach((fruit) => console.log(fruit));

//4. Addition, Deletion, Copy
//push : add to the end
fruits.push('grape', 'lemon');
console.log(fruits);
//pop : remove from the end
fruits.pop();
console.log(fruits);

//uhshift : add to the begin
fruits.unshift('peach');
console.log(fruits);
//shift : remove from the begin
fruits.shift();
console.log(fruits);

//splice : remove in the middle
fruits.push('peach', 'lemon');
console.log(fruits);
fruits.splice(1, 1);    //splic(x,y) : x 인덱스부터 y개를 지움
console.log(fruits);
fruits.splice(1,1,'cherry','melon');    //지워진 위치에 새로 추가
console.log(fruits);

//concat : combine two arrays
const fruits2 = ['mango', 'watermelon'];
const allFruits = fruits.concat(fruits2);
console.log(allFruits);

//5. Searching : find the index
//indexOf
console.log(fruits.indexOf('apple'));
//includes
console.log(fruits.includes('mango'));
//lastIndexOf
fruits.push('apple');
console.log(fruits);

