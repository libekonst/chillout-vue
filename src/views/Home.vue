<template>
  <div class="home">
    <div class="appbar">Appbar</div>
    <div class="content">
      <div>
        <img alt="Vue logo" src="../assets/logo.png">

        <HelloWorld msg="Ooooh it's amazing! "/>
        <HelloWorld msg="Ooooh fantastic!"/>
        <HelloWorld msg="Aaaaah"/>
        <button @click="changeCategory('music')">Music</button>
        <br>
        <button @click="changeCategory('news')">News</button>
        <br>
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
      </div>
    </div>
    <div class="player">Player</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import ListTile from '@/components/radio-collection/ListTile.vue';
import data from '@/data';

export default {
  name: 'home',
  components: {
    HelloWorld,
    ListTile,
  },
  data: () => ({ category: 'music', selected: null, isPlaying: false, favorites: [] }),
  computed: {
    radios() {
      return data.filter(radio => radio.label === this.category);
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
  @include autohideScrollbar;

  overflow: auto;
  padding-bottom: 0.5rem;
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

ul {
  padding: 0 1rem;
}
</style>
