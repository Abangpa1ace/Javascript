//async & await : clear style of using promise(항상 사용하진 않음)

//1. async
//before : Promise
function fetchUser() {      // 10 seconds delaying..
    return new Promise((resolve, reject) => 
    resolve('taeng'))
}
const user = fetchUser();
user.then(console.log)

//after : async
async function fetchUser2() {    // 10 seconds delaying..
    return 'taeng2'
}
const user2 = fetchUser2();
user2.then(console.log)

//2. await : async 함수에서만 사용
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
    await delay(1000);
    return 'Apple!';
}

async function getBanana() {
    await delay(2000);
    return 'Banana!';
}

async function pickFruits() {
    const apple = await getApple(); //applePromise로 바꿔 병렬 읽기
    const banana = await getBanana(); //bananaPromise로 바꿔 병렬 읽기
    return `${apple} + ${banana}`
}


//3. useful Promise APIs : applePromise 병렬처리를 깔끔하게!
//all
function pickAllFruits() {
    return Promise.all([getApple(), getBanana()])   //배열로 읽어옴
    .then(fruits => fruits.join('+'));
}

pickAllFruits().then(console.log);

function pickFirstFruits() {
    return Promise.race([getApple(), getBanana()])
}

pickFirstFruits().then(console.log)