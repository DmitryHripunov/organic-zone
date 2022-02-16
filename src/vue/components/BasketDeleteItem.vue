<template>
  <li class="basket-items__item">
    <div class="basket-items__img-wrapper">
      <img :src="item.image" :alt="item.title" class="basket-items__img" />
    </div>

    <div class="basket-items__body">
      <div
        class="basket-items__name"
        :class="{ 'basket-items__name_disabled': item.isDelete }"
      >
        {{ item.title }}
      </div>

      <div v-if="item.isDelete">
        <strong>Удалено</strong>
      </div>
    </div>

    <span
      class="basket-items__info basket-items__info_invert"
      v-if="item.isDelete"
    >
      <svg class="icon icon_size-20 icon_color-dark icon_mr-8">
        <use xlink:href="#return"></use>
      </svg>

      <div class="basket-items__info-text" @click.prevent="returnProduct">
        Вернуть
      </div>
    </span>
  </li>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["item"],

  methods: {
    ...mapActions("basket", ["returnProductInBasket"]),
    
    returnProduct() {
      this.returnProductInBasket({
        basketItemId: this.item.id,
      });
    },
  },
};
</script>