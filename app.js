const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const h = document.querySelector('h3');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const againBtn = document.querySelector('#again');
const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});
timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});
board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);

  setTime(time);
}
function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Ваш счет ${score}</h1>`;

  againBtn.classList.remove('hide');
  againBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[1].classList.remove('up');
    console.log(screens[1].classList);
  });
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add('circle');

  circle.style.width = `${size}px`;
  circle.style.background = getColor();
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  board.append(circle);
}
createRandomCircle();

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
