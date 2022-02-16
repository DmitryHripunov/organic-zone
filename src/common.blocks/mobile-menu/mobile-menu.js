const burgerBtn = document.querySelector('.js-burger-btn');
const navContent = document.querySelector(burgerBtn.dataset.target);
const mobileButtons = document.querySelector('.mobile-buttons');
const bodyEl = document.body;

function hide(toggle, content, body, hideElem = null) {
  toggle.setAttribute('aria-expanded', false);
  content.setAttribute('aria-hidden', true);

  if (toggle.classList.contains('is-active')) {
    body.classList.remove('no-scrolling_mobile');
    toggle.classList.remove('is-active');
    content.classList.remove('is-opened');
    if (hideElem) hideElem.classList.remove('is-hidden');
  }
}

function show(toggle, content, body, focus = null, hideElem = null) {
  toggle.setAttribute('aria-expanded', true);
  content.setAttribute('aria-hidden', false);

  body.classList.add('no-scrolling_mobile');
  toggle.classList.add('is-active');
  content.classList.add('is-opened');
  if (focus) focus.focus();
  if (hideElem) hideElem.classList.add('is-hidden');
}

if (burgerBtn) {
  burgerBtn.addEventListener('click', (event) => {
    event.stopPropagation();

    // eslint-disable-next-line no-unused-expressions
    JSON.parse(burgerBtn.getAttribute('aria-expanded'))
      ? hide(burgerBtn, navContent, bodyEl, mobileButtons)
      : show(burgerBtn, navContent, bodyEl, null, mobileButtons);
  });

  const handleClosure = event =>
    !navContent.contains(event.target) && hide(burgerBtn, navContent, bodyEl, mobileButtons);

  window.addEventListener('click', handleClosure);
  window.addEventListener('focusin', handleClosure);
}

