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
      if (state.selected === id) {
        if (state.isLoading) commit('setLoading', false);
        return commit('togglePlaying', !state.isPlaying);
      }
      // Else
      commit('setSelected', id);
      commit('setPlaying', true);
    },
    setFavorite: ({ commit, state }, id) => {
      if (!state.favorites.includes(id)) return commit('addFavorite', id);

      commit('removeFavorite', id);
    },
    startLoad: ({ commit }, { src, resetAudioSrc }) => {
      if (src !== resetAudioSrc) commit('setLoading', true);
    },
    startPlaying: ({ commit, state }) => {
      if (state.isLoading) commit('setLoading', false);
      if (!state.isPlaying) commit('setPlaying', true);
    },
    startAudio: async ({ state, getters, dispatch }, { audio, id, resetAudioSrc }) => {
      // Pause the audio and reset the source to force-stop buffering.
      // Restricts unnecessary data usage and prevents playing old content downloaded after pausing.
      if (
        (state.selected === id && state.isPlaying) ||
        (state.pending === id && state.isLoading)
      ) {
        audio.pause();
        audio.src = resetAudioSrc;
        dispatch('selectRadio', id);

        return audio.load();
      }

      // If source is undefined, the promise will be rejected and handled by the onError handler.
      dispatch('selectRadio', id);
      audio.src = getters.selected && getters.selected.source;
      await audio.play();
      console.log(audio);
    },
  },
});
