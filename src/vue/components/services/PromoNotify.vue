<template>
  <div class="header-offer" v-if="isShow">
    <div class="container">
      <div class="header-offer__wrapper">
        <a :href="link" v-text="text" class="header-offer__text"> </a>

        <button @click="onClose" class="header-offer__btn js-header-offer-btn">
          <svg class="icon icon_color-white icon_size-24">
            <use xlink:href="#close"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: 'Акционное предложение на три длинных строки с сылкой на переход',
      },
      link: {
        type: String,
        default: '#',
      },
    },
    data() {
      return {
        isShow: true,
        cookieName: 'promo_notify',
      };
    },
    methods: {
      onClose() {
        Vue.$cookies.set(this.cookieName, 1, '7d');
      },
    },
    mounted() {
      if (Vue.$cookies.get(this.cookieName)) {
        this.isShow = false;
      }
    },
  };
</script>
