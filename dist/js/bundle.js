/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  const result = document.querySelector('.calculating__result span');

  let sex;
  let ratio;
  let weight;
  let height;
  let age;

  sex = localStorage.getItem('sex') ? localStorage.getItem('sex') : 'female';
  ratio = localStorage.getItem('ratio') ? localStorage.getItem('ratio') : 1.375;

  localStorage.setItem('sex', sex);
  localStorage.setItem('ratio', ratio);

  function totalCalc() {
    if (!sex || !ratio || !weight || !height || !age) {
      result.textContent = '---- ';
      return;
    }

    if (sex) {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    }

    if (sex == 'male') {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  totalCalc();
  function getStaticInfo(selector, activeClass) {
    const element = document.querySelectorAll(selector);

    element.forEach((el) => {
      el.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }

        element.forEach((el) => el.classList.remove(activeClass));
        e.target.classList.add(activeClass);
        totalCalc();
      });
    });
  }

  function getDynamicInfo(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      totalCalc();
    });
  }

  function initLocalSettings(selector, activeClass) {
    const element = document.querySelectorAll(selector);

    element.forEach((el) => {
      el.classList.remove(activeClass);

      if (localStorage.getItem('sex') == el.getAttribute('id')) {
        el.classList.add(activeClass);
      }

      if (localStorage.getItem('ratio') == el.getAttribute('data-ratio')) {
        el.classList.add(activeClass);
      }
    });
  }

  getStaticInfo('#gender div', 'calculating__choose-item_active');
  getStaticInfo(
    '.calculating__choose_big div',
    'calculating__choose-item_active'
  );

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings(
    '.calculating__choose_big div',
    'calculating__choose-item_active'
  );

  getDynamicInfo('#height');
  getDynamicInfo('#weight');
  getDynamicInfo('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
  class Menu {
    constructor(img, alt, title, descr, price, selector, ...classes) {
      this.img = img;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(selector);
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

  axios.get('http://localhost:3000/menu').then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new Menu(img, altimg, title, descr, price, '.menu .container');
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(formSelector) {
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Thank You!',
    failure: 'Oops...',
  };

  forms.forEach((i) => bindPostData(i));

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

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__["default"])('http://localhost:3000/requests', json)
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

    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalShow)('.modal');

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
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 1650);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "modalShow": () => (/* binding */ modalShow)
/* harmony export */ });
function modalShow(modalSelector, timerID) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';

  if (timerID) {
    clearInterval(timerID);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function modal(modalSelector, triggerSelector, timerID) {
  const modal = document.querySelector(modalSelector);
  const modalTrigger = document.querySelectorAll(triggerSelector);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      modalShow(modalSelector, timerID);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  modalTrigger.forEach((btns) => {
    btns.addEventListener('click', () => modalShow(modalSelector, timerID));
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('show') && e.code == 'Escape') {
      closeModal(modalSelector);
    }
  });

  window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
  container,
  wrapper,
  field,
  slide,
  prev,
  next,
  current,
  totalCounter,
}) {
  const slider = document.querySelector(container);
  const sliderWrapper = document.querySelector(wrapper);
  const sliderField = document.querySelector(field);
  const slides = document.querySelectorAll(slide);
  const prevSlider = document.querySelector(prev);
  const nextSlider = document.querySelector(next);
  const currentSlide = document.querySelector(current);
  const totalSlider = document.querySelector(totalCounter);
  const indicators = document.createElement('ol');
  const width = window.getComputedStyle(sliderWrapper).width;

  const dots = [];

  slider.style.position = 'relative';

  indicators.classList.add('carousel-indicators');

  slider.append(indicators);

  let slideNum = 1;
  let offset = 0;

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');

    indicators.append(dot);
    dots.push(dot);
  }

  const listenCurrentSlide = () => {
    currentSlide.textContent = slideNum < 10 ? `0${slideNum}` : slideNum;
  };

  listenCurrentSlide();

  const dotsOpacity = () => {
    dots.forEach((dot) => (dot.style.opacity = 0.5));
    dots[slideNum - 1].style.opacity = 1;
  };

  dotsOpacity();

  sliderWrapper.style.overflow = 'hidden';

  sliderField.style.cssText = `
  display: flex;
  width: ${100 * slides.length}%;
  transition: 0.5s all;
  `;

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  totalSlider.textContent =
    slides.length < 10 ? `0${slides.length}` : slides.length;

  function converToANumber(data) {
    return +data.replace(/\D/g, '');
  }

  const switchNextSlider = () => {
    if (offset == converToANumber(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += converToANumber(width);
    }

    sliderField.style.transform = `translateX(-${offset}px)`;

    if (slideNum == slides.length) {
      slideNum = 1;
    } else {
      slideNum++;
    }

    dotsOpacity();
    listenCurrentSlide();
  };

  const switchPrevSlider = () => {
    if (offset == 0) {
      offset += converToANumber(width) * (slides.length - 1);
    } else {
      offset -= converToANumber(width);
    }

    sliderField.style.transform = `translateX(-${offset}px)`;

    if (slideNum == 1) {
      slideNum = slides.length;
    } else {
      slideNum--;
    }

    dotsOpacity();
    listenCurrentSlide();
  };

  nextSlider.addEventListener('click', switchNextSlider);

  prevSlider.addEventListener('click', switchPrevSlider);

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');
      slideNum = slideTo;
      offset = converToANumber(width) * (slideTo - 1);

      sliderField.style.transform = `translateX(-${offset}px)`;

      dotsOpacity();
      listenCurrentSlide();
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) {
  const tabs = document.querySelectorAll(tabsSelector);
  const tabsContent = document.querySelectorAll(tabsContentSelector);
  const tabParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeClass);
  }
  hideTabContent();
  showTabContent();

  tabParent.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (postData);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _js_modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _js_modules_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../js/modules/form */ "./js/modules/form.js");
/* harmony import */ var _js_modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../js/modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _js_modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../js/modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _js_modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../js/modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _js_modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../js/modules/timer */ "./js/modules/timer.js");









document.addEventListener('DOMContentLoaded', () => {
  const modalTimer = setTimeout(() => (0,_js_modules_modal__WEBPACK_IMPORTED_MODULE_3__.modalShow)('.modal', modalTimer), 50000);

  (0,_js_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
    container: '.offer__slider',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
    slide: '.offer__slide',
    prev: '.offer__slider-prev',
    next: '.offer__slider-next',
    current: '#current',
    totalCounter: '#total',
  });

  (0,_js_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])(
    '.tabheader__item',
    '.tabcontent',
    '.tabheader__items',
    'tabheader__item_active'
  );

  (0,_js_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('.modal', '[data-modal]', modalTimer);
  (0,_js_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2024-01-01');
  (0,_js_modules_form__WEBPACK_IMPORTED_MODULE_2__["default"])('form');
  (0,_js_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_js_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map