// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form');
const input = document.querySelector('input[name=delay]');


const fulfield = document.querySelector('input[value=fulfilled]');
const rejected = document.querySelector('input[value=rejected]');



form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const delay = Number(input.value);

    const promise = new Promise((res, rej) => {

      setTimeout(() => {
        if (fulfield.checked) {
          res(delay);
        } else
          if (rejected.checked) {
            rej(delay);
          }
      }, delay);

    });

  promise
    .then((delay) => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        backgroundColor: "#59a10d",
          position: "topCenter",
          messageSize: 16,
          messageColor: '#fff',
          messageLineHeight: "150%",

          image: '../img/bi_check2-circle.svg',
          imageWidth: 24,
          timeout:5500
      });
    })
    .catch((delay) => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        backgroundColor: "#ef4040",
          position: "topCenter",
          messageSize: 16,
          messageColor: '#fff',
          messageLineHeight: "150%",

        image: '../img/error.svg',
          imageWidth: 24,
          timeout:5500
      });
    })
})