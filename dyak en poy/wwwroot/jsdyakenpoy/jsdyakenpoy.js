const choices = document.querySelectorAll('.choice');
const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');
const restart = document.getElementById('restart');
const modal = document.getElementById('result-modal');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.querySelector('.modal .close'); // Select the close button
const scoreboard = {
    player: 0,
    computer: 0
};

// Play game
function play(e) {
    restart.style.display = 'inline-block';
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    showWinner(winner, computerChoice);
}

// Get Computer choice
function getComputerChoice() {
    const rand = Math.random();
    if (rand < 0.34) {
        return 'rock';
    } else if (rand <= 0.67) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

// Get game winner
function getWinner(p, c) {
    if (p === c) {
        return 'draw';
    } else if (p === 'rock') {
        return c === 'paper' ? 'computer' : 'player';
    } else if (p === 'paper') {
        return c === 'scissors' ? 'computer' : 'player';
    } else if (p === 'scissors') {
        return c === 'rock' ? 'computer' : 'player';
    }
}

// Show modal with result
function showWinner(winner, computerChoice) {
    const resultText = winner === 'player' ? 'You Win' :
        winner === 'computer' ? 'You Lose' : 'It\'s a Draw';

    const computerChoiceText = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);

    modalBody.innerHTML = `
        <h1>${resultText}</h1>
        <p>Computer Chose <strong>${computerChoiceText}</strong></p>
    `;

    modal.style.display = 'block';

    // Update the score
    if (winner === 'player') {
        scoreboard.player++;
    } else if (winner === 'computer') {
        scoreboard.computer++;
    }
    playerScoreElem.textContent = scoreboard.player;
    computerScoreElem.textContent = scoreboard.computer;
}

// Restart game
function restartGame() {
    scoreboard.player = 0;
    scoreboard.computer = 0;
    playerScoreElem.textContent = '0';
    computerScoreElem.textContent = '0';
    modal.style.display = 'none';
    restart.style.display = 'none';
}

// Clear modal when clicking outside of it
function clearModal(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
}

// Attach event listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);
closeModalBtn.addEventListener('click', () => modal.style.display = 'none'); // Add this line
