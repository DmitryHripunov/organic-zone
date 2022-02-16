<template>
  <div class="stories">
    <div class="swiper-container stories__swiper" ref="storiesSlider">
      <div class="swiper-wrapper stories__swiper-wrapper">
        <div
          class="swiper-slide stories__slide"
          v-for="(story, index) in stories"
          :key="story[index]"
        >
          <button
            class="stories__btn"
            @click.prevent="makeOpenPopup(story)"
            :style="{ background: `url(${story.image}) center/cover` }"
            :class="{ 'stories__btn_viewed':  story.viewed}"
          ></button>

          <div class="stories__category">{{ story.category }}</div>
        </div>
      </div>
    </div>

    <div class="stories__popup" v-if="openPopup">
      <div class="stories__content">
        <button class="stories__popup-close" @click.prevent="makeClosePopup">
          <svg class="icon icon_size-24 icon_color-white">
            <use xlink:href="#close"></use>
          </svg>
        </button>

        <Preloader  v-if="loading" />

        <StoriesList v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Preloader from "../services/Preloader.vue";

export default {
  components: {
    Preloader,
    StoriesList: () => import("./StoriesList.vue"),
  },

  data() {
    return {
      openPopup: false,
      loading: false,
    };
  },

  computed: {
    ...mapGetters("stories", ["stories"]),
  },

  methods: {
    ...mapActions("stories", ["changeActiveStory"]),

    makeOpenPopup(story) {
      this.loading = true; 
      setTimeout(() => { // имитация загрузки сторис
        this.loading = false;
          this.changeActiveStory(story)
          this.makeStoryViewed(story)
      }, 1000);

      document.body.style.paddingRight = `${
        window.innerWidth - document.documentElement.clientWidth
      }px`;
      document.body.classList.add("no-scrolling_overlay");
      this.openPopup = true;
    },
    makeStoryViewed(story) {
      story.viewed = true;
    },
    makeClosePopup() {
      document.body.style.paddingRight = null;
      document.body.classList.remove("no-scrolling_overlay");
      this.openPopup = false;
      this.storiesSlider.destroy();
    },

    initSlider() {
      if (this.storiesSlider) {
        this.storiesSlider.destroy();
      }

      this.storiesSlider = new Swiper(this.$refs.storiesSlider, {
        slidesPerView: 10 | 'auto',
        spaceBetween: 4,
        breakpoints: {
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 'auto',
          },
        },
      });
    },
  },

  mounted() {
    this.initSlider();
  },
  updated() {
    this.initSlider();
  },
  beforeDestroy() {
    this.storiesSlider.destroy();
  },
};
</script>