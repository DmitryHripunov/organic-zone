<template>
  <a class="header__top-action js-open-popup" data-target="#choice-city">
    <svg class="icon icon_size-20 icon_color-black icon_mr-8">
      <use xlink:href="#pin"></use>
    </svg>
    <span class="js-region-name"> {{ userCity }} </span>
  </a>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters('user', ['userCity']),
    },
  };
</script>
