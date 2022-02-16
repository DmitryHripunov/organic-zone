<template>
  <div class="swiper-container" ref="storiesInnerSlider" style="height: 100%">

    <div class="swiper-wrapper">
      <div
        class="swiper-slide stories__swiper-slide"
        v-for="(story, currentId) in stories"
        :key="currentId"
      >
        <div class="stories__stories-item">
          <div class="stories__stories-info">
            <img class="stories__stories-img swiper-lazy" :src="story.image" alt="#" />
            <span
              ><strong>{{ story.category }}</strong></span
            >
            <span>{{ story.date }}</span>
          </div>

          <transition name="fade">
            <StoriesEpisodeList :story="story" :key="computedKey"/>
          </transition>
          
          <a v-if="story.link" :href="story.link"  class="btn btn_primary stories__stories-btn"
            >За покупками!</a
          >
        </div>
      </div>

    </div>
        <div class="swiper-button-next stories__stories-next"></div>
        <div class="swiper-button-prev stories__stories-prev"></div>
  </div>
</template>

<script>
import StoriesEpisodeList from "./StoriesEpisodeList.vue";
import { mapGetters, mapActions } from "vuex";
import Preloader from "../services/Preloader.vue";

export default {
  components: { StoriesEpisodeList, Preloader },
  data () {
    return {
      computedKey: 0,
    }
  },

  computed: {
    ...mapGetters("stories", ["stories"]),

    getActiveStoryId() {
      const foundStory = this.stories.find((i) => i.active);
      return foundStory.id;
    },
    getActiveStories() {
      const foundStory = this.stories.find((i) => i.id);
      return foundStory;
    },
  },

  methods: {
    ...mapActions("stories", ["changeActiveStory"]),

    initInnerSlider() {
      if (this.storiesInnerSlider) {
        // this.storiesInnerSlider.destroy();
      }

      this.storiesInnerSlider = new Swiper(this.$refs.storiesInnerSlider, {
        slidesPerView: 3,
        spaceBetween: 64,
        centeredSlides: true,

        navigation: {
          nextEl: ".stories__stories-next",
          prevEl: ".stories__stories-prev",
        },

        breakpoints: {
          762: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
        },

        on: {
          slideChange: () => {
            this.destroySlider();
            this.storiesInnerSlider.updateSlides();
          },
        },
      });
    },
    destroySlider() {
      this.computedKey++;
    }
  },

  mounted() {
    this.initInnerSlider();
    this.storiesInnerSlider.slideTo(this.getActiveStoryId - 1, 200);
  },
  updated() {
    // this.initInnerSlider();
  },
  beforeDestroy() {
    // this.storiesInnerSlider.destroy();
  },
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  animation: showIn .2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@keyframes showIn {
  0% {
    opacity: 0;
    height: 0;
  }

  100% {
    opacity: 1;
    height: auto;  
  }
}
</style>