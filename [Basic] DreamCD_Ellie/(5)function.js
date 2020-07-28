// 1. Function declaration
function printHello() {
    console.log('Hello')
}
printHello();

function log(msg) {
    console.log(msg);
}

log('hello2');

//2. Parameters
//Primitive(value) & object(reference)
function changeName(x) {
    x.name = 'coder'    //parameter의 name 변환
}
const taeng = {name: 'taeng'};
changeName(taeng);
console.log(taeng);

//3. Default Parameters(in ES6)
//빈 Parameter는 Undefined로!
function showMessage(message, from) {
    console.log(`${message} by ${from}`);
}
showMessage('Hi');

//4. Rest Parameters(in ES6) - array
function printAll(...talk) {
    for (let i=0; i<talk.length; i++) {
        console.log(talk[i])
    }
}

printAll('How','are','you');

function printAll2(...args) {
    for (const arg of args) {   // = foreach
        console.log(arg);
    }
}
printAll2('How','do','you','do?');

//5. Local scope
let globalMessage = 'global';   //global variable
function printMessage() {
    let message = 'hello'   //local variable(변경불가)
    globalMessage = 'global again'
    console.log(message);
    console.log(globalMessage);
}
message = 'hello again'
printMessage();

//6. Return a value
function sum(a,b) {
    return a + b;
}
const result = sum(4,5);    //9
console.log(`sum: ${result}`);

//7. Early return, Early exit
// bad
function upgradeUser(user) {
    if(user.point>10) {
        //upgrade logic...
    }
}

// good
function upgradeUser(user) {
    if(user.point<=10) {
        return; //빠른 return으로 런타임 단축
    }
    // upgrade logic...
}

//8. Callback function using function express
function randomQuiz(ans, printYes, printNo) {
    if (ans==='love') {
        printYes();
    } else {
        printNo();
    }
}
function printYes() {
    console.log('yes!');
};
function printNo() {
    console.log('no!');
};

randomQuiz('hate', printYes, printNo);
randomQuiz('love', printYes, printNo);


//*9. Arrow Function(always anonymous)
const simplePrint = function() {    //normal function
    console.log('simplePrint!');
};

const simplePrint2 = () => console.log('simplePrint2'); //arrow function
const add = (a,b) => a + b;

//10. IIFE : Immediately Invoked Function Expression : ()감싸서 바로 호출 - 중요도 낮음
(function hello() {
    console.log('hello');
}) ();