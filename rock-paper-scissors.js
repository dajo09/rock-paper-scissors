const scores = JSON.parse(localStorage.getItem('scores')) || { wins: 0, losses: 0, ties: 0 };

const msgElement = document.querySelector('.js-p-msg');
const handElement = document.querySelector('.js-p-hand');
const scoreElement = document.querySelector('.js-p-score');
updateScoreElement();

function updateScoreElement() {
  scoreElement.innerHTML = `
      Wins: ${scores.wins} Losses: ${scores.losses} Ties: ${scores.ties}`;
}

function score(myMove) {
  const compMove = pickCompMove();
  let msg = '';

  if (myMove === compMove) {
    msg = 'Tie.';
    scores.ties += 1;
  } else if ((myMove === 'rock' && compMove === 'scissors') || (myMove === 'paper' && compMove === 'rock') || (myMove === 'scissors' && compMove === 'paper')) {
    msg = 'You win.';
    scores.wins += 1;
  } else {
    msg = 'You lose.';
    scores.losses += 1;
  }

  localStorage.setItem('scores', JSON.stringify(scores));

  msgElement.innerHTML = msg;
  handElement.innerHTML = `You 
        <img src="/icons/${myMove}-emoji.png" alt="">
        <img src="/icons/${compMove}-emoji.png" alt="">
        Computer`;
  updateScoreElement();
}

function pickCompMove() {
  const randomNumber = Math.random();
  let compMove = '';
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    compMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    compMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    compMove = 'scissors';
  }

  return compMove;
}

function reset() {
  scores.wins = 0;
  scores.losses = 0;
  scores.ties = 0;
  /* 
  So, if you want to completely remove the scores data from the localStorage and start fresh, use removeItem(). If you want to reset the scores to default values but keep them stored in the localStorage, use setItem() to update the scores with the default values.

  localStorage.removeItem('scores');
  */

  localStorage.setItem('scores', JSON.stringify(scores));
  updateScoreElement();
}