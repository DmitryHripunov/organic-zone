export default {
  namespaced: true,
  state: {
    offers: [
      {
        id: 25,
        article: 'HA3242',
        price: {
          value: 3455,
          valueOld: 4566,
          discount: 50,
        },
        weight: 0.21,
        badge: 'Хит продаж',
        volume: '24 мл',
        images: [
          {
            id: 1,
            value: 'https://dummyimage.com/530x660/3ebdbd/1f202e',
          },
          {
            id: 2,
            value: 'https://dummyimage.com/530x660/000/fff',
          },
        ],
        isActive: true,
        title: 'Гель для лица с эффектом абсорбции и детоксикации, очищающий Botavikos',
      },
      {
        id: 50,
        article: 'HA3241',
        price: {
          value: 1455,
          valueOld: 2566,
          discount: 10,
        },
        weight: 0.34,
        badge: null,
        volume: '50 мл',
        images: [
          {
            id: 1,
            value: 'https://dummyimage.com/530x660/000/fff',
          },
          {
            id: 2,
            value: 'https://dummyimage.com/530x660/3ebdbd/1f202e',
          },
          {
            id: 3,
            value: 'https://dummyimage.com/530x660/efefef/1f202e',
          },
        ],
        isActive: false,
        title: 'Гель для лица с эффектом',
      },
      {
        id: 100,
        article: 'HA3243',
        price: {
          value: 3455,
          valueOld: 0,
          discount: 0,
        },
        weight: 0,
        badge: null,
        volume: '100 мл',
        images: [
          {
            id: 1,
            value: 'https://dummyimage.com/530x660/3ebdbd/1f202e',
          },
          {
            id: 2,
            value: 'https://dummyimage.com/530x660/000/fff',
          },
        ],
        isActive: false,
        title: 'очищающий Botavikos',
      },
      {
        id: 2500,
        article: 'HA3244',
        price: {
          value: 455,
          valueOld: 566,
          discount: 0,
        },
        weight: 0.72,
        badge: 'badge',
        volume: '2500 мл',
        images: [
          {
            id: 1,
            value: 'https://dummyimage.com/530x660/000/fff',
          },
          {
            id: 2,
            value: 'https://dummyimage.com/530x660/3ebdbd/1f202e',
          },
        ],
        isActive: false,
        title: 'Гель для лица с эффектом абсорбции и детоксикации, очищающий Botavikos',
      },
    ],
  },

  getters: {
    offers(state) {
      return state.offers ? state.offers : [];
    },
    activeOffer(state) {
      return state.offers.length > 0 ? state.offers.find(item => item.isActive) : {};
    },
  },

  mutations: {
    chooseOffer(state, { id }) {
      const foundItem = state.offers.find(item => item.id === id);

      if (foundItem) {
        state.offers.forEach((item) => {
          item.isActive = false;
          foundItem.isActive = true;
        });
      }
    },
  },

  actions: {
    chooseOffer(context, { id }) {
      context.commit('chooseOffer', { id });
    },
  },
};
