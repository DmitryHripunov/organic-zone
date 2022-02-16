import Vue from 'vue';
import Vuex from 'vuex';

import basket from './basket/basket';
import product from './product/product';
import delivery from './delivery/delivery';
import account from './account/account';
import favorite from './favorite/favorite';
import stories from './stories/stories';
import user from './user/user';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    basket,
    product,
    delivery,
    account,
    favorite,
    stories,
    user,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});
