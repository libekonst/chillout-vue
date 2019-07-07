// import Vue from 'vue';

export function toUpperInitial(value) {
  if (!value) return '';

  return (
    value
      .toString()
      .charAt(0)
      .toUpperCase() + value.slice(1)
  );
}

// Vue.filter('toUpperInitial', toUpperInitial);
