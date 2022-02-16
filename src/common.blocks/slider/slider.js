if (document.querySelector('.slider') !== null) {
  document.querySelectorAll('.js-slider').forEach((n) => {
    // eslint-disable-next-line no-unused-vars
    const sliderSwiper = new Swiper(n.querySelector('.js-slider-swiper'), {
      pagination: {
        el: n.querySelector('.slider__swiper-pagination'),
      },
      slidesPerView: 6,
      slidesPerColumn: 2,
      spaceBetween: 40,
      breakpoints: {
        580: {
          slidesPerView: 2,
          slidesPerColumn: 1,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 16,
          slidesPerColumn: 1,
        },
        1024: {
          slidesPerView: 5,
          slidesPerColumn: 1,
        },
      },
    });
  });
  document.querySelectorAll('.js-slider-short').forEach((n) => {
    // eslint-disable-next-line no-unused-vars
    const sliderShortSwiper = new Swiper(n.querySelector('.js-slider-swiper-short'), {
      pagination: {
        el: n.querySelector('.slider__swiper-pagination'),
      },
      slidesPerView: 4,
      slidesPerColumn: 2,
      spaceBetween: 40,
      breakpoints: {
        580: {
          slidesPerView: 2,
          slidesPerColumn: 1,
        },
        1024: {
          slidesPerColumn: 1,
          slidesPerView: 4,
          spaceBetween: 16,
        },
        1280: {
          slidesPerView: 3,
        },
      },
    });
  });

  document.querySelectorAll('.js-slider-line').forEach((n) => {
    // eslint-disable-next-line no-unused-vars
    const sliderLineSwiper = new Swiper(n.querySelector('.js-slider-swiper'), {
      pagination: {
        el: n.querySelector('.slider__swiper-pagination'),
      },
      navigation: {
        nextEl: '.slider__swiper-button-next',
        prevEl: '.slider__swiper-button-prev',
      },

      slidesPerView: 5,
      spaceBetween: 40,
      breakpoints: {
        580: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 16,
        },
      },
    });
  });

  document.querySelectorAll('.js-slider-line-inner').forEach((n) => {
    // eslint-disable-next-line no-unused-vars
    const sliderLineSwiper = new Swiper(n.querySelector('.js-slider-swiper'), {
      pagination: {
        el: n.querySelector('.slider__swiper-pagination'),
      },
      navigation: {
        nextEl: '.slider__swiper-button-next',
        prevEl: '.slider__swiper-button-prev',
      },

      slidesPerView: 4,
      spaceBetween: 40,
      breakpoints: {
        580: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  });
}
