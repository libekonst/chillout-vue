<template>
  <div class="home">
    <header class="appbar">Appbar</header>
    <main class="content">
      <section>Top left</section>
      <section>Top Right</section>
      <section class="radio-list">
        <div class="sticky-top">
          <h2 class="radio-header">{{category | toUpperInitial}} Radios</h2>
          <button @click="changeCategory('music')">Music</button>
          <button @click="changeCategory('news')">News</button>
        </div>
        <ul>
          <ListTile
            v-for="radio of radios"
            :name="radio.name"
            :image="radio.image"
            :key="radio.id"
            :id="radio.id"
            :isSelected="radio.id === selected"
            :isPlaying="isPlaying"
            :isFavorite="favorites.includes(radio.id)"
            @play-radio="handleSelectRadio"
            @add-favorite="handleAddFavorite"
          />
        </ul>
      </section>
      <section class="favorites-section">
        <div class="sticky-top"><h2 class="radio-header">Your Favorites</h2></div>
        <ul class="favorites-list">
          <FavoriteCard v-for="(fav, i) in favorites" :key="i"/>
        </ul>
      </section>
    </main>
    <footer class="player">Player</footer>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import ListTile from '@/components/radio-collection/ListTile.vue';
import FavoriteCard from '@/components/radio-collection/FavoriteCard.vue';
import data from '@/data';

export default {
  name: 'home',
  components: {
    HelloWorld,
    ListTile,
    FavoriteCard,
  },
  data: () => ({ category: 'music', selected: null, isPlaying: false, favorites: [] }),
  computed: {
    radios() {
      return data.filter(radio => radio.label === this.category);
    },
    favoritesDummy() {
      return new Array(30).fill(null);
    },
  },
  methods: {
    changeCategory(category) {
      this.category = category;
    },
    handleSelectRadio(id) {
      if (id === undefined) return;

      // If the radio is already selected, toggle isPlaying.
      if (this.selected === id) return (this.isPlaying = !this.isPlaying);

      this.selected = id;
      this.isPlaying = true;
    },
    handleAddFavorite(id) {
      if (this.favorites.includes(id))
        this.favorites = this.favorites.filter(f => f !== id);
      else this.favorites.push(id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_scrollbar.scss';

.home {
  width: 100%;
  height: 100%;

  /* Grid */
  display: grid;
  grid-template-rows: 2rem auto 4rem;
}

.appbar {
  /* background-color: purple; */

  background-color: #42b983;
}

.content {
  /* Grid */
  display: grid;
  grid-template-rows: 1fr 3fr;
  grid-template-columns: 2fr 1fr;
  align-items: stretch;
  justify-content: stretch;

  /* Styles */
  overflow: hidden;
}

.radio-list {
  @include autohideScrollbar;

  overflow: auto;
}

.radio-header {
  font-size: 1.2rem;
  text-align: start;
  padding: 0 0 1rem 2rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
}

.favorites-section {
  @include autohideScrollbar;

  overflow: auto;
}

.favorites-list {
  /* Flex */
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.player {
  background-color: rgba(11, 10, 21, 1);
  background-image: linear-gradient(
    to right top,
    #0b0a15,
    #151421,
    #1c1c2d,
    #24233b,
    #2c2b48
  );
}

.sticky-top {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fafafa;
}

ul {
  padding: 0 1rem;
}
</style>
