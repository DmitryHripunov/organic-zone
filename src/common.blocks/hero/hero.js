const heroSwiper = new Swiper('.js-hero-swiper', {
  loop: true,
  pagination: {
    el: '.hero__swiper-pagination',
  },

  navigation: {
    nextEl: '.hero__swiper-button-next',
    prevEl: '.hero__swiper-button-prev',
  },
});
export default heroSwiper;

