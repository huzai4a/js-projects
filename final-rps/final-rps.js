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
        message = `Player chose <img src="img/${playerTurn}.png" alt="rock" class="intext"> and AI chose <img src="img/${compTurn}.png" alt="rock" class="intext"> You Win!`
        scores.wins++;
    } else if (compTurn === 'paper' && playerTurn === 'rock' || compTurn === 'scissors' && playerTurn === 'paper' || compTurn === 'rock' && playerTurn === 'scissors'){
        message = `Player chose <img src="img/${playerTurn}.png" alt="rock" class="intext"> and AI chose <img src="img/${compTurn}.png" alt="rock" class="intext"> You Lose :(`
        scores.losses++;
    } else{
        message = `Player chose <img src="img/${playerTurn}.png" alt="rock" class="intext"> and AI chose <img src="img/${compTurn}.png" alt="rock" class="intext"> You Tied.`
        scores.ties++;
    }

    localStorage.setItem('score', JSON.stringify(scores));

    document.querySelector('.result').innerHTML = message;
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
    document.querySelector('.result').innerHTML = 'Score was reset successfully.';
    updateScoreElements();
}

function updateScoreElements(){
    document.querySelector(".myWins")
    .innerHTML = scores.wins;
    document.querySelector(".myLoss")
    .innerHTML = scores.losses;
    document.querySelector(".myTies")
    .innerHTML = scores.ties;
}

let intervalID;

function autoPlayer(){
    const inputElement = document.querySelector('.auto-btn');
    if (inputElement.innerHTML == 'Auto Play'){
        inputElement.innerHTML='Stop Play';

        intervalID = setInterval(() => {
            decideWin(Math.random());
        }, 1000); // replay every 2 seconds
    } else {
        inputElement.innerHTML='Auto Play';

        clearInterval(intervalID);
    }
    
}

document.querySelector('.js-rock')
    .addEventListener('click', ()=>{
        decideWin(0);
    });
document.querySelector('.js-paper')
    .addEventListener('click', ()=>{
        decideWin(0.5);
    });
document.querySelector('.js-scissors')
    .addEventListener('click', ()=>{
        decideWin(1);
    });
document.querySelector('.js-reset')
    .addEventListener('click', ()=>{
        scoreReset();
    });
document.querySelector('.js-auto')
    .addEventListener('click', ()=>{
        autoPlayer();
    });
    
document.body.addEventListener('keydown', (event)=> {
    if (event.key === 'r'){
        decideWin(0);
    } else if (event.key === 'p') {
        decideWin(0.5);
    } else if (event.key === 's'){
        decideWin(1);
    }
});