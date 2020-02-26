// npm i readline-sync
const readlineSync = require('readline-sync');

// const userName= readlineSync.question('What it is you name? ');
// console.log('Hello ', userName);

// let a= parseInt(readlineSync.question('A? '));
// let b= parseInt(readlineSync.question('B? '));
// let operation = readlineSync.question('operation: ').toString();
// let result =0;
// if(operation === '+'){
//     result = a+b;
//     console.log('A+B='+result);
// }else if(operation === '-'){
//     result = a-b;
//     console.log('A-B='+result);
// }else if(operation === '*'){
//     result = a*b;
//     console.log('A*B='+result);
// }else if(operation === '/'){
//     if (b===0){
//         console.log('division in zero!');
//
//     }else{
//         result = a/b;
//         console.log('A/B='+result);
//     }
//
// }
let pass = '11112';
let userPass;
do {
    userPass = readlineSync.question('Pass? ');
} while(pass !== userPass);
console.log('Welcome!');

// for (let i = 0; i <= 100; i++) {
//     if (i % a === 0) {
//         console.log(i);
//     }

// }