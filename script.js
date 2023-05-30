const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  loses: 0,
  ties: 0
};

document.querySelector('.rock-btn').addEventListener('click', function(){
  playGame('rock');
});

document.querySelector('.paper-btn').addEventListener('click', function(){
  playGame('paper');
});

document.querySelector('.scissors-btn').addEventListener('click', function(){
  playGame('scissors');
});


document.body.addEventListener('keydown', function(e){
  if (e.key === 'r') {
    playGame('rock');
  }
  else if ( e.key === 'p') {
    playGame('paper');
  }
  else if (e.key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove) {
  player=playerMove;
  let compMove = computerMove();

  let result = '';

  if (playerMove == 'rock') {
    if (compMove == 'rock') {
      result = 'Tie.'
    }
    else if (compMove == 'paper') {
      result = 'You lose.'
    }
    else {
      result = 'You win.'
    }
  }
  else if (playerMove == 'paper') {
    if (compMove == 'paper') {
      result = 'Tie.'
    }
    else if (compMove == 'scissors') {
      result = 'You lose.'
    }
    else {
      result = 'You win.'
    }
  }
  else {
    if (compMove == 'scissors') {
      result = 'Tie.'
    }
    else if (compMove == 'rock') {
      result = 'You lose.'
    }
    else {
      result = 'You win.'
    }
  }

  if (result === 'You win.') {
    score.wins++;
  }
  else if (result === 'Tie.') {
    score.ties++;
  }
  else {
    score.loses++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result').innerHTML=`${result}`;
  document.querySelector('.js-moves').innerHTML=`You : <img src="images/${playerMove}-emoji.png" class="move-icon"> VS  <img src="images/${compMove}-emoji.png" class="move-icon"> : Computer.`;

  
  updateScore();
}

function updateScore() {
  document.querySelector('.js-score')
  .innerHTML=`Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}.`;
}

function computerMove() {
  let randNum = Math.random();
  let compMove = '';

  if (randNum <= 1 / 3) {
    compMove = 'rock';
  }
  else if (randNum <= 2 / 3) {
    compMove = 'paper';
  }
  else {
    compMove = 'scissors';
  }
  return compMove;
}

function resetScore() {
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScore();
}

let isAutoPlay=false;
let interval;

function autoPlay() {
  if (!isAutoPlay) {
    isAutoPlay=true;
    interval=setInterval( function() {
      const playerMove= computerMove();
      playGame(playerMove);
    },1000);
  }
  else {
    autoPlay=false;
    clearInterval(interval);
  }
}