<template>
  <span class="btn__text">{{ porductPrice | numberFormat }} ₽</span>
</template>

<script>
import numberFormat from "../helpers/numberFormat.js";
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('product', ['activeOffer']),

    porductPrice() {
      return this.activeOffer.price.value
    },
  },

  filters: {
    numberFormat,
  },
}
</script>