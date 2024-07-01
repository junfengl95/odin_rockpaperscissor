// Write logic for computer choice
async function getComputerChoiceAsycn() {
    return new Promise(resolve => {
     setTimeout(() => {
        const choice = ['Rock', 'Paper', 'Scissors']
        const randomIndex = Math.floor(Math.random() * choice.length);
        resolve(choice[randomIndex]);
     }, 500);   
    })
}

let playerScore = 0;
let computerScore = 0;
let currentRound = 1;

function playRound(playerChoice, computerChoice) {
    const outcomes = {
        Rock: { beats: "Scissors", message: "Rock beat Scissors" },
        Paper: { beats: "Rock", message: "Paper beat Rock" },
        Scissors: { beats: "Paper", message: "Scissors beat Paper" }
    }


    let result = ``;
    
    if (!outcomes.hasOwnProperty(playerChoice) || !outcomes.hasOwnProperty(computerChoice)) {
        result = `Invalid choice or unexpected error occurred. Please try again.`;
    } else if (playerChoice === computerChoice) {
        result = `It's a tie. Both chose ${playerChoice}. \n 
        Player: ${playerScore} || Computer: ${computerScore}`;
    } else if (outcomes[playerChoice].beats === computerChoice) {
        playerScore++;
        result = `You win! ${outcomes[playerChoice].message}. \n 
        Player: ${playerScore} || Computer: ${computerScore}`;
    } else {
        computerScore++
        result = `You lose! ${outcomes[computerChoice].message}\n 
        Player: ${playerScore} || Computer: ${computerScore}`;
    }
    document.getElementById('result').innerText = result;
}



async function playGame(userChoice) {
    
    disableGameButtons();

    try {
        const computerChoice = await getComputerChoiceAsycn();
        playRound(userChoice, computerChoice);
    } catch (error){
        console.error("Error getting computer choice:", error);
    }
    finally {
        let round = `Round ${currentRound}`;
        document.getElementById('round').innerText = round;
        currentRound++;
        if (currentRound <=5){
            // Continue to next round after delay
            setTimeout(enableGameButtons, 1000);// 1 second
        } else{
            document.getElementById('playAgain').style.display = 'block';
            displayFinalScores();
        }
    }
}

function displayFinalScores() {
    let result = `Game Over!\n`;
    result += `Final Scores:\n`;
    result += `Player: ${playerScore}\n`;
    result += `Computer: ${computerScore}\n`;

    document.getElementById('result').innerText = result;
}

function resetGame() {
    document.getElementById('result').innerText = null;
    document.getElementById('round').innerText = null;
    playerScore = 0;
    computerScore = 0;
    currentRound = 1;
}


// Attach event listener to buttons
// Ensure event listener only executes after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('rock').addEventListener('click', () => playGame('Rock'));
    document.getElementById('paper').addEventListener('click', () => playGame('Paper'));
    document.getElementById('scissors').addEventListener('click', () => playGame('Scissors'));

    document.getElementById('playAgain').addEventListener('click', () =>{
        resetGame();
        enableGameButtons();
        document.getElementById('playAgain').style.display = 'none';
    })
})

function disableGameButtons(){
    document.getElementById('rock').disabled = true;
    document.getElementById('paper').disabled = true;
    document.getElementById('scissors').disabled = true;
}

function enableGameButtons() {
    document.getElementById('rock').disabled = false;
    document.getElementById('paper').disabled = false;
    document.getElementById('scissors').disabled = false;
}

