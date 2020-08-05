//Q1
const fruits = ['apple', 'banana', 'orange'];
console.log(fruits.join(' '));

//Q2
const fruits2 = 'apple, kiwi, banana, cherry'
console.log(fruits2.split(','));

//Q3
const array = [1,2,3,4,5];
console.log(array.reverse());

//Q4
const array2 = [1,2,3,4,5];
console.log(array2.slice(2));

class Student {
    constructor(name, age, enrolled, score) {
        this.name = name;
        this.age = age;
        this.enrolled = enrolled;
        this.score = score;
    }
}
const students = [
    new Student('A',29,true,45),
    new Student(),
    new Student(),
    new Student(),
    new Student(),
]