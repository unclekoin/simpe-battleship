const number = Math.floor(Math.random() * (9 - 1) + 1);
const target = new Array(3).fill(0).map((item, index) => {
  return number + index;
});
console.log(target)

let input = document.querySelector('.input');
let hits = [];
let guesses = 0;
let isSunk = false;

const restart = document.querySelector('.restart__wrapp');
const statsForm = document.querySelector('.stats-form');
const statsFormText = document.querySelector('.stats-form__text');
const commandBtn = document.querySelector('.command');

let scoreboard = document.querySelector('.scoreboard__text');
const btn = document.querySelector('.btn__wrapp');

const command = new Audio();
command.src = 'assets/audio/command.mp3';
const shot = new Audio();
shot.src = 'assets/audio/shot.mp3';
const bang = new Audio();
bang.src = 'assets/audio/bang.mp3';
const trumpet = new Audio();
trumpet.src = 'assets/audio/trumpet.mp3';
const audioErr = new Audio();
audioErr.src = 'assets/audio/error.mp3';

commandBtn.addEventListener('click', () => {
  command.play();
});

function delayAfterBang() {
  scoreboard.textContent = 'Готовься, целься, пли!(введите число 1-10):';
  input.value = '';
  input.disabled = false;
}

btn.addEventListener('click', () => {
  input.disabled = true;
  let guess = input.value;
  if (guess && !isNaN(+guess)) {
    setTimeout(() => {
      shot.play();
    }, 0);
    if (target.includes(+guess) && !hits.includes(+guess)) {
      setTimeout(() => {
        bang.play();
        scoreboard.textContent = 'Попал!';
      }, 1500)
      setTimeout(delayAfterBang, 8000);
      guesses += 1;
      hits.push(+guess);
    } else {
      setTimeout(delayAfterBang, 3000);
      setTimeout(() => {
        scoreboard.textContent = 'Мимо!';
      }, 1000);
      guesses += 1;
    }
  } else {
    audioErr.play();
    scoreboard.textContent = 'Введите корректное значение'
    setTimeout(delayAfterBang, 1500);
  }

  if (hits.length === 3) {
    input.value = '';
    input.disabled = true;
    setTimeout(() => {
      scoreboard.textContent = 'Цель поражена!';
      trumpet.play();
      statsForm.style.top = '50%';
      const stats = `
      В результате боя произведено:
      <ul>
      <li>залпов: ${guesses}</li>
      <li>точных попаданий: 3</li>
      <li>эффективность: ${Math.round(3 / guesses * 100)}%</li>
      </ul>`;
      statsFormText.innerHTML = stats;
    }, 2000);
  }
});

restart.addEventListener('click', (e) => {
  location.reload();
})


