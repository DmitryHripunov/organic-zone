<template>
  <li class="product-volume__item"
    :class="{ 'is-active': item.isActive }"
  >
    <span class="product-volume__text"
      :class="{'product-volume__text_small': this.smallText}"
      @click="chooseOffer({ id: item.id })"
    >
      {{ item.volume }}
    </span>
  </li>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["item", "smallText"],

  methods: {
    ...mapActions("product", ["chooseOffer"]),
  },

  computed: {
    ...mapGetters("product", ["activeOffer"]),
  },
}
</script>