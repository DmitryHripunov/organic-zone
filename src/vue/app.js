import Vue from 'vue';
import axios from 'axios';
import Vuelidate from 'vuelidate';
import VueCookies from 'vue-cookies';
import VueScrollTo from 'vue-scrollto';
import VueAxios from 'vue-axios';
import SearchTop from './components/searchComponents/SearchTop.vue';
import SearchCities from './components/searchComponents/SearchCities.vue';
import AddToBasket from './components/AddToBasket.vue';
import BasketIndicator from './components/BasketIndicator.vue';
import BasketIndicatorMobile from './components/BasketIndicatorMobile.vue';
import BaseBasket from './components/BaseBasket.vue';
import ButtonTextMobile from './components/ButtonTextMobile.vue';
import LogIn from './components/logInComponents/LogIn.vue';
import FavoriteButton from './components/favorite/FavoriteButton.vue';
import FavoriteIndicator from './components/favorite/FavoriteIndicator.vue';
import StoriesBase from './components/storiesComponents/StoriesBase.vue';
import CityConfirm from './components/city/CityConfirm.vue';
import PopupCityChoice from './components/city/PopupChoiceCity.vue';
import CityIndicator from './components/city/CityIndicator.vue';
import PromoNotify from './components/services/PromoNotify.vue';

import store from './store';

Vue.use(VueAxios, axios);
Vue.use(VueCookies);
Vue.use(Vuelidate);
Vue.use(VueScrollTo);

window.Vue = Vue;

/* eslint-disable no-new */
new Vue({
  store,
  components: {
    SearchTop,
    AddToBasket,
    SearchCities,
    FavoriteButton,
    BasketIndicator,
    FavoriteIndicator,
    BasketIndicatorMobile,
    BaseBasket,
    ButtonTextMobile,
    LogIn,
    StoriesBase,
    CityConfirm,
    PopupCityChoice,
    CityIndicator,
    PromoNotify,

    ProductSlider: () => import('./components/productComponents/ProductSlider.vue'),
    ProductVolume: () => import('./components/productComponents/ProductVolume.vue'),
    ProductShortInfo: () => import('./components/productComponents/ProductShortInfo.vue'),
    ProductPrice: () => import('./components/productComponents/ProductPrice.vue'),

    DeliveryBase: () => import('./components/deliveryComponents/DeliveryBase.vue'),
    DeliveryOrder: () => import('./components/deliveryComponents/DeliveryOrder.vue'),
  },
  methods: {
    initState() {
      if (typeof INITIAL_STATE !== 'undefined') {
        INITIAL_STATE.basket = INITIAL_STATE.basket || {};
        INITIAL_STATE.product = INITIAL_STATE.product || {};
        INITIAL_STATE.delivery = INITIAL_STATE.delivery || {};
        INITIAL_STATE.account = INITIAL_STATE.account || {};
        INITIAL_STATE.favorite = INITIAL_STATE.favorite || {};
        INITIAL_STATE.stories = INITIAL_STATE.stories || {};
        INITIAL_STATE.user = INITIAL_STATE.user || {};
        this.$store.replaceState(INITIAL_STATE);
      }
    },
    initAxios() {
      const authToken = $(this.$el).data('auth-token');
      const csrf = $('head [name="csrf-token"]').attr('content');

      if (authToken) {
        this.axios.defaults.headers.common.Authorization = `Basic ${authToken}`;
      }

      this.axios.defaults.headers.common['X-CSRF-Token'] = csrf;
      this.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    },
  },
  created() {
    this.initState();
  },
  mounted() {
    this.initAxios();
  },
}).$mount('#app');
