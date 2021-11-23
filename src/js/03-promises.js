import { Notify } from 'notiflix/build/notiflix-notify-aio'//or import Notiflix from 'notiflix'; for all modules
import "notiflix/dist/notiflix-3.2.2.min.css"//https://github.com/notiflix/Notiflix#readme

const form = document.querySelector(".form")
form.addEventListener("input", onSubmitBtnClick);

function onSubmitBtnClick(e) {
  e.preventDefault();
  
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}


createPromise(2, 1500)
  .then(({ position, delay }) => {
    return Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    return Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });