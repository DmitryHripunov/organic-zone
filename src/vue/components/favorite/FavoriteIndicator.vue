<template>
  <a :href="favoriteUrl"
    :class="{
      'header__body-action': isMode('desktop'),
      'mobile-panel__action': isMode('mobile'),
      'is-active': isActive && isMode('mobile'),
    }"
  >

    <span class="quantity-actions"
      v-if="favoriteQuantity"
      :class="{'quantity-actions_right': isMode('mobile')}"
    >
      {{ favoriteQuantity | numberFormat }}
    </span>

    <svg class="icon  icon_color-dark icon_mr-8"
      :class="{
        'icon_size-24': isMode('desktop'),
        'icon_size-28': isMode('mobile'),
        'icon_mb-8': isMode('mobile'),
      }"
    >
      <use xlink:href="#heart"></use>
    </svg>
    Избранное
  </a>
</template>

<script>
  import { mapGetters } from 'vuex';
  import numberFormat from '../../helpers/numberFormat';

  export default {
    props: {
      favoriteUrl: {
        type: String,
        default: '/favorites-page.html',
      },
      showMode: {
        type: String,
        default: 'desktop',
      },
      isActive: {
        type: Boolean,
      },
    },
    computed: {
      ...mapGetters('favorite', ['favoriteQuantity']),
    },
    methods: {
      isMode(type) {
        return this.showMode === type;
      },
    },
    filters: {
      numberFormat,
    },
  };
</script>
