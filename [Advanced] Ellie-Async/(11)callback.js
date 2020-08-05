'use strict';

// JavaScript is synchronous.(동기적)
// hoisting : var, function declaration 이 가장 윗순서로

console.log('1');
setTimeout(function () {console.log('2');}, 1000);  //1000ms = 1초
console.log('3');

//Synchronous callback
function printImmeadiately(print) {     //함수의 선언은 맨 위로(hoisting)
    print();
}
printImmeadiately(()=>console.log('hello'));

//Asynchronous callback
function printWithDelay(print, timeout) {
    setTimeout(print, timeout);
}
printWithDelay(()=>console.log('hello2'), 1000);

//Callback Hell : 가독성 낮음(코드일기 및 로직이해 어려움)
class UserStorage {
    loginUser(id, pw, onSuccess, onError) {             //API1
        setTimeout(() => {
            if (
                (id === 'ellie' && pw === 'dream') ||
                (id === 'coder' && pw === 'academy') 
            ) {
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            }
        }, 2000);
    }

    getRoles(user, onSuccess, onError) {                //API2
        setTimeout(() => {
            if (user === 'ellie') {
                onSuccess({name: 'ellie', role: 'admin'});
            } else {
                onError(new Error('no access'));
            }
        }, 1000);
    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const pw = prompt('enter your pw')
userStorage.loginUser(
    id, 
    pw, 
    user => {
        userStorage.getRoles(
            user, 
            userWithRole => {
                alert(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role.`)
            },
            error => {console.log(error)},);
    }, 
    error => {console.log(error)});
