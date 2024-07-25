// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";




const input = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]')


startButton.setAttribute('disabled', '');

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(userSelectedDate);

    if (userSelectedDate) {
      if (userSelectedDate.getTime() <= Date.now()) {
        startButton.setAttribute('disabled', '');

        iziToast.show({
          message: 'Please choose a date in the future',
          backgroundColor: "#ef4040",
          position: "topCenter",
          messageSize: 16,
          messageColor: '#fff',
          messageLineHeight: "150%",

          image: '../img/bi_x-octagon.png',
          imageWidth: 24,
          timeout:5500
        });



      } else {
        startButton.removeAttribute('disabled');
      }
    }

  },
};

flatpickr(input, options);


startButton.addEventListener('click', () => {
  input.disabled = true;
  startButton.disabled = true;


  const intervalId = setInterval(() => {

    const diff = convertMs(userSelectedDate.getTime() - Date.now());

    days.textContent = diff.days;
    hours.textContent = diff.hours;
    minutes.textContent = diff.minutes;
    seconds.textContent = diff.seconds;

    if (days.textContent === "00" && hours.textContent === '00' && minutes.textContent === '00' && seconds.textContent === '00') {
      clearInterval(intervalId);
      input.disabled = false;

    };

    // if (diff === "0") {
    //   clearInterval(intervalId);
    //   input.disabled = false;
    // }



  }, 1000);
});


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return {
    days: addLeadingZero(days),
    hours: addLeadingZero(hours),
    minutes: addLeadingZero(minutes),
    seconds: addLeadingZero(seconds)
  };
}

function addLeadingZero(value) {
 return String(value).padStart(2, '0');
};

