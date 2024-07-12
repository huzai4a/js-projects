//can delete properties of objects by doing delete obj_name.property_name
// can use square brackets to call properties with dashes (score['delivery-time'])
// NOTE: localStorage.getItem() can only take in a string, making this a useful JSON case

/*
let scores = JSON.parse(localStorage.getItem('score'));
// if it reset add default scores
if (!scores){
    scores = {
        wins: 0,
        losses: 0,
        ties: 0
    }
}
*/

// this uses JSON parse to take the JSON string from local storage and put it into the score 
// This also shows a default operator, where if 1 is false do 2, if 1 is true 2 is unnecessary
let scores = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
}

document.getElementById("myWins").innerHTML = scores.wins;
document.getElementById("myLoss").innerHTML = scores.losses;
document.getElementById("myTies").innerHTML = scores.ties;

function decideWin(input){
    let randNum = Math.random();
    let message;

    compTurn = checkTurn(randNum);
    playerTurn = checkTurn(input);
    
    if (compTurn === 'rock' && playerTurn === 'paper' || compTurn === 'paper' && playerTurn === 'scissors' || compTurn === 'scissors' && playerTurn === 'rock'){
        message = `Player chose ${playerTurn} and AI chose ${compTurn}. You Win!`
        scores.wins++;
    } else if (compTurn === 'paper' && playerTurn === 'rock' || compTurn === 'scissors' && playerTurn === 'paper' || compTurn === 'rock' && playerTurn === 'scissors'){
        message = `Player chose ${playerTurn} and AI chose ${compTurn}. You Lose :(`
        scores.losses++;
    } else{
        message = `Player chose ${playerTurn} and AI chose ${compTurn}. You Tied.`
        scores.ties++;
    }

    localStorage.setItem('score', JSON.stringify(scores));

    alert(message);

    document.getElementById("myWins").innerHTML = scores.wins;
    document.getElementById("myLoss").innerHTML = scores.losses;
    document.getElementById("myTies").innerHTML = scores.ties;


    input = null;
    randNum = null;
}
function checkTurn(num){
    let turnChoice;

    if (num >= 0 && num < 1/3){
        turnChoice = 'rock';
    } else if (num >= 1/3 && num < 2/3){
        turnChoice = 'paper';
    } else { // between 2/3 and 1
        turnChoice ='scissors';
    }

    return turnChoice;
}
function scoreReset(){
    scores.wins = 0; 
    scores.losses = 0;
    scores.ties = 0;
    localStorage.removeItem('score');
    document.getElementById("myWins").innerHTML = scores.wins;
    document.getElementById("myLoss").innerHTML = scores.losses;
    document.getElementById("myTies").innerHTML = scores.ties;
}


/*
egProduct ={
    name: "shirt",
    'delivery-time': '1 day',
    ratings: {
        stars: 4.5,
        total: 87
    }
};

const JSONString = JSON.stringify(egProduct)

console.log(JSONString);
console.log(JSON.parse(JSONString));
*/

const object1 = {
    message: 'hello'
};
const object2 = object1;

object1.message = 'no';

console.log(object2.message);

const object3 = {
    message: 'hello'
};

console.log(object1 === object3);
console.log(object1 === object2);

console.log(object1 == object3);
console.log(object1 == object2);

const object4 = {
    message: 'hello',
    price: 799
};

// these do the same
// const message = object4.message;
const { message, price } = object4;

const object5 ={
    // message: message
    message,
    // method: function function1(){
    //     console.log('method')
    // }
    method(){
        console.log('method')
    }
};
console.log(object5);
object5.method();