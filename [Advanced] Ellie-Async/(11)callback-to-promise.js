//Callback Hell to Promise!

// - Productor -
class UserStorage {
    loginUser(id, pw) {                             // 1) onSuccess, onError API 삭제
        return new Promise((resolve, reject) => {   // 2) return new Promise
        setTimeout(() => {
            if (
                (id === 'ellie' && pw === 'dream') ||
                (id === 'coder' && pw === 'academy') 
            ) {resolve(id);}                        // 3) resolve() 설정
            else {reject(new Error('not found'))}   // 4) reject(new Error()) 설정
        }, 2000);
    });
    }
    getRoles(user) {                                // 동일순서
        return new Promise((resolve, reject) => {   // API제거 - return new Promise - resolve, reject 설정
            setTimeout(() => {
            if (user === 'ellie') {
                resolve({name: 'ellie', role: 'admin'});
            } else {
                reject(new Error('no access'));
            }
        }, 1000);
    });
    }
}

// - Consumer -
const userStorage = new UserStorage();
const id = prompt('enter your id');
const pw = prompt('enter your pw')
userStorage.loginUser(id, pw)   // 1) user function, error 변수 제거
.then(userStorage.getRoles)     // 2) then으로 userStorage.getRoles API 연결
.then(user => alert(`Hello ${user.name}, you have a ${user.role} role.`))
                                // 3) then으로 getRoles의 user.name, user.role alert 연결
.catch(console.log);            // 4) catch로 error 확인하여 console.log 처리
