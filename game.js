// Step 1
console.log("Hello World")

// Step 2: Write logic for computer choice
function getComputerChoice(){
    const choice = ["Rock", "Paper", "Scissor"]
    const randomIndex = Math.floor(Math.random() * choice.length);
    const randomValue = choice[randomIndex];
    return randomValue;
}

// const computerChoice = getComputerChoice();

// console.log(computerChoice);

// Step 3: Write the logic to get the human choice
function getHumanChoice(){
    let choice = prompt("Pick Rock, Paper or Scissor?");
    choice = choice.toLowerCase();
    while (typeof choice !== 'string' || !(choice === "rock" || choice === 'paper' || choice === 'scissor')) {
        // Ensure the choice is a valid value
        choice = prompt("Please enter a valid choice Rock, Paper, Scissor");
    }
    const userChoice = choice.charAt(0).toUpperCase() + choice.slice(1).toLowerCase();
    return userChoice;
    
}

// const humanChoice = getHumanChoice();
// console.log(humanChoice);

// Step 4: Declare the players score variables

let humanScore = 0;
let computerScore = 0;

// Step 5: Write the logic to play a single round

function playRound(humanChoice, computerChoice){
    const outcomes = {
        Rock: { beats: "Scissor", message: "Rock beat Scissor"},
        Paper: { beats: "Rock", message: "Paper beat Rock"},
        Scissor: { beats: "Paper", message: "Scissor beat Paper"}
    }

    // Using a hashmap instead of if else statements for every condition

    if (humanChoice === computerChoice){
        console.log(`It is a tie. Both chose ${humanChoice}`)
    }
    else if (outcomes[humanChoice].beats === computerChoice){
        console.log(`You win! ${outcomes[humanChoice].message}`);
        humanScore++;
        console.log(`Human: ${humanScore} || Computer:${computerScore}`)
    } else {
        console.log(`You lose! ${outcomes[computerChoice].message}`);
        computerScore++;
        console.log(`Human: ${humanScore} || Computer:${computerScore}`)
    }
}

// playRound(humanChoice, computerChoice);

function playGame(){

    let numRounds = prompt("How many rounds(1-10) do you want to play?");
    
    // Validate user input for number of rounds
    while (isNaN(numRounds) || parseInt(numRounds) < 1 || parseInt(numRounds) > 10){
        numRounds = prompt("Invalid input. Please enter a value between 1 and 10")
    }

    // parse always return 'string'
    // Convert to Integer
    numRounds = parseInt(numRounds);

    // reset score to 0
    humanScore = 0;
    computerScore = 0;

    for (let i = 1; i <= numRounds; i++){
        console.log(`Round ${i}`)

        const computerChoice = getComputerChoice();
        const humanChoice = getHumanChoice();

        playRound(humanChoice, computerChoice);

        console.log(`Current Scores - Human: ${humanScore} || Computer: ${computerScore}`);
    }

    if (humanScore > computerScore){
        console.log("You win the game");
    } else if (computerScore > humanScore){
        console.log("Computer wins the game");
    } else{
        console.log("It is a tie")
    }
}

// Run the playGame method
playGame();