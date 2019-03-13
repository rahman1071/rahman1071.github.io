var wordToGuess = "ignite";

var wordState = [];

var guessesLeft = 7;
var prevGuesses = [];

function displayWordState(state){
    var output = '';

    for(var i = 0; i< state.length; i++){
        var char = state[i];
        output = output + char
        output = output + "  ";
    }
    var wordStateContainer = document.getElementById('word');
    wordStateContainer.innerHTML = output;
}
function displayGuessesLeft(num){
    document.getElementById('guesses-left').innerHTML = num;
}
function displayPreviousGuesses(guessesArray){
    var list = document.getElementById('past-guesses');
    list.innerHTML= '';
    for(var i = 0; i< guessesArray.length; i++){

        var guess = document.createElement('li');
        guess.innerHTML = guessesArray[i];
        list.appendChild(guess);
    }
}
function guess(wordToGuess,wordState, currGuess){
    for(let i = 0; i< wordToGuess.length; i++){
        if(wordToGuess[i] == currGuess){
            wordState[i] = currGuess;
        }
    }
    displayWordState(wordState);

}
function checkWon(wordState){
    let hasBlanks = false;
    for(let i = 0; i < wordState.length; i++){
        if(wordState[i] == '_'){
            hasBlanks = true;
        }
    }
    return !hasBlanks;
}
function setup(){
    for(let i = 0; i< wordToGuess.length; i++){
        wordState.push('_')
    }
    displayGuessesLeft(guessesLeft);
    displayWordState(wordState);
    displayPreviousGuesses(prevGuesses);
}

function setupForm(){
var form = document.getElementById('player-input')
var input = document.getElementById('player-guess')

form.onsubmit = function (event){
    event.preventDefault();
    var currentInput = input.value.toLowerCase();
    input.value = '';

    if(!validateInput(currentInput, prevGuesses)){
        window.alert('Please submit a single alphabet that have not been used');
        return;
    }
    prevGuesses.push(currentInput);

    guessesLeft = guessesLeft - 1;
    displayGuessesLeft(guessesLeft);

    guess(wordToGuess, wordState, currentInput);

    const won = checkWon(wordState);
    if(won){
    window.alert('you won!')
    }
    else if(guessesLeft == 0){
        window.alert('You lost!')
    }

    displayPreviousGuesses(prevGuesses)
    }
}
function validateInput(guess, prevGuesses){
    if(guess.length == 1 && prevGuesses.indexOf(guess) == -1){
        return true;
    }
    return false;
}
setup();
setupForm();
