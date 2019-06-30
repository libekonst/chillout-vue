<template>
   <!-- Onclick, stop propagation and emit add favorite event -->
    <button
      :class="['favorite', {'favorite--checked': isFavorite}]"
      :title="isFavorite ? 'Remove from Your Favorites': 'Add to Your Favorites'"
    >
      <ion-icon v-if="isFavorite" name="md-heart"></ion-icon>
      <ion-icon v-else name="md-heart-empty"></ion-icon>
    </button>
</template>

<script>
export default {
  name: 'FavoriteButton',
  props:{
    isFavorite: Boolean,
  }
}
</script>

<style lang="scss" scoped>

.favorite {
  /* Flex */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Styles */
  font-size: 1.3rem;
  color: #2c3e50;
  transition: color 0.2s linear;

  &:active {
    transform: scale(0.9);
  }

  &:hover {
    color: #F54D73;
  }

  &--checked {
    color: #42b983;
    color: #F54D73;
  }
}

</style>
