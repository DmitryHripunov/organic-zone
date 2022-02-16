<template>
  <div class="cart-btn">
    <a :href="basketUrl"
      class="cart-btn__action header__body-action"
      :class="{'is-active': products.length > 0}"  
    >
      <svg class="icon icon_size-28 icon_color-dark icon_mr-8 cart-btn__svg">
        <use xlink:href="#cart"></use>
      </svg>

      <div class="cart-btn__text">Корзина</div>

      <div class="cart-btn__active-wrapper">
        <span class="cart-btn__amount">{{ totalPrice | numberFormat }} ₽</span>
        <span class="cart-btn__quantity">
          {{ products.length }}
          {{ products.length | declText(['товар', 'товара', 'товаров']) }}
        </span>
      </div>
    </a>

    <div class="cart-btn__dropdown">
      <ul class="basket-items">
        <BasketDropDownItem v-for="item in products"
          :key="item.id"
          :item="item"
        />
      </ul>

      <dl class="basket-items__footer">
        <dt>
          <strong>Итого</strong>
        </dt>

        <dd>
          <strong>{{ totalPrice | numberFormat }} ₽</strong>
        </dd>
      </dl>

      <a :href="orderUrl" class="btn btn_primary btn_fs-18"
        >Оформить заказ</a
      >
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import numberFormat from '../helpers/numberFormat.js';
  import declTextMixin from '../mixins/declTextMixin';
  import BasketDropDownItem from './BasketDropDownItem.vue'
  

  export default {
    components: { BasketDropDownItem },
    props: {
      basketUrl: {
        type: String,
        default: 'basket-page.html',
      },
      orderUrl: {
        type: String,
        default: 'order-page.html',
      },
    },
    computed: {
      ...mapGetters('basket', {
        products: 'basketDetailProducts',
        totalPrice: 'basketTotalPrice',
      }),

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
      ...mapActions('basket', ['updateBasketProductQuantity']),
    },


    mixins: [declTextMixin],

    filters: {
      numberFormat,
    },
  };
</script>
