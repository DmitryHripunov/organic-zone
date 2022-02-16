<template>
  <li class="basket-items__item">
    <div class="basket-items__img-wrapper">
      <img :src="item.image" :alt="item.title" class="basket-items__img" />
    </div>

    <div class="basket-items__body basket-items__body_popup">
      <div class="basket-items__name">
        {{ item.title }}
      </div>

      <span
        class="basket-items__warning"
        v-for="(error, index) in item.errors"
        :key="index"
      >
        {{ error[0] }}
      </span>

      <div class="basket-items__action">
        <favorite-button
          :product-id="item.productId"
          show-mode="basket-drop-down"
        ></favorite-button>

        <button class="basket__btn-delete" @click="deleteProduct">
          <svg class="icon icon_color-dark icon_size-16">
            <use xlink:href="#basket"></use>
          </svg>
        </button>
      </div>

      <div class="basket-items__aside basket-items__aside_drop">
        <div class="basket-items__price-wrapper basket-items__price-wrapper_drop">
          <div class="basket-items__price">
            {{ item.price.value | numberFormat }} ₽
          </div>

          <div class="basket-items__price-old">
            {{ item.price.valueOld | numberFormat }} ₽
          </div>
        </div>

        <Counter :qty.sync="qtyItem" v-if="item.quantity > 0" />
      </div>
    </div>

  </li>
</template>

<script>
  import Counter from "./services/Counter.vue";
  import { mapActions } from "vuex";
  import numberFormat from "../helpers/numberFormat.js";
  import FavoriteButton from "./favorite/FavoriteButton.vue"

  export default {
    components: { Counter, FavoriteButton },
    props: ["item"],

    computed: {
      qtyItem: {
        get() {
          return this.item.quantity;
        },
        set(value) {
          this.item.quantity = value;
          return this.updateBasketProductQuantity({
            basketItemId: this.item.id,
            quantity: value,
          });
        },
      },
    },

    methods: {
      ...mapActions('basket', [
        'updateBasketProductQuantity',
        'deleteProductFromBasket',
      ]),

      deleteProduct() {
        this.deleteProductFromBasket({
          basketItemId: this.item.id,
        });
      },
    },

    filters: {
      numberFormat,
    },
  };
</script>
