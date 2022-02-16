<template>
  <div class="short-info__content">
    <div class="short-info__card">
      <img
        class="short-info__img"
        :src="offer.images[0].value"
        :alt="offer.title"
      />

      <p class="short-info__desc">
        {{ offer.title }}
      </p>
    </div>

    <div class="short-info__volume">
      <div class="product-volume">
        <VolumeList :smallText="smallText"/>
      </div>
    </div>

    <div class="short-info__prices">
      <div class="short-info__price">{{ offer.price.value | numberFormat }} ₽</div>

      <div class="short-info__old" v-if="offer.price.valueOld !== 0">{{ offer.price.valueOld | numberFormat }} ₽</div>
    </div>
  </div>
</template>

<script>
  import VolumeList from './ProductVolumeList.vue';
  import { mapGetters } from "vuex";
  import numberFormat from "../../helpers/numberFormat.js";

  export default {
    components: { VolumeList },

    data() {
      return {
        smallText: true,
      }
    },

    computed: {
      ...mapGetters("product", {offer: "activeOffer" }),
    },

    filters: {
      numberFormat,
    },
  };
</script>