<template>
  <ul class="basket__info-body">
    <li class="basket__info-item">
      <dl class="basket__info-props">
        <dt>
          Товары
          <span>({{ products.length }})</span>
        </dt>

        <dd>{{ totalPrice | numberFormat }} ₽</dd>
      </dl>
    </li>

    <li class="basket__info-item" v-if="showWeight">
      <dl class="basket__info-props">
        <dt>Общий вес</dt>

        <dd>{{ totalWeight }} кг</dd>
      </dl>
    </li>

    <li class="basket__info-item">
      <dl class="basket__info-props">
        <dt>Скидка</dt>

        <dd>– {{ totalDiscount | numberFormat }} ₽</dd>
      </dl>
    </li>

    <li class="basket__info-item" v-if="showDelivery">
      <dl class="basket__info-props">
        <dt>Доставка</dt>

        <dd>{{ currentDeliveryDetail.price ? +currentDeliveryDetail.price : 0 | numberFormat }} ₽</dd>
      </dl>
    </li>

    <li class="basket__info-item">
      <dl class="basket__info-props">
        <dt>
          <strong>Итого</strong>
        </dt>

        <dd>
          <strong>{{ totalPrice | numberFormat }} ₽</strong>
        </dd>
      </dl>
    </li>
  </ul>
</template>

<script>
  import { mapGetters } from 'vuex';
  import numberFormat from '../helpers/numberFormat.js';

  export default {
  props: ["showDelivery", "showWeight"], 
   
  computed: {
    ...mapGetters("basket", {
      products: "basketDetailProducts",
      totalPrice: "basketTotalPrice",
      totalDiscount: "basketTotalDiscount",
      totalWeight: "basketTotalWeight",
    }),

    ...mapGetters("delivery", ["currentDeliveryDetail"]),
  },

  filters: {
    numberFormat,
  },
};
</script>