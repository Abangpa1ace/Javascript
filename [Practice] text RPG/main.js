'use strict';

let gameover = false;
let battle = false;

// 메세지 창
function logMessage(msg, color) {
    if (!color) { color = "black";}
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.style.color = color;
    document.getElementById('log').appendChild(div);
}

// 기본 캐릭터
function Character(name, hp, att) {
    this.name = name;
    this.hp = hp;
    this.att = att;
}
// 수세
Character.prototype.attacked = function(damage) {
    this.hp -= damage;
    logMessage(this.name + '의 체력이 ' + this.hp + '가 되었습니다.')
    if (this.hp <= 0) {
        battle = false;
    }
};
// 공세
Character.prototype.attack = function(target) {
    logMessage(this.name + '이 ' + target.name + '을 공격합니다.')
    target.attacked(this.att);
}

// 플레이어 초기세팅(Character + lev,xp)
function Player(name, hp, att, lev, xp) {
    Character.apply(this, arguments);
    this.lev = lev || 1;
    this.xp = xp || 0;
}

// 플레이어 생성(생성자), 수세(+게임오버), 공세(+경험치)
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;
Player.prototype.attacked = function(damage) {
    this.hp -= damage;
    logMessage(this.name + '의 체력이 ' + this.hp + '가 남았습니다.')
    if (this.hp <= 0) {
        logMessage('죽었습니다. 레벨 ' + this.lev + '에서 모험이 끝납니다. F5를 눌러 다시 시작하세요', 'red');
        battle = false;
        gameover = true;
    }
};
Player.prototype.attack = function(target) {
    logMessage(this.name + '이 ' + target.name + '을 공격합니다.')
    target.attacked(this.att);
    if (target.hp <= 0) {this.gainXp(target);}
};
// 경험치 및 레벨업 세부구현
Player.prototype.gainXp = function(target) {
    logMessage('전투에서 승리하여 ' + target.xp + '의 경험치를 얻습니다.', 'blue');
    this.xp += target.xp;
    if (this.xp > (100 + this.lev*10)) {
        this.lev++;
        logMessage('축하합니다! ' + this.lev + '레벨이 되었습니다.', 'green');
        this.hp = 100 + this.lev*20;
        this.xp -= 100 + this.lev*10;
    }
};

// 몬스터 생성
function Monster(name, hp, att, lev, xp) {
    Character.apply(this, arguments);
    this.lev = lev || 1;
    this.xp = xp || 10;
}
Monster.prototype = Object.create(Character.prototype);
Monster.prototype.constructor = Monster;

// 몬스터 소환
function summonMonster() {
    let monsterList = [
        ['rabbit', 25, 3, 1, 35],
        ['skeleton', 50, 6, 2, 50],
        ['oger', 80, 4, 3, 75],
        ['demon', 100, 8, 4, 100],
        ['dragon', 400, 20, 5, 300],
    ];
    let monster = monsterList[Math.floor(Math.random() * 5)];
    return new Monster(monster[0], monster[1], monster[2], monster[3], monster[4]);
}

// 플레이어 소환 및 배틀
let player = new Player(prompt('플레이어 이름 입력'), 100, 10, prompt('레벨을 입력'));
logMessage(player.name + '님이 모험을 시작합니다. 두근두근!');

while(!gameover) {
    let monster = summonMonster();
    logMessage(monster.name + '을 마주쳤습니다. 전투가 시작됩니다', 'pink');
    battle = true;
    while (battle) {
        player.attack(monster);
        if (monster.hp > 0) {
            monster.attack(player);
        } else {}
    }
    battle =false;
}