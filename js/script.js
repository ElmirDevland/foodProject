require('es6-promise').polyfill();

import 'nodelist-foreach-polyfill';

import calc from '../js/modules/calc';
import cards from '../js/modules/cards';
import form from '../js/modules/form';
import modal from '../js/modules/modal';
import slider from '../js/modules/slider';
import tabs from '../js/modules/tabs';
import timer from '../js/modules/timer';
import { modalShow } from '../js/modules/modal';

document.addEventListener('DOMContentLoaded', () => {
  const modalTimer = setTimeout(() => modalShow('.modal', modalTimer), 50000);

  slider({
    container: '.offer__slider',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
    slide: '.offer__slide',
    prev: '.offer__slider-prev',
    next: '.offer__slider-next',
    current: '#current',
    totalCounter: '#total',
  });

  tabs(
    '.tabheader__item',
    '.tabcontent',
    '.tabheader__items',
    'tabheader__item_active'
  );

  modal('.modal', '[data-modal]', modalTimer);
  timer('.timer', '2024-01-01');
  form('form');
  cards();
  calc();
});
