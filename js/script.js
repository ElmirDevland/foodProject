document.addEventListener('DOMContentLoaded', () => {
  //Tabs

  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach((item) => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }
  hideTabContent();
  showTabContent();

  tabParent.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //Timer

  const deadLine = '2022-12-21';

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

  setClock('.timer', deadLine);

  //Modal

  const modal = document.querySelector('.modal');
  const modalTrigger = document.querySelectorAll('[data-modal]');
  const modalCloseBtn = document.querySelector('[data-close]');

  function modalShow() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimer);
  }

  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  modalTrigger.forEach((btns) => {
    btns.addEventListener('click', modalShow);
  });

  modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('show') && e.code == 'Escape') {
      closeModal();
    }
  });

  const modalTimer = setTimeout(modalShow, 15000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      modalShow();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
});
