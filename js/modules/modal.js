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

export default modal;
export { closeModal, modalShow };
