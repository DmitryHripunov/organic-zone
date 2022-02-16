import Vue from 'vue';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);

export default {
  namespaced: true,
  state: {
    // user: {
    //   'city': 'Москва',
    // },
  },
  getters: {
    userCity(state) {
      return state.city;
    },
    cookieUserCity() {
      return Vue.$cookies.get('user_city');
    },
  },
  mutations: {
    updateCity(state, city) {
      if (!city) return;
      state.city = city;
      Vue.$cookies.set('user_city', city, '30d');
    },
  },
  actions: {
    updateCity(context, { city }) {
      context.commit('updateCity', city);
    },
  },
};
