'use strict';

//Promise is a JavaScript object for asynchronous operation.(callback 대신)
//1) state: pending(진행중) -> fullfilled(완료) or rejected
//2) Producer vs Consumer

//1. Producer
//* when new Promis is created, the executor runs automatically.
const promise = new Promise((resolve, reject) => {
    //doing something heavy work(network, read files)
    console.log('doing something....');
    setTimeout(() => {
        resolve('ellie');       //callback(2초)
        //reject(new Error('no network'));
    },2000);
});

//2. Consumer: then, catch, finally 
promise.then((value) => {  //정상호출(resolve)
console.log(value);
})
promise.catch(error => {  //에러호출(reject)
    console.log(error);
})
.finally(() => {    //성공&실패 관계없이 호출
console.log('Finally');
});

//3. Promise Chaning
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

fetchNumber
.then(num => num * 2)   //then은 다른 비동기도 호출 가능
.then(num => num * 3)
.then(num => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>resolve(num-1), 2000);
    })
})
.then(num => console.log(num))

//4. Error Handling
const getHen = () => 
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('닭'), 1000);
    });

const getEgg = hen =>
    new Promise((resolve, reject) => {
        setTimeout(()=> reject (new Error (`${hen} => 달걀`)), 1000);
    });

const cook = egg =>
    new Promise((resolve, reject) => {
        setTimeout(()=> resolve(`${egg} => fri`), 1000);
    });

getHen() //
.then(hen => getEgg(hen))
.catch(error => {return '빵';})
.then(cook)     //.then(egg => cook(egg)) 한 변수만 받아오기에 좌우 생략가능
.then(meal => console.log(meal));