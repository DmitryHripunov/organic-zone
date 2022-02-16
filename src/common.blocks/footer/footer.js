const footerNavBtn = $('.js-open-nav');
const footerNavContent = $('.footer__link-list');

if ($(window).width() < 1024) {
  footerNavBtn.on('click', (e) => {
    const curTarget = e.currentTarget;
    const slideItem = $(curTarget).siblings(footerNavContent);
    $(curTarget).toggleClass('is-active');
    slideItem.slideToggle(200);
  });
}
