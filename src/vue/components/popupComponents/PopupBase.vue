<template >
  <div v-if="open">
    <div @click="onOtsideCkick" class="base-popup"></div>

    <div ref="content" class="popup popup_fill popup_middle"
      :class="{ 'is-opened': open }">
      <div class="popup__wrapper">  
        <div class="popup__top">
        <h3 class="title title_h3 title title_indent-sm">{{ titlePopup }}</h3>

        <button
            class="popup__close js-close-popup"
            @click.prevent="doClose"
          ></button>
        </div>

        <slot />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['open', 'title'],

  computed: {
    titlePopup() {
      return this.title;
    }
  },

  methods: {
    doClose() {
      document.body.style.paddingRight = null;
      document.body.classList.remove('no-scrolling');
      this.$emit('update:open', false);
    },

    onOtsideCkick($event) {
      if ($event.target !== this.$refs.content) {
        document.body.style.paddingRight = null;
        document.body.classList.remove('no-scrolling');
        this.doClose();
      }
    },

    checkBlackoutstate() {
      if (!openCount) {
        atlesOneopen = false;
        document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
        document.body.classList.add('no-scrolling');
      } else if (!atlesOneopen && openCount === 1) {
        atlesOneopen = true;
        document.body.style.paddingRight = null;
        document.body.classList.remove('no-scrolling');
      }
    }
  },

  watch: {
    isOpen: {
      handler(isOpen) {
        if (isOpen) {
          openCount += 1;
        } else {
          openCount -= 1;
        }

        this.checkBlackoutstate();
      }
    }
  },
  created() {
    if (this.open) {
      openCount += 1;
      this.checkBlackoutstate();
    }
  }
}
</script>

<style>
  .base-popup {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 11;
  }
</style>