<template>
  <a :href="basketUrl" 
  class="mobile-panel__action"
  :class="{'is-active': isActive}"
  >
    <span
      class="quantity-actions quantity-actions_right"
      v-if="products && products.length"
    >
      {{ products.length }}
    </span>

    <svg class="icon icon_size-28 icon_color-dark icon_mb-8">
      <use xlink:href="#cart"></use>
    </svg>
    Корзина
  </a>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    props: {
      basketUrl: {
        type: String,
        default: 'basket-page.html',
      },
      isActive: {
        type: Boolean,
      },
    },
    computed: {
      ...mapGetters('basket', {
        products: 'basketDetailProducts',
      }),
    }
  }
</script>
