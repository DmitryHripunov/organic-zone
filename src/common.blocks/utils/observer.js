document.addEventListener('DOMContentLoaded', () => {
  const mobileButtons = document.querySelector('.mobile-buttons');
  const shortInfo = document.querySelector('.short-info');

  if (mobileButtons) {
    const observer = new IntersectionObserver(((entries) => {
      if (entries[0].isIntersecting) {
        mobileButtons.classList.add('is-hidden');
      } else {
        mobileButtons.classList.remove('is-hidden');
      }
    }), {
      rootMargin: '10px',
    });

    const targetEl = document.querySelector('.footer__info-policy');

    observer.observe(targetEl);
  }

  if (shortInfo) {
    const observer = new IntersectionObserver(((entries) => {
      if (entries[0].isIntersecting) {
        shortInfo.classList.add('is-hidden');
        shortInfo.classList.remove('is-visible');
      } else {
        shortInfo.classList.remove('is-hidden');
        shortInfo.classList.add('is-visible');
      }
    }), {
      rootMargin: '200px',
    });

    const targetEl = document.querySelector('.product-page__top-wrapper');

    observer.observe(targetEl);
  }
});
