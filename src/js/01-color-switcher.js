
const body = document.querySelector("body");
const btnStart = document.querySelector("[data-start]");
const btnStop = document.querySelector("[data-stop]");

btnStart.addEventListener("click", onBtnStartClick);
btnStop.addEventListener("click", onBtnStopClick);

let timerId = null;
btnStop.disabled = true;

function onBtnStartClick() {
  timerId = setInterval(backgroundcolor, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
}

function backgroundcolor() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onBtnStopClick() {
  clearInterval(timerId)
  btnStart.disabled = false;
  btnStop.disabled = true;
}