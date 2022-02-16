
export default {
  namespaced: true,
  state: {},
  getters: {
    basketDetailProducts(state) {
      return state.basketProducts;
    },
    basketPromotions(state) {
      return state.promotions;
    },
    basketDetailDeleteProducts(state) {
      return state.basketProductsDelete;
    },
    basketTotalPrice(state, getters) {
      const totalPrice = getters.basketDetailProducts.reduce((acc, item) =>
        (
          (item.price.value * item.quantity)
        ) + acc, 0);

      if (getters.basketPromotions) {
        return totalPrice - (totalPrice * (getters.basketPromotions / 100));
      }
      return totalPrice;
    },
    basketTotalDiscount(state, getters) {
      const totalDiscount = getters.basketDetailProducts.reduce((acc, item) =>
        ((item.price.valueOld - item.price.value) * item.quantity) + acc, 0);

      if (getters.basketPromotions) {
        return totalDiscount + (totalDiscount * (getters.basketPromotions / 100));
      }

      return totalDiscount;
    },
    basketTotalWeight(state, getters) {
      return getters.basketDetailProducts.reduce((acc, item) =>
        ((item.weight) * item.quantity) + acc, 0).toFixed(2);
    },
    basketProductsIds(state, getters) {
      return getters.basketDetailProducts.map(product => ({
        id: product.id,
      }));
    },
  },
  mutations: {
    promotionsDiscount(state, promo) {
      state.promotions = promo;
    },
    updateBasketProductsData(state, basketItem) {
      state.basketProducts.push(basketItem);
    },
    async updateBasketProductQuantity(state, { basketItemId, quantity }) {
      const amount = quantity;
      const response = await Vue.axios.post(`/api/cart/offers/${basketItemId}/`, {
        amount,
      });
      if (!response) return;

      const foundItem = state.basketProducts.find(item => item.id === basketItemId);
      if (foundItem) {
        foundItem.quantity = quantity;
        foundItem.errors = response.data.errors;
      }
    },
    async deleteProductFromBasket(state, id) {
      const response = await Vue.axios.delete(`/api/cart/offers/${id}/`);
      if (!response) return;

      const deleteItem = state.basketProducts.find(item => item.id === id);
      if (deleteItem) {
        deleteItem.isDelete = !deleteItem.isDelete;
      }
      state.basketProducts = state.basketProducts.filter(item => item.id !== id);

      const checkedDeleteItem = state.basketProductsDelete.find(item => item.id === id);
      if (!checkedDeleteItem) {
        state.basketProductsDelete.push(deleteItem);
      }
    },
    async deleteProductsFromBasket(state) {
      state.basketProducts.forEach((item) => {
        item.isDelete = true;

        state.basketProductsDelete.push(item);

        state.basketProducts = state.basketProducts.filter(i => i.isDelete !== item.isDelete);

        Vue.axios.delete(`/api/cart/offers/${item.id}/`);
      });
    },
    async returnProductInBasket(state, id) {
      const response = await Vue.axios.patch(`/api/cart/offers/${id}/`);
      if (!response) return;

      const returnItem = state.basketProductsDelete.find(item => item.id === id);
      if (returnItem) {
        returnItem.isDelete = !returnItem.isDelete;
      }
      state.basketProducts.push(returnItem);

      state.basketProductsDelete = state.basketProductsDelete.filter(item => item.id !== id);
    },
    selectProductBasket(state, id) {
      const foundItem = state.basketProducts.find(item => item.id === id);
      if (foundItem) {
        foundItem.isSelected = !foundItem.isSelected;
      }
    },
    selectAllProductBasket(state, { toggle }) {
      state.basketProducts.forEach((item) => {
        // eslint-disable-next-line no-unused-expressions
        toggle ? item.isSelected = true : item.isSelected = false;
      });
    },
    updateBasketData(state) {
      state.basketProducts = state.basketProducts.map(item => ({
        ...item,
      }));
    },
  },
  actions: {
    async addProductToBasket(context, { offerId, amount }) {
      const response = await Vue.axios.post(`/api/cart/offers/${offerId}/`, {
        amount,
      });
      if (response.data) {
        context.commit(
          'updateBasketProductsData',
          response.data,
        );
      }
    },
    deleteProductFromBasket(context, { basketItemId }) {
      context.commit('deleteProductFromBasket', basketItemId);
    },

    deleteProductsFromBasket(context) {
      context.commit('deleteProductsFromBasket');
    },

    returnProductInBasket(context, { basketItemId }) {
      context.commit('returnProductInBasket', basketItemId);
    },

    selectProductBasket(context, { basketItemId }) {
      context.commit('selectProductBasket', basketItemId);
    },

    selectAllProductBasket(context, { toggle }) {
      context.commit('selectAllProductBasket', { toggle });
    },

    updateBasketProductQuantity(context, { basketItemId, quantity }) {
      context.commit('updateBasketProductQuantity', { basketItemId, quantity });
    },
  },
};
