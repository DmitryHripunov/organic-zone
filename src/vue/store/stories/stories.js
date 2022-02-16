export default {
  namespaced: true,

  getters: {
    stories(state) {
      return state.stories ? state.stories : [];
    },
  },

  mutations: {
    changeActiveStory(state, id) {
      const foundStory = state.stories.find(i => i.id === id);

      state.stories.forEach((item) => {
        if (item.active) {
          item.active = false;
        }
      });

      if (foundStory) {
        foundStory.active = true;
      }
    },
    changeEpisodeIsViewed(state, episode) {
      const foundEpisode = state.stories.find(i => i.episode === episode);
      console.log(foundEpisode);
      if (foundEpisode) {
        foundEpisode.episodeIsViewed = true;
      }
    },
  },

  actions: {
    changeActiveStory(context, { id }) {
      context.commit('changeActiveStory', id);
    },

    changeEpisodeIsViewed(context, { episode }) {
      context.commit('changeEpisodeIsViewed', episode);
    },
  },
};
