let lenSecret = 3;
let maxStep = 4;
let currentStep = 0;
let mySecret = '';
let userAnswer = '';
const readlineSync = require('readline-sync');
let NumberInPosition = [];
let NumberOfPosition = [];
let finish = false;

function randomInt() {
    const r = parseInt(Math.random() * 10);
    return r.toString();
}

function createStringInArray(arr) {
    let result = '';
    for (let i = 0; i < arr.length; i++) {
        result += arr[i] + ' '
    }
    // result +='и '+ arr[arr.length];
    return result
}

for (let i = 0; i < lenSecret; i++) {
    mySecret = mySecret + randomInt();
}
console.log('Загаданное число: ', mySecret);

// for (let i = 1; i <= maxStep; i++) {
do {
    do {
        userAnswer = readlineSync.question('Answer? ').toString();
    } while (userAnswer.length !== mySecret.length);
    currentStep++;
    NumberInPosition = [];
    NumberOfPosition = [];
    for (let j = 0; j < lenSecret; j++) {
        let find = mySecret.indexOf(userAnswer[j]);
        if (find !== -1) {
            if (find === j) {
                // console.log('cow, ', userAnswer[j]);
                NumberInPosition.push(userAnswer[j])
            } else {
                // console.log('bull,', userAnswer[j]);
                NumberOfPosition.push(userAnswer[j])

            }
        }
    }
    if (mySecret === userAnswer) {
        finish=true;
        currentStep=0;
        console.log('Вы отгадали число: ', mySecret);

    } else {
        console.log('совпавших цифр не на своих местах - ', NumberOfPosition.length, '(', createStringInArray(NumberOfPosition), ')');
        console.log('совпавших цифр на своих местах - ', NumberInPosition.length, '(', createStringInArray(NumberInPosition), ')');
        console.log('Шаг: ' + currentStep)
    }

    if (currentStep === maxStep) {
        finish = true;
        console.log('Конец игры! Использовано максимальное количество попыток!');
    }

} while (!finish);

