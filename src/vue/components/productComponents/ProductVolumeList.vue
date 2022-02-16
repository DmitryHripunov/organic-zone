<template>
  <ul class="product-volume__list">
    <ProductVolumeItem 
      v-for="item in this.offers"
      :key="item.id" 
      :item="item"
      :smallText="smallText"
    />
  </ul>
</template>

<script>
import ProductVolumeItem from './ProductVolumeItem.vue'
import { mapGetters } from "vuex";

export default {
  components: { ProductVolumeItem },
  props: ['smallText'],

  computed: {
    ...mapGetters("product", ["offers"]),
  },
}
</script>