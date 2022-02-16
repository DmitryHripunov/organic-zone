const galleryThumbs = new Swiper('.js-product-thumbs', {
  spaceBetween: 16,
  slidesPerView: 'auto',
  loop: true,
  loopedSlides: 'auto',
  direction: 'vertical',
  freeMode: true,
  watchSlidesProgress: true,
});


const heroSwiper = new Swiper('.js-product-slider', {
  loop: true,
  slidesPerView: 1,

  breakpoints: {
    1024: {
      pagination: {
        el: '.product-slider__swiper-pagination',
      },
    },
  },

  thumbs: {
    swiper: galleryThumbs,
  },

});
export default heroSwiper;
