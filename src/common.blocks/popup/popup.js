import { show, hide } from '../utils/toggle-popup';

const bodyEl = document.body;
const popupOpenBtn = document.querySelectorAll('.js-open-popup');
const closeAllPopup = document.querySelectorAll('.js-close-popup');

const deferredPopup = document.querySelector('.js-confirm-city');

if (popupOpenBtn.length && popupOpenBtn) {
  popupOpenBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const popupContent = document.querySelector(btn.dataset.target);
      const focusInput = popupContent.querySelector('.js-focus-input');

      e.preventDefault();
      e.stopPropagation();
      // eslint-disable-next-line no-unused-expressions
      JSON.parse(btn.getAttribute('aria-expanded'))
        ? hide(btn, popupContent, bodyEl, deferredPopup)
        : show(btn, popupContent, bodyEl, focusInput);

      const handleClosure = event =>
        !popupContent.contains(event.target)
        && hide(btn, popupContent, bodyEl, deferredPopup);


      closeAllPopup.forEach((close) => {
        close.addEventListener('click', () => {
          btn.setAttribute('aria-expanded', false);
          btn.classList.remove('is-active');
          popupContent.setAttribute('aria-hidden', true);
          popupContent.classList.remove('is-opened');
          bodyEl.classList.remove('no-scrolling');
          bodyEl.style.paddingRight = '';
        });
      });

      window.addEventListener('mousedown', handleClosure);
      window.addEventListener('touchstart', handleClosure);
      window.addEventListener('focusin', handleClosure);
    });
  });
}

const questionCity = document.getElementById('confirm-city');
const closeConfirmCity = document.querySelectorAll('.js-close-confirm-city');

if (questionCity) {
  closeConfirmCity.forEach((close) => {
    close.addEventListener('click', () => {
      close.setAttribute('aria-expanded', false);
      questionCity.setAttribute('aria-hidden', true);
      questionCity.classList.remove('is-opened');
      bodyEl.classList.remove('no-scrolling');
    });
  });

  window.addEventListener('load', () => {
    setTimeout(() => {
      // const classOpened = document.querySelectorAll('.is-opened');
      // if (classOpened && classOpened.length > 0) {
      //   classOpened.forEach((el) => {
      //     el.classList.remove('is-opened');
      //   });
      // }

      // const classActive = document.querySelectorAll('.is-active');
      // if (classActive && classActive.length > 0) {
      //   classActive.forEach((el) => {
      //     el.classList.remove('is-active');
      //   });
      // }

      // questionCity.classList.add('is-opened'); Перенес в CityConfirm.vue
      deferredPopup.querySelector('.js-open-popup').addEventListener('click', () => {
        closeAllPopup.forEach((close) => {
          close.setAttribute('aria-expanded', false);
          questionCity.setAttribute('aria-hidden', true);
          questionCity.classList.remove('is-opened');
        });
      });

      const confirmCityIsOpened = document.querySelector('.js-confirm-city.is-opened');
      if (confirmCityIsOpened) {
        confirmCityIsOpened.addEventListener('click', (e) => {
          // eslint-disable-next-line no-underscore-dangle
          e._isClickWithinDropDown = true;
        });
      }

      if (!questionCity.classList.contains('is-opened')) return;
      document.body.addEventListener('click', (e) => {
        // eslint-disable-next-line no-underscore-dangle
        if (e._isClickWithinDropDown) return;

        closeAllPopup.forEach((close) => {
          close.setAttribute('aria-expanded', false);
          questionCity.setAttribute('aria-hidden', true);
        });
      });
    }, 400);
  });
}
