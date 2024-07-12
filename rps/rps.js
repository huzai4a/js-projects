let wins = 0;
let losses = 0;
let ties = 0;
document.getElementById("myWins").innerHTML = wins;
document.getElementById("myLoss").innerHTML = losses;
document.getElementById("myTies").innerHTML = ties;

function decideWin(input){
    let randNum = Math.random();
    let message;

    compTurn = checkTurn(randNum);
    playerTurn = checkTurn(input);
    
    if (compTurn === 'rock' && playerTurn === 'paper' || compTurn === 'paper' && playerTurn === 'scissors' || compTurn === 'scissors' && playerTurn === 'rock'){
        message = `Player chose ${playerTurn} and AI chose ${compTurn}. You Win!`
        wins+= 1;
    } else if (compTurn === 'paper' && playerTurn === 'rock' || compTurn === 'scissors' && playerTurn === 'paper' || compTurn === 'rock' && playerTurn === 'scissors'){
        message = `Player chose ${playerTurn} and AI chose ${compTurn}. You Lose :(`
        losses+= 1;
    } else{
        message = `Player chose ${playerTurn} and AI chose ${compTurn}. You Tied.`
        ties+= 1;
    }

    alert(message);

    document.getElementById("myWins").innerHTML = wins;
    document.getElementById("myLoss").innerHTML = losses;
    document.getElementById("myTies").innerHTML = ties;


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