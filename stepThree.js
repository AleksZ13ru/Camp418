const fs = require('fs');
// const path = require('path');
const readlineSync = require('readline-sync');

const folderPath = './stepTheeTestData/';
let answerCounter = 0;
let questions = [];

function myRandom(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateQuetions() {
    let ls = fs.readdirSync(folderPath);
    for (let i = 0; i < ls.length; i++) {
        try {
            const data = fs.readFileSync(folderPath + ls[i]);
            let texts = data.toString();
            let arr = texts.split('\r\n');
            let q = {
                "text": arr[0],
                "answerTrue": arr[1],
                "answers": arr.slice(2),
                "use": false,
                "result": false,
            };
            questions.push(q);
        } catch (err) {
            console.error(err)
        }
    }
}

function readQuestion(question) {
    console.log(`Вопрос: ${question.text}`);
    console.log(`Варианты ответов:`);
    for (let i = 0; i < question.answers.length; i++) {
        console.log(` ${i + 1}: ${question.answers[i]}`);
    }
    let answerUser;
    do {
        answerUser = readlineSync.question('Answer: ').toString();
    } while (answerUser > question.answers.length || answerUser < 0);
    if (answerUser === question.answerTrue) {
        question.result = true;
        answerCounter++;
        console.log("Верно!")
    } else {
        console.log("Не верно!")
    }
    console.log("");
    question.use = true;
}

generateQuetions();
for (let i = 0; i < 5; i++) {
    let random;
    do {
        random = myRandom(questions.length);
    } while (questions[random].use !== false);
    readQuestion(questions[random]);
}
console.log(`Вы верно ответили на ${answerCounter} из 5 вопросов!`);
