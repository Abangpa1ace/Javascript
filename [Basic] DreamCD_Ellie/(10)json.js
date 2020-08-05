//JSON : JavaScript Object Notation

//1. Object to JSON : stringify(object)
//boolean
let json = JSON.stringify(true);
console.log(json);

//array
json = JSON.stringify(['apple','banana']);  //["apple","banana"](string화)
console.log(json);

//object
const rabbit = {
    name: 'tori',
    color: 'white',
    size: null,
    birthDate: new Date(),  //now
    jump: () => {                       //함수가 JSON에 포함되지 않음(미출력!)
        console.log(`${name} can jump!`);
    },
}
json = JSON.stringify(rabbit);
console.log(json);

json = JSON.stringify(rabbit, ['name']);
console.log(json);

json = JSON.stringify(rabbit, (key, value) => {     //callback 함수로 출력, 요소값 통제
    console.log(`key: ${key}, value: ${value}`);
    return key === 'name' ? 'ellie' : value;
})
console.log(json);

//2. JSON to Object : parse(json)
json = JSON.stringify(rabbit);
const obj = JSON.parse(json);
console.log(obj);
rabbit.jump();  //최초 object엔 함수가 있으나, json - object 변환과정에서 serialize 제외

console.log(rabbit.birthDate.getDate());    //Date object로 getDate 함수적용
console.log(obj.birthDate.getDate());       //string화 되어있어 getDate 함수 미적용
