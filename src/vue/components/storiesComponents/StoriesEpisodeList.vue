<template>
  <div
    class="swiper-container js-episode-swiper"
    ref="episodeSlider"
    style="height: 100%; position: relative"
  >
    <div class="swiper-wrapper js-wrapper">
      <div
        class="swiper-slide js-episode-slide"
        v-for="episode in story.episodes"
        :key="episode.episodeId"
      >
        <StoriesEpisodeItem :episode="episode" />
      </div>
    </div>

    <div
      class="
        swiper-pagination
        stories__episodes-pagination
        js-episodes-pagination
      "
    ></div>

    <div class="swiper-button-next stories__episodes-next"></div>
    <div class="swiper-button-prev stories__episodes-prev"></div>
  </div>
</template>

<script>
import StoriesEpisodeItem from "./StoriesEpisodeItem.vue";
import { mapGetters } from "vuex";

export default {
  props: ["story", "slide"],

  data() {
    return {
      currentKey: 0,
    };
  },

  components: { StoriesEpisodeItem },

  methods: {
    episodeMethods() {
      const swiperElement = this.episodeSlider.el;

      const activeVideo = this.episodeSlider.slides[
        this.episodeSlider.realIndex
      ].querySelector(".swiper-slide-active .js-video");
      const slidePrevVideo =
        this.episodeSlider.slides[
          this.episodeSlider.previousIndex
        ].querySelector(".js-video");

      const slidePrevPoster =
        this.episodeSlider.slides[
          this.episodeSlider.previousIndex
        ].querySelector(".js-poster");

      const activePoster = this.episodeSlider.slides[
        this.episodeSlider.realIndex
      ].querySelector(".swiper-slide-active .js-poster");

      const resetVideo = () => {
        if (slidePrevVideo) {
          slidePrevVideo.pause();
          slidePrevVideo.currentTime = 0;
        }
        if (
          bullet
            .querySelector(".stories__episode-progress-bar")
            .classList.contains("stories__episode-progress-bar_finished")
        ) {
          bullet
            .querySelector(".stories__episode-progress-bar")
            .classList.remove("stories__episode-progress-bar_finished");
        }
      };

      const resetPoster = () => {
        if (
          bullet
            .querySelector(".stories__episode-progress-bar")
            .classList.contains("stories__episode-progress-bar_poster")
        ) {
          bullet
            .querySelector(".stories__episode-progress-bar")
            .classList.remove("stories__episode-progress-bar_poster");
        }
      };

      const bullet = swiperElement.querySelector(
        ".swiper-pagination-bullet.swiper-pagination-bullet-active"
      );

      const progressBar = document.createElement("span");

      if (bullet && !bullet.childNodes.length) {
        progressBar.classList.add("stories__episode-progress-bar");
        progressBar.style.background = "#878a83";
        bullet.append(progressBar);
      }

      if (activeVideo) {
        let videoPlay = activeVideo.play();

        if (videoPlay !== undefined) {
          const bulletVideo = bullet.querySelector(
            ".stories__episode-progress-bar"
          );
          videoPlay
            .then(() => {
              activeVideo.ontimeupdate = () => {
                bulletVideo.style.animationDuration =
                  activeVideo.duration + "s";
                bulletVideo.style.background = "#fff";

                if (activeVideo.ended) {
                  setTimeout(() => {
                    bulletVideo.classList.add(
                      "stories__episode-progress-bar_finished"
                    );
                  }, 0);

                  this.episodeSlider.slideNext(500, true);
                  activeVideo.pause();
                }

                if (
                  document.querySelectorAll(".stories__episode-item")[
                    document.querySelectorAll(".stories__episode-item").length -
                      1
                  ] &&
                  activeVideo &&
                  activeVideo.ended
                ) {
                  this.$parent.$refs.storiesInnerSlider.swiper.slideNext(
                    500,
                    true
                  );
                }

                activeVideo.addEventListener(
                  "touchstart",
                  (e) => {
                    e.preventDefault();
                    if (bulletVideo) {
                      bulletVideo.style.animationPlayState = "paused";
                    }
                    activeVideo.pause();
                  },
                  { passive: false }
                );
                activeVideo.addEventListener(
                  "touchend",
                  (e) => {
                    e.preventDefault();

                    if (bulletVideo && !activeVideo.ended) {
                      bulletVideo.style.animationPlayState = "";
                    } else {
                      bulletVideo.classList.remove(
                        "stories__episode-progress-bar_finished"
                      );
                    }
                    activeVideo.play();
                  },
                  { passive: false }
                );

                activeVideo.addEventListener(
                  "mousedown",
                  () => {
                    activeVideo.pause();
                    if (bulletVideo) {
                      bulletVideo.style.animationPlayState = "paused";
                    }
                  },
                  { passive: true }
                );
                activeVideo.addEventListener(
                  "mouseup",
                  () => {
                    if (bulletVideo && !activeVideo.ended) {
                      bulletVideo.style.animationPlayState = "";
                    } else {
                      bulletVideo.classList.remove(
                        "stories__episode-progress-bar_finished"
                      );
                    }
                    activeVideo.play();
                  },
                  { passive: true }
                );
              };
            })
            .catch(() => {
              // в случае ошибки видео, анимация не останавливается
              // по завершению анимации просто переключаем слайдер
              if (activeVideo.ended) {
                setTimeout(() => {
                  bulletVideo.classList.add(
                    "stories__episode-progress-bar_finished"
                  );
                }, 0);

                this.episodeSlider.slideNext(500, true);
                activeVideo.pause();
              }
            });
          if (slidePrevVideo || slidePrevPoster) {
            resetVideo();
            resetPoster();
            bulletVideo.style.animationDuration = "none";
          }
        }
      }

      if (activePoster) {
        progressBar.classList.add("stories__episode-progress-bar_poster");

        const bulletPoster = bullet.querySelector(
          ".stories__episode-progress-bar.stories__episode-progress-bar_poster"
        );

        if (bulletPoster) {
          bulletPoster.style.animationDuration = 5 + "s";
          bulletPoster.style.background = "#fff";

          const lastIndexEl =
            swiperElement.querySelectorAll(".js-episode-slide");

          const lastIndexBullet = swiperElement.querySelectorAll(
            ".stories__episode-progress-bar"
          );

          bulletPoster.addEventListener("animationend", () => {
            bulletPoster.classList.add(
              "stories__episode-progress-bar_finished"
            );

            if (lastIndexEl.length - 1 === lastIndexBullet.length - 1) {
              this.$parent.$refs.storiesInnerSlider.swiper.slideNext(500, true);
            }

            return this.episodeSlider.slideNext(500, true);
          });
        }

        activePoster.addEventListener(
          "touchstart",
          (e) => {
            e.preventDefault();
            if (bulletPoster) {
              bulletPoster.style.animationPlayState = "paused";
            }
          },
          { passive: false }
        );
        activePoster.addEventListener(
          "touchend",
          (e) => {
            e.preventDefault();
            if (bulletPoster) {
              bulletPoster.style.animationPlayState = "";
            }
          },
          { passive: false }
        );

        activePoster.addEventListener(
          "pointerdown",
          (e) => {
            if (bulletPoster) {
              bulletPoster.style.animationPlayState = "paused";
            }
          },
          { passive: true }
        );
        activePoster.addEventListener(
          "pointerup",
          () => {
            if (bulletPoster) {
              bulletPoster.style.animationPlayState = "";
            }
          },
          { passive: true }
        );

        if (slidePrevPoster || slidePrevVideo) {
          resetVideo();
          resetPoster();
          if (bulletPoster) {
            bulletPoster.style.animationDuration = 5 + "s";
          }
        }
      }

      // begin make colored prev bullet
      const prevBullet = swiperElement.querySelector(
        ".swiper-pagination-bullet.swiper-pagination-bullet-active"
      ).previousElementSibling;
      const nextBullet = swiperElement.querySelector(
        ".swiper-pagination-bullet.swiper-pagination-bullet-active"
      ).nextElementSibling;
      const activeBullet = swiperElement.querySelector(
        ".swiper-pagination-bullet.swiper-pagination-bullet-active"
      );

      if (
        bullet
          .querySelector(".stories__episode-progress-bar")
          .classList.contains("stories__episode-progress-bar_finished")
      ) {
        bullet
          .querySelector(".stories__episode-progress-bar")
          .classList.remove("stories__episode-progress-bar_finished");
      }

      if (prevBullet && prevBullet.childNodes.length) {
        prevBullet
          .querySelector(".stories__episode-progress-bar")
          .classList.add("stories__episode-progress-bar_finished");
      }

      if (nextBullet && nextBullet.childNodes.length) {
        nextBullet
          .querySelector(".stories__episode-progress-bar")
          .classList.add("stories__episode-progress-bar_delay");
      }

      if (
        activeBullet
          .querySelector(".stories__episode-progress-bar")
          .classList.contains("stories__episode-progress-bar_delay")
      ) {
        activeBullet
          .querySelector(".stories__episode-progress-bar")
          .classList.remove("stories__episode-progress-bar_delay");
      }
      // end make colored prev bullet
    },

    initEpisodeSlider() {
      if (this.episodeSlider) {
        // this.episodeSlider.destroy();
      }

      this.episodeSlider = new Swiper(this.$refs.episodeSlider, {
        slidesPerView: 1,
        allowTouchMove: false,

        pagination: {
          el: ".swiper-pagination",
        },

        navigation: {
          nextEl: ".stories__episodes-next",
          prevEl: ".stories__episodes-prev",
        },

        on: {
          slideChange: () => {
            this.episodeMethods();
          },
          once: () => {
            this.episodeMethods();
          },
        },
      });
    },
  },

  computed: {
    ...mapGetters("stories", ["stories"]),

    getStorySlider() {
      const foundStory = this.stories.find((i) => i.active);
      return foundStory;
    },
  },

  mounted() {
    this.initEpisodeSlider();

    if (this.episodeSlider.$wrapperEl[0].childNodes.length === 1) {
      setTimeout(() => {
        const singleIndexPoster = this.episodeSlider.slides[
          this.episodeSlider.realIndex
        ].querySelector(
          ".stories__swiper-slide.swiper-slide-active .swiper-slide-active .js-poster"
        );

        const singleIndexVideo = this.episodeSlider.slides[
          this.episodeSlider.realIndex
        ].querySelector(
          ".stories__swiper-slide.swiper-slide-active .swiper-slide-active .js-video"
        );

        const bullet = this.episodeSlider.el.querySelector(
          ".swiper-pagination-bullet-active"
        );
        const progressBar = document.createElement("span");
        bullet.append(progressBar);
        progressBar.classList.add("stories__episode-progress-bar");

        if (singleIndexPoster) {
          const bulletPoster = bullet.querySelector(
            ".stories__episode-progress-bar"
          );
          progressBar.style.animationDuration = 5 + "s";
          progressBar.style.background = "#fff";

          progressBar.addEventListener("animationend", () => {
            progressBar.classList.add("stories__episode-progress-bar_finished");
            return this.$parent.$refs.storiesInnerSlider.swiper.slideNext(
              500,
              true
            );
          });

          singleIndexPoster.addEventListener(
            "touchstart",
            (e) => {
              e.preventDefault();
              if (bulletPoster) {
                bulletPoster.style.animationPlayState = "paused";
              }
            },
            { passive: false }
          );
          singleIndexPoster.addEventListener(
            "touchend",
            (e) => {
              e.preventDefault();
              if (bulletPoster) {
                bulletPoster.style.animationPlayState = "";
              }
            },
            { passive: false }
          );

          singleIndexPoster.addEventListener(
            "pointerdown",
            (e) => {
              if (bulletPoster) {
                bulletPoster.style.animationPlayState = "paused";
              }
            },
            { passive: true }
          );
          singleIndexPoster.addEventListener(
            "pointerup",
            () => {
              if (bulletPoster) {
                bulletPoster.style.animationPlayState = "";
              }
            },
            { passive: true }
          );
        }

        if (singleIndexVideo) {
          let videoPlay = singleIndexVideo.play();

          if (videoPlay !== undefined) {
            const bulletVideo = bullet.querySelector(
              ".stories__episode-progress-bar"
            );
            videoPlay
              .then(() => {
                singleIndexVideo.ontimeupdate = () => {
                  bulletVideo.style.animationDuration =
                    singleIndexVideo.duration + "s";
                  bulletVideo.style.background = "#fff";

                  if (singleIndexVideo.ended) {
                    this.$parent.$refs.storiesInnerSlider.swiper.slideNext(500, true);
                  }

                  singleIndexVideo.addEventListener(
                    "touchstart",
                    (e) => {
                      e.preventDefault();
                      if (bulletVideo) {
                        bulletVideo.style.animationPlayState = "paused";
                      }
                      singleIndexVideo.pause();
                    },
                    { passive: false }
                  );
                  singleIndexVideo.addEventListener(
                    "touchend",
                    (e) => {
                      e.preventDefault();

                      if (bulletVideo && !singleIndexVideo.ended) {
                        bulletVideo.style.animationPlayState = "";
                      } else {
                        bulletVideo.classList.remove(
                          "stories__episode-progress-bar_finished"
                        );
                      }
                      singleIndexVideo.play();
                    },
                    { passive: false }
                  );

                  singleIndexVideo.addEventListener(
                    "mousedown",
                    () => {
                      singleIndexVideo.pause();
                      if (bulletVideo) {
                        bulletVideo.style.animationPlayState = "paused";
                      }
                    },
                    { passive: true }
                  );
                  singleIndexVideo.addEventListener(
                    "mouseup",
                    () => {
                      if (bulletVideo && !singleIndexVideo.ended) {
                        bulletVideo.style.animationPlayState = "";
                      } else {
                        bulletVideo.classList.remove(
                          "stories__episode-progress-bar_finished"
                        );
                      }
                      singleIndexVideo.play();
                    },
                    { passive: true }
                  );
                };
              })
              .catch(() => {
                // в случае ошибки видео, анимация не останавливается
                // по завершению анимации просто переключаем слайдер
                if (singleIndexVideo.ended) {
                  this.$parent.$refs.storiesInnerSlider.swiper.slideNext(500, true);
                  singleIndexVideo.pause();
                }
              });
            if (singleIndexVideo) {
              bulletVideo.style.animationDuration = "none";
            }
          }
        }
      }, 0);
    } else {
      setTimeout(() => {
        this.episodeSlider.slideTo(this.currentKey, 0);
      }, 0);
      this.episodeSlider.slideTo(1, 0);
    }
  },
  updated() {
    this.initEpisodeSlider();
  },
  destroy() {
    // this.episodeSlider.destroy();
  },
};
</script>