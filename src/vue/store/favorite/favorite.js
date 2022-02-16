import Vue from 'vue';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);

export default {
  namespaced: true,
  state: {
    // favoriteIds: {
    //   10: 10,
    //   11: 11,
    //   12: 12,
    // },
  },
  getters: {
    favoriteQuantity(state) {
      return Object.keys(state.favoriteIds).length;
    },
    favoriteKeys(state) {
      return Object.keys(state.favoriteIds);
    },
  },
  mutations: {
    updateFavorite(state, productId) {
      if (!productId) return;

      const favoriteKeys = Object.keys(state.favoriteIds);
      if (favoriteKeys.indexOf(productId.toString()) !== -1) {
        Vue.delete(state.favoriteIds, productId);
      } else {
        Vue.set(state.favoriteIds, productId, productId);
      }
      Vue.$cookies.set('favorite', JSON.stringify(state.favoriteIds), '30d');
    },
  },
  actions: {
    updateFavoriteQuantity(context, { productId }) {
      context.commit('updateFavorite', productId);
    },
  },
};
