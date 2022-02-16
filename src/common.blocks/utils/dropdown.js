export default function dropdown(buttons, items) {
  buttons.forEach((btn) => {
    const dropDownContent = document.querySelector(btn.dataset.target);

    btn.addEventListener('click', (event) => {
      event.preventDefault();
      // eslint-disable-next-line no-underscore-dangle
      event._isClickWithinDropDown = true;
      if (dropDownContent.classList.contains('is-visible')) {
        dropDownContent.classList.remove('is-visible');
        btn.classList.remove('is-active');
        return;
      }

      btn.classList.add('is-active');
      dropDownContent.classList.add('is-visible');
    });

    items.forEach((dropDownEl) => {
      dropDownEl.addEventListener('click', (event) => {
        // eslint-disable-next-line no-underscore-dangle
        event._isClickWithinDropDown = true;
      });
    });

    document.body.addEventListener('click', (event) => {
      // eslint-disable-next-line no-underscore-dangle
      if (event._isClickWithinDropDown) return;
      items.forEach((dropDownEl) => {
        dropDownEl.classList.remove('is-visible');
      });
      buttons.forEach((btnEl) => {
        btnEl.classList.remove('is-active');
      });
    });
  });
}
