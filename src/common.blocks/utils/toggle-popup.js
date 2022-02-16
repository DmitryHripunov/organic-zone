function hide(toggle, content, body, hideElem = null) {
  toggle.setAttribute('aria-expanded', false);
  content.setAttribute('aria-hidden', true);

  if (toggle.classList.contains('is-active')) {
    body.classList.remove('no-scrolling');
    body.style.paddingRight = '';
    toggle.classList.remove('is-active');
    content.classList.remove('is-opened');
    if (hideElem) hideElem.classList.remove('is-hidden');
  }
}

function show(toggle, content, body, focus = null, hideElem = null) {
  toggle.setAttribute('aria-expanded', true);
  content.setAttribute('aria-hidden', false);

  body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
  body.classList.add('no-scrolling');
  toggle.classList.add('is-active');
  content.classList.add('is-opened');
  if (focus) focus.focus();
  if (hideElem) hideElem.classList.add('is-hidden');
}

export { hide, show };

