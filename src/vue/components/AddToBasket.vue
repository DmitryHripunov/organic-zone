<template>
  <button
    @click.prevent="addTOBasket"
    class="btn btn_primary"
    :class="classObject"
    :disabled="checkProductInBasket"
    :id="computedOfferId"
  >
    <span v-if="!this.checkProductInBasket && !productAddSending">В корзину</span>
    <span class="btn__preloader" v-show="productAddSending"></span>
    <span v-if="this.checkProductInBasket">В корзине</span>

    <slot />
  </button>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    props: {
      variant: {
        type: String,
        default: 'btn'
      },
      disable: {
        type: Boolean,
      },
      offerId: {
        type: Number,
      },
    },

    data() {
      return {
        productAdded: false,
        productAddSending: false,
      };
    },

    computed: {
      ...mapGetters('product', ['activeOffer']),
      ...mapGetters('basket', ['basketProductsIds']),

      checkProductInBasket() {
        const foundItem = this.basketProductsIds.find(item => item.id === this.computedOfferId);

        return foundItem ? foundItem : null
      },

      computedOfferId() {
        return this.offerId ? this.offerId : this.activeOffer.id;
      },

      classObject() {
        return {
          'card__btn': this.variant === 'card__btn',
          'btn_indent-right': this.variant === 'btn_indent-right',
          'btn_fill': this.variant === 'btn_fill',
          'btn_tiny card-mini__btn': this.variant === 'btn_mimi_card',
          'btn_fill btn_wrap btn_tiny': this.variant === 'btn_scope',
          'btn_disable': this.disable,
        };
      },
    },

    methods: {
      ...mapActions('basket', ['addProductToBasket']),
      async addTOBasket() {
        const amount = 1;
        const offerId = this.computedOfferId;
        this.productAddSending = true;
        await this.addProductToBasket({ offerId, amount });
        document.querySelector('.cart-btn__dropdown').classList.add('is-active');
        this.productAdded = true;
        this.productAddSending = false;
        setTimeout(() => {
          document.querySelector('.cart-btn__dropdown').classList.remove('is-active');
        }, 1000);
      }
    },
  }
</script>
