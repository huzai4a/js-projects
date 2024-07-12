// this uses JSON parse to take the JSON string from local storage and put it into the score 
// This also shows a default operator, where if 1 is false do 2, if 1 is true 2 is unnecessary
let scores = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
}

updateScoreElements();

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

    document.querySelector('.result').innerText = message;
    // alert(message);

    updateScoreElements();


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

    updateScoreElements();
}



/*
console.log(document.title);
console.log(document.body);
document.body.innerHTML="<button class="btn">NEW</button>";
*/

/* 
console.log(document.querySelector('button').innerHTML);

document.querySelector('button')
    .innerHTML = 'new';*/


// document.querySelector('.js-btn')
//     .innerHTML = 'new';

function updateScoreElements(){
    document.querySelector(".myWins")
    .innerHTML = scores.wins;
    document.querySelector(".myLoss")
    .innerHTML = scores.losses;
    document.querySelector(".myTies")
    .innerHTML = scores.ties;
}

// yt btn /////////////////////////////////////////////
function changeText(){
    const btnElement = document.querySelector('.yt-btn')
    if (btnElement.innerText === 'Subscribe') {
        btnElement.innerHTML= 'Subscribed';
        btnElement.classList.add("subscribed");
    } else{
        btnElement.innerHTML='Subscribe';
        btnElement.classList.remove("subscribed");
    }
}


// amazon shipping ///////////////////////////////
function checkShipping(){
    const inputElement = document.querySelector('.js-cost-in');
    let cost = Number(inputElement.value);
    if(cost < 40){
        cost += 10;
    }
    document.querySelector('.calculated')
    .innerHTML = `$${cost}`
}

function checkEnter(pressed){
    if(pressed === 'Enter'){
        checkShipping();
    }
}

/*
Number('2')
String(25)
console.log('25'-5);//working
console.log('25'+5); //not working
//window represents browser and is automatically added in for document, alert, etc.
window.alert('djdd')
*/