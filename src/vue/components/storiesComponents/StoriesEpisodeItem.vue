<template>
  <div class="stories__episode-item">
    <video
      class="stories__video js-video"
      :src="episode.src"
      v-if="videoEpisode"
      playsinline
      :muted="muted && videoEpisode"
    >
      <source :src="episode.src" type="video/mp4" />
    </video>

    <img class="stories__poster js-poster" v-else :src="episode.src" />

    <button v-if="videoEpisode" class="stories__sound-btn" @click="changeMuted">
      <svg class="icon icon_size-24 icon_color-white">
        <use v-if="muted" xlink:href="#disabledSound"></use>
        <use v-else xlink:href="#sound"></use>
      </svg>
    </button>

    <div @click="nextStory" class="stories__next-btn js-story-next"></div>
    <div @click="prevStory" class="stories__prev-btn js-story-prev"></div>
  </div>
</template>

<script>
export default {
  props: ["episode"],

  data() {
    return {
      muted: true,
    };
  },

  computed: {
    videoEpisode() {
      return this.episode.src.endsWith(".mp4");
    },
  },

  methods: {
    changeMuted() {
      this.muted = !this.muted;
    },

    nextStory() {
      this.$parent.$parent.$refs.storiesInnerSlider.swiper.slideNext(500, true);
    },

    prevStory() {
      this.$parent.$parent.$refs.storiesInnerSlider.swiper.slidePrev(500, true);
    }
  }
};
</script>