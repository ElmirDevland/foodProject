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

export default calc;
