const sliderSwiper = new Swiper('.js-partners-swiper', {
  slidesPerView: 7,
  spaceBetween: 50,
  navigation: {
    nextEl: '.partners__swiper-button-next',
    prevEl: '.partners__swiper-button-prev',
  },
  breakpoints: {
    1024: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 2,
    },
  },
});

const partnersInner = new Swiper('.js-partners-inner-swiper', {
  slidesPerView: 4,
  spaceBetween: 60,
  navigation: {
    nextEl: '.partners__swiper-button-next',
    prevEl: '.partners__swiper-button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
  },
});

export default { sliderSwiper, partnersInner };
