import { closeModal, modalShow } from './modal';
import postData from '../services/services';

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

    modalShow('.modal');

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
      closeModal('.modal');
    }, 1650);
  }
}

export default form;
