const closePopup = (id) => {
  if (document.getElementById(id).classList.contains('is-opened')) {
    document.getElementById(id).classList.remove('is-opened');
    document.getElementById(id).setAttribute('aria-hidden', true);
  }

  document.body.style.paddingRight = '';
  document.body.classList.remove('no-scrolling');
};

export default closePopup;
