// import Vue from 'vue';
import { toUpperInitial } from './toUpperInitial';

export default {
  install(Vue) {
    Vue.filter('toUpperInitial', toUpperInitial);
  },
};
