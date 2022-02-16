<template>
  <div class="product-price">
    <div class="product-price__wrapper">
      <div class="product-price__price">{{ offer.price.value | numberFormat }} ₽</div>
      <div class="product-price__old" v-if="offer.price.valueOld !== 0">
        {{ offer.price.valueOld | numberFormat }} ₽
      </div>
    </div>

    <div class="product-price__caption-wrapper">
      <div class="product-price__caption" v-if="offer.badge">{{ offer.badge }}</div>
      <div class="product-price__caption" v-if="offer.price.discount !== 0">{{ offer.price.discount }}%</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import numberFormat from "../../helpers/numberFormat.js";

  export default {
    computed: {
      ...mapGetters("product", {offer: "activeOffer" }),
    },


    filters: {
      numberFormat,
    },
  };
</script>