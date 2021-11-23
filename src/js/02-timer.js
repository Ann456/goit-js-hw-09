import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';//https://flatpickr.js.org/getting-started/
import { Notify } from 'notiflix/build/notiflix-notify-aio';//https://github.com/notiflix/Notiflix#readme

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysT: document.querySelector('[data-days]'),
  hoursT: document.querySelector('[data-hours]'),
  minutesT: document.querySelector('[data-minutes]'),
  secondsT: document.querySelector('[data-seconds]'),
};
const { input, startBtn, daysT, hoursT, minutesT, secondsT } = refs;

startBtn.disabled = true;
startBtn.addEventListener('click', onStartClick);

let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < options.defaultDate) {
      return Notify.failure('Please choose a date in the future');
    }
    startBtn.disabled = false;
  },
};
const fp = flatpickr(input, options);

function onStartClick() {
  intervalId = setInterval(setTime, 1000);
  startBtn.disabled = true;
  input.disabled = true;
}

function setTime() {
  const currentTime = Date.now();
  const deltaTime = fp.selectedDates[0].getTime() - currentTime;

  updateTimer(convertMs(deltaTime));

  const isFinished = Object.keys(time).every(el => time[el] === 0);
  if (isFinished) {
      finishTimer();
      Notify.success('Timer finished');
    }
}


//Для подсчета значений используй готовую функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах.
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysT.textContent = addLeadingZero(days);
  hoursT.textContent = addLeadingZero(hours);
  minutesT.textContent = addLeadingZero(minutes);
  secondsT.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function finishTimer() {
  clearInterval(intervalId);
  input.disabled = false;
  daysT.textContent = '00';
  hoursT.textContent = '00';
  minutesT.textContent = '00';
  secondsT.textContent = '00';
}