const readlineSync = require('readline-sync');

let gameOver = false;

let monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0,     // уставка ходов на восстановление
            "use": 0, // еще ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3,
            "use": 0,
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2,
            "use": 0,
        },
    ]
};

let user = {
    maxHealth: 10,
    name: "Евстафий",
    moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0,
            "use": 0,
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4,
            "use": 0,
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3,
            "use": 0,
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4,
            "use": 0,
        },
    ]
};

function stepRandom(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function Battle(stepMonster, stepUser) {
    monster.maxHealth -= user.moves[stepUser].physicalDmg * (100 - monster.moves[stepMonster].physicArmorPercents) / 100;
    monster.maxHealth -= user.moves[stepUser].magicDmg * (100 - monster.moves[stepMonster].magicArmorPercents) / 100;
    if (monster.maxHealth < 0) {
        console.log('Game Over: Monster dead!');
        gameOver = true
    }

    user.maxHealth -= monster.moves[stepMonster].physicalDmg * (100 - user.moves[stepUser].physicArmorPercents) / 100;
    user.maxHealth -= monster.moves[stepMonster].magicDmg * (100 - user.moves[stepUser].magicArmorPercents) / 100;
    if (user.maxHealth < 0) {
        console.log('Game Over: User dead!');
        gameOver = true
    }

}

function useMovieDown(movies) {
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].use > 0) movies[i].use--
    }
}

user.maxHealth = readlineSync.question(`Set Health: `);

do {
    let stepMonster;
    do {
        stepMonster = stepRandom(monster.moves.length);
    } while (monster.moves[stepMonster].use !== 0);
    monster.moves[stepMonster].use = monster.moves[stepMonster].cooldown;
    let moveMonster = monster.moves[stepMonster];
    console.log(monster.name, 'сделал ход:', moveMonster.name, ', Физ: ', moveMonster.physicalDmg, ', Маг: ', moveMonster.magicDmg);

    console.log('Выбери свой ход:');
    for (let i = 0; i < user.moves.length; i++) {
        let cool = ' ';
        if (user.moves[i].use > 0) cool = '*';
        let str = `${cool} ${i + 1}: ${user.moves[i].name} `.padEnd(28);
        console.log(str, `| Физ: ${user.moves[i].physicalDmg} |Маг: ${user.moves[i].magicDmg}`)
    }
    let stepUser;
    do {
        stepUser = readlineSync.question('Set Step: ') - 1;
    } while (stepUser >= user.moves.length || stepUser < 0 || user.moves[stepUser].use !== 0);
    user.moves[stepUser].use = user.moves[stepUser].cooldown;
    let moveUser = user.moves[stepUser];
    console.log(user.name, 'сделал ход:', moveUser.name, ', Физ: ', moveUser.physicalDmg, ', Маг: ', moveUser.magicDmg);

    Battle(stepMonster, stepUser);
    useMovieDown(monster.moves);
    useMovieDown(user.moves);
    console.log(`${monster.name} :  ${monster.maxHealth} |  ${user.name} :  ${user.maxHealth}`);
    console.log(''.padEnd(50, '-'));
    console.log('');
} while (!gameOver);

