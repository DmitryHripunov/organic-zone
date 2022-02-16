<template >
  <div class="basket" >
    <div class="grid" v-if="
      products && products.length > 0 ||
      deleteProducts && deleteProducts.length > 0"
    >
      <div class="grid__wrapper grid__wrapper_revers-inner">
        <div class="grid__aside grid__aside_revers-inner">
          <div class="basket__info">
            <h3 class="title title_h3 title_indent-sm">Ваш заказ</h3>

            <div class="basket__info-header">
              <form class="form" @submit.prevent="promotion">

              <div class="form__group"
                :class="{
                  'has-error':
                    promotionErrorMessage.length || promotionError.length,
                  'has-success': promotionData,
                }"
              >
                <input v-model="promotionValue" placeholder="Промокод" type="text" class="form__input"/>

                <button class="basket__info-submit">
                  <svg class="icon icon_size-16 icon_color-white">
                    <use xlink:href="#arrow-right"></use>
                  </svg>
                </button>

                <div class="help-text" v-if="promotionErrorMessage.length">
                  {{ promotionErrorMessage }}
                </div>

                <div class="help-text" v-if="promotionError.length">
                  {{ promotionError }} 
                </div>

                <div class="help-text" v-if="promotionData">
                  скидка {{ promotionData }}%
                </div>
              </div>
              </form>
            </div>

            <BasketInfo />

            <a href="/cart/process/" 
              class="btn btn_primary btn_fill"
              :class="{'btn_disabled': !products.length}"
            >
            Перейти к оформлению
            </a>
          </div>
        </div>

        <div class="grid__main grid__main_revers-inner">
          <form class="form">
            <div class="basket__top">
              <button
                class="basket__btn-delete"
                @click.prevent="showPopup"
              >
                <svg class="icon icon_color-dark icon_size-16 icon_mr-8">
                  <use xlink:href="#basket"></use>
                </svg>
                Очистить корзину
              </button>

              <popup-base :open.sync="isOpen" :title="titlePopupDeleteProduct">
                <PopupContentDelete :open.sync="isOpen" />
              </popup-base>
            </div>

            <ul class="basket-items">
              <BasketItem v-for="item in products"
                :key="item.id"
                :item="item"
              />

              <template v-if="deleteProducts && deleteProducts.length > 0">
                <BasketDeleteItem  v-for="item in deleteProducts"
                  :key="item.id"
                  :item="item"
                />
              </template>
            </ul>
          </form>
        </div>
      </div>
    </div>

    <div class="basket__empty"  v-else>
      <div class="basket__empty-text">
        В корзине нет товаров. Вы можете начать свой выбор с главной страницы или перейти в каталог.
      </div>

      <a href="/catalog/" class="btn btn_primary">Перейти в каталог</a>
    </div>
  </div>
</template>

<script>
  import BasketItem from './BasketItem.vue';
  import BasketInfo from './BasketInfo.vue';
  import BasketDeleteItem from './BasketDeleteItem.vue';
  import PopupBase from './popupComponents/PopupBase.vue';
  import PopupContentDelete from './popupComponents/PopupContentDelete.vue';
  import numberFormat from '../helpers/numberFormat.js';
  import { mapGetters, mapActions } from 'vuex';
  import axios from 'axios';

  export default {
    components: { 
      BasketItem,
      BasketDeleteItem,
      PopupBase,
      PopupContentDelete,
      BasketInfo,
    },

    data() {
      return {
        checkedProduct: false,
        isSelectedAll: false,
        selectProductAll: false,
        isOpen: false,
        titlePopupDeleteProduct: 'Удаление товаров',

        promotionData: null,
        promotionError: '',
        promotionErrorMessage: '',
        promotionValue: '',

        totalPriceWithDiscount: null,
      }
    },

    methods: {
      promotion() {
        this.promotionData = null;
        this.promotionError = '';
        this.promotionErrorMessage = '';
        axios.post('/api/promotion-code/', {
          code: this.promotionValue
        })
        .then((res) => {
          if (!res.data.success) {
            return this.promotionErrorMessage = res.data.errors.code[0];
          }
          this.$store.commit('basket/promotionsDiscount', res.data.messages.code[0].discount);
          this.promotionData = res.data.messages.code[0].discount;
        })
        .catch((error) => {
          this.promotionError = error.response.data.errors.code[0] || '';
        })
      },

      showPopup() {
        this.products.forEach((i) => {
          this.isOpen = true;
          document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
          document.body.classList.add('no-scrolling');
        })
      },

      ...mapActions('basket', ['selectAllProductBasket'])
    },

    computed: {
      ...mapGetters('basket', {
        products: 'basketDetailProducts',
        totalPrice: 'basketTotalPrice',
        totalDiscount: 'basketTotalDiscount',
        deleteProducts: 'basketDetailDeleteProducts',
      }),

      // recalculateTotalPrice: {
      //   get() {
      //     this.totalPrice;
      //   },
      //   set() {
      //     this.totalPrice = 
      //   }
      // },
    },

    filters: {
      numberFormat,
    },

    watch: {
      isToggle: {
        handler(isToggle) {
          if (isToggle) {
            toggleCount += 1;
          } else {
            toggleCount -= 1;
          }
        }
      }
    },
  };
</script>
