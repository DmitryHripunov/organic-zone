
export default {
  namespaced: true,

  getters: {
    accountDetails(state) {
      return state.userData;
    },
  },
  mutations: {
    deleteAddress(state) {
      if (state.userData.selectedAddress.length > 0) {
        state.userData.address = state.userData.address.filter(i =>
          state.userData.selectedAddress.indexOf(i) < 0);

        state.userData.selectedAddress = [];
      }
    },
    selectedAddress(state, id) {
      const foundItem = state.userData.address.find(item => item.id === id);
      state.userData.selectedAddress = [];
      state.userData.address.forEach((i) => {
        i.isActiveAddress = false;
      });
      if (foundItem) {
        foundItem.isActiveAddress = true;
        state.userData.selectedAddress.push(foundItem);
      }
    },
    changeAddress(state, data) {
      const foundItem = state.userData.address.find(i =>
        state.userData.selectedAddress.indexOf(i) === 0);

      if (foundItem) {
        Object.assign(foundItem, { id: foundItem.id }, data);
      }
      state.userData.selectedAddress = [];
    },
    submitAddress(state, data) {
      state.userData.address.push(data);
      state.userData.address = [...state.userData.address];
    },
  },

  actions: {
    deleteAddress(context) {
      context.commit('deleteAddress');
    },
    selectedAddress(context, addressId) {
      context.commit('selectedAddress', addressId);
    },
    changeAddress(context, {
      city,
      index,
      street,
      buildingNumber,
      apartmentNumber,
    }) {
      context.commit('changeAddress', {
        city,
        index,
        street,
        buildingNumber,
        apartmentNumber,
      });
    },
    submitAddress(context, {
      id,
      city,
      index,
      street,
      buildingNumber,
      apartmentNumber,
    }) {
      context.commit('submitAddress', {
        id,
        city,
        index,
        street,
        buildingNumber,
        apartmentNumber,
      });
    },
  },
};
