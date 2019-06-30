import Vue from 'vue';
import Vuex from 'vuex';
import data from '@/data';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    category: 'music',
    selected: null,
    isPlaying: false,
    favorites: [],
  },
  mutations: {
    togglePlaying: state => (state.isPlaying = !state.isPlaying),
    setPlaying: (state, bool) => (state.isPlaying = bool),
    setSelected: (state, id) => (state.selected = id),
    changeCategory: (state, category) => {
      if (state.category === category) return;
      state.category = category;
    },
    addFavorite: (state, id) => state.favorites.push(id),
    removeFavorite: (state, id) => {
      state.favorites = state.favorites.filter(f => f !== id);
    },
  },
  getters: {
    favorites: state => state.favorites.map(fav => data.find(r => r.id === fav)),
    radios: state => data.filter(radio => radio.label === state.category),
  },
  actions: {
    selectRadio: ({ commit, state }, id) => {
      // If the radio is already selected, toggle isPlaying.
      if (state.selected === id) return commit('togglePlaying', !state.isPlaying);

      // Else
      commit('setSelected', id);
      commit('setPlaying', true);
    },
    setFavorite({ commit, state }, id) {
      if (!state.favorites.includes(id)) return commit('addFavorite', id);

      commit('removeFavorite', id);
    },
  },
});
