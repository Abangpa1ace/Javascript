'use strict';

//1-1. Class declaration
class Person {                  //class 명명
    constructor(name, age) {    //constructor(생성자) : 데이터 전달
        this.name = name;       //fields : 각 필드에 데이터 할당
        this.age = age;
    }
    speak() {
        console.log(`${this.name}: hello!`);    //methods
    }
}

//1-2. 새 Object 형성
const taeng = new Person('taeng', 28);
console.log(taeng.age);
taeng.speak();

//2. Getter & Setter : 조건부(User의 실수를 방어)
class User {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    get age() {         //age값을 _age에 받음(변수명 반드시 다르게 설정!)
        return this._age;
    }
    set age(value) {    //_age값 판단 : 음수는 0, 나머지는 value(value 필수!)
        this._age = value < 0 ? 0 : value;
    }
}

const user1 = new User('taehyung', 'Kim', -1);
console.log(user1.age);

//[최근,사용적음] 3. Public, Private Fields : 생성자 없이
class Experimet {
    publicfield = 2;    //외부접근 가능
    #privatefield = 1;  //외부접근 불가
}

const experiment = new Experimet();
console.log(experiment.publicfield);
console.log(experiment.privatefield);

//[최근,사용적음] 4. Static properties and methods
class Article {
    static publisher = 'Dream Coding';
    constructor(articleNum) {
        this.articleNu = articleNum;
    }
    static printPublisher() {
        console.log(Article.publisher);
    }
}

const article1 = new Article(1);
const article2 = new Article(2);
console.log(article1.publisher);    //static 값은 object에 지정되지 않음
console.log(Article.publisher);     //class에 지정됨(공통사항)
Article.printPublisher();

//5. Inheritance
class Shape {
    constructor(w,h,c) {
        this.width = w;
        this.height = h;
        this.color = c;
    }
    draw() {
        console.log(`drawing ${this.color} color of`);
    }
    getArea() {
        return this.width * this.height;
    }
}

class Rectangle extends Shape {}    //상속: extends로 기존 Class property & method를 땡겨옴
class Triangle extends Shape {
    getArea() {                     //다양성: Overwriting하여 각각 Class별 변화
        super.getArea();
        return (this.width * this.height) / 2;
    }
}

const rectangle = new Rectangle(20,20,'blue');
console.log(rectangle.getArea());
const triangle = new Triangle(20,20,'red');
console.log(triangle.getArea());

//6. Class checking: instanceOf - A instanceof B : A object가 B class로 형성됬는지 여부
console.log(rectangle instanceof Rectangle);    //t
console.log(triangle instanceof Rectangle);     //f
console.log(triangle instanceof Triangle);      //t
console.log(triangle instanceof Shape);         //t
console.log(triangle instanceof Object);        //t(모든 오브젝트)
