
export default {
  namespaced: true,
  state: {
    currentDelivery: {},
  },
  getters: {
    currentDeliveryDetail(state) {
      return state.currentDelivery ? state.currentDelivery : {};
    },
  },
  mutations: {
    updateDeliveryItem(state, result) {
      state.currentDelivery = result;
    },
  },
  actions: {
    changeDeliveryItem(context, item) {
      context.commit('updateDeliveryItem', item);
    },
  },
};
