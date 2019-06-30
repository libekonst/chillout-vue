import Vue from 'vue';
import Vuex from 'vuex';
import data from '@/data';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Radio state
    category: 'music',
    favorites: [],
    selected: null,
    pending: null,

    // Playback state
    isPlaying: false,
    isLoading: false,

    // Audio
  },
  mutations: {
    // Playback
    togglePlaying: state => (state.isPlaying = !state.isPlaying),
    setPlaying: (state, bool) => (state.isPlaying = bool),
    setLoading: (state, bool) => (state.isLoading = bool),

    // Radio
    setSelected: (state, id) => (state.selected = id),
    setPending: (state, id) => (state.pending = id),
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
    selected: state => data.find(r => r.id === state.selected),
  },
  actions: {
    selectRadio: ({ commit, state }, id) => {
      // If the radio is already selected, toggle isPlaying.
      if (state.selected === id) return commit('togglePlaying', !state.isPlaying);

      // Else
      commit('setSelected', id);
      commit('setPlaying', true);
    },
    setFavorite: ({ commit, state }, id) => {
      if (!state.favorites.includes(id)) return commit('addFavorite', id);

      commit('removeFavorite', id);
    },
    startLoad: ({ commit }) => {
      commit('setLoading', true);
      commit('setPlaying', false);
    },
    startPlaying: ({ commit }) => {
      commit('setLoading', false);
      commit('setPlaying', true);
    },
  },
});
