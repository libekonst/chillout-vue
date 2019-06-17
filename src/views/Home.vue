<template>
  <header class="home">
    <header class="header">
      <div class="background"></div>
      <div class="image-line">
        <button
          :class="['image-category', 'image-category--music', category === 'music' ? 'image-category--big' :'image-category--hover']"
          @click="changeCategory('music')"
        >
          <span :class="[{'image-category__text': category === 'music'}]">Music</span>
          <!-- <div class="image-category__overlay">Music</div> -->
          <!-- <img
            src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
            alt="Music category image"
          >-->
        </button>
        <button
          :class="['image-category',{'image-category--big': category === 'news'}]"
          @click="changeCategory('news')"
        >
          <div class="image-category__overlay">News</div>
          <img
            src="https://images.unsplash.com/photo-1547679905-3c132ce6d489?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
            alt="News category image"
          >
        </button>
      </div>
    </header>
    <main class="content">
      <!-- <section>Top left</section> -->
      <!-- <section>Top Right</section> -->
      <section class="radio-list">
        <div class="sticky-top">
          <h2 class="radio-header">{{category | toUpperInitial}} Radios</h2>
        </div>
        <ul>
          <ListTile
            v-for="radio in radios"
            :name="radio.name"
            :image="radio.image"
            :key="radio.id"
            :id="radio.id"
            :isSelected="radio.id === selected"
            :isPlaying="isPlaying"
            :isFavorite="favorites.includes(radio)"
            @play-radio="handleSelectRadio"
            @add-favorite="handleAddFavorite"
          />
        </ul>
      </section>
      <section class="favorites-section">
        <div class="sticky-top">
          <h2 class="radio-header">Your Favorites</h2>
        </div>
        <ul v-if="favorites.length !== 0" class="favorites-list">
          <li v-for="fav in favorites" :key="fav.id" class="card-wrapper">
            <FavoriteCard
              :id="fav.id"
              :image="fav.image"
              :isPlaying="isPlaying && selected === fav.id"
              :title="fav.name"
              @play-radio="handleSelectRadio"
            />
          </li>
        </ul>
        <div v-else class="favorites-empty">
          <p class="favorites-empty__text">Your favorite radios will appear here.</p>
        </div>
      </section>
    </main>
    <footer class="player">Player</footer>
  </header>
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
      const radio = this.radios.find(r => r.id === id);
      if (!radio) return;

      if (!this.favorites.includes(radio)) return this.favorites.push(radio);
      else this.favorites = this.favorites.filter(f => f !== radio);
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
  grid-template-rows: auto 1fr 4rem;
}

.header {
  /* background-color: purple; */
  height: 13rem;
  /* background-color: #42b983; */
  position: relative;
  display: flex;

  & .background {
    background-color: rgb(23, 25, 54);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50%;
    z-index: -1;
  }

  & .image-line {
    width: 100%;
    margin: auto;

    /* Flex */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    & .image-category {
      position: relative;
      border-radius: 10px;
      height: 6rem;
      width: 7rem;
      overflow: hidden;
      margin-right: 2.5rem;
      cursor: pointer;
      border-bottom: 2px solid rgb(245, 77, 115);
      transition: all 0.15s ease-out;

      /* Text */
      color: #fafafa;
      font-size: 1.5rem;
      font-family: 'Courgette', sans-serif;

      &--hover:hover {
        transform: scale(1.1, 1.2);
      }

      &--music {
        background-image: linear-gradient(
          to right bottom,
          #42b983,
          lighten(#42b983, 30%)
        );
      }

      &--big {
        transform: scale(1.4, 1.6);
      }

      &__overlay {
        /* Position */
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        /* Styles */
        background-color: rgba(11, 10, 21, 0.2);
        color: #fafafa;
        font-size: 1.5rem;
        font-family: 'Courgette', sans-serif;

        /* Flex */
        display: flex;
        align-items: center;
        justify-content: center;

        /* Reaveal */
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s linear;
      }

      &:hover .image-category__overlay {
        opacity: 1;
        visibility: visible;
      }
    }

    & img {
      width: 100%;
      height: 100%;
    }
  }
}

.content {
  /* Grid */
  display: grid;
  /* grid-template-rows: 1fr 3fr; */
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
  display: flex;
  flex-direction: column;
}

.favorites-empty {
  flex: 1;
  display: flex;
  border-radius: 10px;
  background-color: #f4f4f4;
  margin: 0.3rem 0.75rem;
  padding: 0 0.5rem;

  &__text {
    color: #afafaf;
    font-size: 1.5rem;
    margin: auto;
  }
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
  z-index: 10;
  background-color: #fafafa;
}

ul {
  padding: 0 1rem;
}

.card-wrapper {
  margin: 0.75rem;
}
</style>
