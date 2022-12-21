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

  const deadLine = '2023-12-21';

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

  function modalShow() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimer);
  }

  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      modalShow();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  modalTrigger.forEach((btns) => {
    btns.addEventListener('click', modalShow);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('show') && e.code == 'Escape') {
      closeModal();
    }
  });

  const modalTimer = setTimeout(modalShow, 50000);

  window.addEventListener('scroll', showModalByScroll);

  //Menu

  class Menu {
    constructor(img, alt, title, descr, price, parentSelector, ...classes) {
      this.img = img;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 36.94;
      this.changeToUAH();
      this.render();
    }

    changeToUAH() {
      this.price *= this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
        <img src=${this.img} alt=${this.alt} />
        <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${Math.floor(
              this.price
            )}</span> грн/день</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  // getResource('http://localhost:3000/menu').then((data) => {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     new Menu(img, altimg, title, descr, price, '.menu .container');
  //   });
  // });

  axios.get('http://localhost:3000/menu').then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new Menu(img, altimg, title, descr, price, '.menu .container');
    });
  });

  // Forms

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Thank You!',
    failure: 'Oops...',
  };

  forms.forEach((i) => bindPostData(i));

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: data,
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');

      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;

      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
          statusMessage.remove();
        })
        .finally(() => form.reset());
    });
  }

  function showThanksModal(message) {
    const modalDialog = document.querySelector('.modal__dialog');
    modalDialog.classList.add('hide');
    modalDialog.classList.remove('show');

    modalShow();

    const thanksDialog = document.createElement('div');

    thanksDialog.classList.add('modal__dialog');
    thanksDialog.innerHTML = `
        <div class="modal__content">
          <div data-close class="modal__close">×</div>
          <div class="modal__title">${message}</div>
        </div>
        `;

    document.querySelector('.modal').append(thanksDialog);

    setTimeout(() => {
      thanksDialog.remove();
      modalDialog.classList.add('show');
      modalDialog.classList.remove('hide');
      closeModal();
    }, 1650);
  }

  // Slider

  const sliderImgs = document.querySelectorAll('.offer__slide');
  const prevSlider = document.querySelector('.offer__slider-prev');
  const nextSlider = document.querySelector('.offer__slider-next');
  const currentSlide = document.querySelector('#current');
  const totalSlider = document.querySelector('#total');

  let sliderCount = 1;

  totalSlider.textContent =
    sliderImgs.length < 10 ? `0${sliderImgs.length}` : sliderImgs.length;

  const sliderShow = (n) => {
    if (n > sliderImgs.length) {
      sliderCount = 1;
    }

    if (n < 1) {
      sliderCount = sliderImgs.length;
    }

    sliderImgs.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    sliderImgs[sliderCount - 1].classList.remove('hide');
    sliderImgs[sliderCount - 1].classList.add('show', 'fade');

    currentSlide.textContent =
      sliderCount < 10 ? `0${sliderCount}` : sliderCount;
  };

  sliderShow(sliderCount);

  const plusSlides = (n) => {
    sliderShow((sliderCount += n));
  };

  prevSlider.addEventListener('click', () => plusSlides(-1));
  nextSlider.addEventListener('click', () => plusSlides(1));
});
