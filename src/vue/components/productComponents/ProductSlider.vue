<template>
  <div class="product-page__slider">
    <div class="product-slider">
      <div class="swiper-container product-slider__thumbs" ref="thumb">
        <div class="swiper-wrapper product-slider__thumbs-wrapper">
          <img class="swiper-slide product-slider__thumbs-slide"
            v-for="thumb in this.activeOffer.images" :key="thumb.id"
            :src="thumb.value"
            :alt="activeOffer.title">
        </div>
      </div>

      <div class="swiper-container" ref="slider">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
            v-for="img in this.activeOffer.images" :key="img.id"
          >
            <picture class="product-slider__swiper-picture">
              <img class="product-slider__swiper-img"
                :src="img.value"
                :alt="activeOffer.title"
              />
            </picture>
          </div>
        </div>

        <div class="product-slider__swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        update: false,
      }
    },
    computed: {
      ...mapGetters("product", ["activeOffer"]),
    },
    methods: {
      initSlider() {
        if (this.slider && this.thumb) {
          this.slider.destroy();
          this.thumb.destroy();
        }

        this.thumb = new Swiper(this.$refs.thumb, {
          spaceBetween: 16,
          slidesPerView: 'auto',
          loop: true,
          loopedSlides: 'auto',
          direction: 'vertical',
          freeMode: true,
          watchSlidesProgress: true,
        });

        this.slider = new Swiper(this.$refs.slider, {
          // loop: true,
          slidesPerView: 1,
          spaceBetween: 24,

          breakpoints: {
            1024: {
              pagination: {
                el: '.product-slider__swiper-pagination',
              },
            },
          },
          thumbs: {
            swiper: this.thumb,
          },
        });
      }
    },

    mounted() {
      this.initSlider();
    },
    updated() {
      this.initSlider();
    },
    beforeDestroy() {
      this.thumb.destroy();
      // this.thumb.destroy();
    },
  };
</script>