function timer(id, deadLine) {
  function getTimeRemaining(endTime) {
    let DAYS, HOURS, MINUTES, SECONDS;

    const t = Date.parse(endTime) - Date.parse(new Date());

    if (t <= 0) {
      DAYS = 0;
      HOURS = 0;
      MINUTES = 0;
      SECONDS = 0;
    } else {
      DAYS = Math.floor(t / (1000 * 60 * 60 * 24));
      HOURS = Math.floor((t / (1000 * 60 * 60)) % 24);
      MINUTES = Math.floor((t / 1000 / 60) % 60);
      SECONDS = Math.floor((t / 1000) % 60);
    }

    return {
      t,
      DAYS,
      HOURS,
      MINUTES,
      SECONDS,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    }

    return num;
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');

    updateClock();
    const timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      const t = getTimeRemaining(endTime);

      days.innerHTML = getZero(t.DAYS);
      hours.innerHTML = getZero(t.HOURS);
      minutes.innerHTML = getZero(t.MINUTES);
      seconds.innerHTML = getZero(t.SECONDS);

      if (t.t <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(id, deadLine);
}

export default timer;
