function show(toggle, content, focus) {
  toggle.setAttribute('aria-expanded', true);
  content.setAttribute('aria-hidden', false);

  toggle.classList.add('is-active');
  toggle.querySelector('.js-search-svg').setAttribute('xlink:href', '#close-2');

  content.classList.add('is-opened');
  focus.focus();
}

function hide(toggle, content) {
  toggle.setAttribute('aria-expanded', false);
  content.setAttribute('aria-hidden', true);

  if (toggle.classList.contains('is-active')) {
    toggle.classList.remove('is-active');
    toggle.querySelector('.js-search-svg').setAttribute('xlink:href', '#search');
    content.classList.remove('is-opened');
  }
}

const searchToggleBtn = document.querySelectorAll('.js-search-top-btn');
const searchContent = document.querySelector('.js-search-form');
const searchInput = document.querySelector('.search-top__input');

searchToggleBtn.forEach((toggleBtn) => {
  const handleBtn = (event) => {
    event.stopPropagation();
    // eslint-disable-next-line no-unused-expressions
    JSON.parse(toggleBtn.getAttribute('aria-expanded')) ? hide(toggleBtn, searchContent) : show(toggleBtn, searchContent, searchInput);
  };

  toggleBtn.addEventListener('click', handleBtn);

  const handleClosure = event =>
    !searchContent.contains(event.target) && hide(toggleBtn, searchContent);

  window.addEventListener('click', handleClosure);
  window.addEventListener('focusin', handleClosure);
});

