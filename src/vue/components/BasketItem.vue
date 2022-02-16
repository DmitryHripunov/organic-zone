<template>
  <li class="basket-items__item">
    <!-- <label class="form__label-checkbox" v-if="!item.isDelete">
      <input
        class="form__checkbox"
        type="checkbox"
        @input="selectProduct"
        :checked="item.isSelected"
      />
      <span class="form__checkbox-text"></span>
    </label> -->

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

      <div class="basket-items__id" v-if="!item.isDelete">
        Артикул: {{ item.article }}
      </div>

      <span
        class="basket-items__warning"
        v-for="(error, index) in item.errors"
        :key="index"
      >
        {{ error[0] }}
      </span>

      <div class="basket-items__action" v-if="!item.isDelete">
        <favorite-button
          show-mode="basket"
          :product-id="item.productId"
        ></favorite-button>

        <button class="basket__btn-delete" @click.prevent="deleteProduct">
          <svg class="icon icon_color-dark icon_size-16">
            <use xlink:href="#basket"></use>
          </svg>
          <span class="hidden-mobile"> Удалить </span>
        </button>
      </div>
    </div>

    <span
      class="basket-items__info basket-items__info_invert"
      v-if="item.isDelete"
    >
      <svg class="icon icon_size-20 icon_color-dark icon_mr-8">
        <use xlink:href="#return"></use>
      </svg>

      <div class="basket-items__info-text" @click.prevent="deleteProduct">
        Вернуть
      </div>
    </span>

    <div class="basket-items__aside" v-if="!item.isDelete">
      <div class="basket-items__price-wrapper">
        <div class="basket-items__price" v-if="!item.price.valueOld">
          {{ item.price.value | numberFormat }} ₽
        </div>

        <div class="basket-items__price" v-if="item.price.valueOld > 0">
          {{ item.price.value | numberFormat }} ₽
        </div>

        <div class="basket-items__price-old" v-if="item.price.valueOld > 0">
          {{ item.price.valueOld | numberFormat }} ₽
        </div>
      </div>

      <a
        href="#"
        class="basket-items__info"
        v-if="item.quantity === 0"
        @click.prevent="openMessages"
      >
        <svg class="icon icon_size-20 icon_color-dark icon_mr-8">
          <use xlink:href="#email"></use>
        </svg>
        Сообщить
      </a>

      <popup-base
        v-if="item.quantity === 0"
        :open.sync="isMessagesOpen"
        :title="titlePopupPost"
      >
        <PopupContentPost />
      </popup-base>

      <Counter :qty.sync="qtyItem" v-if="item.quantity > 0" />
    </div>
  </li>
</template>

<script>
  import numberFormat from "../helpers/numberFormat.js";
  import Counter from "./services/Counter.vue";
  import PopupBase from './popupComponents/PopupBase.vue';
  import FavoriteButton from './favorite/FavoriteButton.vue';
  import PopupContentPost from './popupComponents/PopupContentPost.vue'
  import { mapActions } from "vuex";

  export default {
    props: ["item", "open"],
    components: { Counter, PopupBase, PopupContentPost, FavoriteButton },

    data() {
      return {
        isMessagesOpen: false,
        titlePopupPost: 'Держите меня в курсе',
      }
    },

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
        'selectProductBasket'
      ]),

      deleteProduct() {
        this.deleteProductFromBasket({
          basketItemId: this.item.id,
        });
      },
      selectProduct() {
        this.selectProductBasket({
          basketItemId: this.item.id,
        });
      },
      openMessages() {
        this.isMessagesOpen = true;
        document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
        document.body.classList.add('no-scrolling');
      },
      closeMessages() {
        this.isMessagesOpen = false;
        document.body.style.paddingRight = null;
        document.body.classList.remove('no-scrolling');
      }
    },

    filters: {
      numberFormat,
    },
  };
</script>
