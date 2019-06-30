<template>
  <li
    @mouseenter="handleEnter()"
    @mouseleave="handleLeave()"
    @click="handleClick()"
    :class="[{'li--playing':isPlaying && isSelected}, {'li--selected': isSelected}]"
  >
    <!-- Play / Pause / Speaker icon -->
    <div class="action" :title="actionTitle">
      <ion-icon v-if="isHovered && isSelected && isPlaying" name="ios-pause"></ion-icon>
      <ion-icon v-else-if="!isHovered && isSelected && isPlaying" name="ios-volume-high"></ion-icon>
      <ion-icon v-else-if="isHovered" name="ios-play"></ion-icon>
    </div>

    <!-- Onclick, stop propagation and emit add favorite event -->
    <button
      :class="['favorite', {'favorite--checked': isFavorite}]"
      @click.stop="handleFavorite"
      :title="isFavorite ? 'Remove from Your Favorites': 'Add to Your Favorites'"
    >
      <ion-icon v-if="isFavorite" name="md-heart"></ion-icon>
      <ion-icon v-else name="md-heart-empty"></ion-icon>
    </button>
    <!-- <FavoriteButton :isFavorite="isFavorite" @click.stop="handleFavorite" /> -->
    <div>
      <AsyncImage :src="image" :alt="`${name}'s logo`" class="image"/>
    </div>
    <div class="title">{{name}}</div>
  </li>
</template>

<script>
import AsyncImage from '@/components/AsyncImage.vue';
import FavoriteButton from '@/components/FavoriteButton.vue'

export default {
  name: 'ListTile',
  components: { AsyncImage, FavoriteButton },
  props: {
    name: String,
    image: String,
    isSelected: Boolean,
    isPlaying: Boolean,
    isFavorite: Boolean,
    id: Number,
  },
  data: () => ({ isHovered: false }),
  methods: {
    handleEnter() {
      this.isHovered = true;
    },
    handleLeave() {
      this.isHovered = false;
    },
    handleClick() {
      this.$emit('play-radio', this.id);
    },
    handleFavorite() {
      this.$emit('add-favorite', this.id);
    },
  },
  computed: {
    actionTitle() {
      if (this.isPlaying) return 'Pause';
      return 'Play';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_breakpoints.scss';

li {
  width: 100%;
  height: auto;
  position: relative;
  cursor: default;
  padding: 0.4rem 0;

  /* Grid layout */
  display: grid;
  grid-template-columns: 3rem 3rem 3rem auto;
  grid-column-gap: 0.5rem;
  align-items: center;
  justify-items: center;

  @media (max-width: $sm) {
    grid-template-columns: 0 3rem 3rem auto;
  }

  /* Highlight On Hover */
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: rgba(210, 210, 210, 0.2);
    z-index: -1;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s linear;
  }

  &:hover::before {
    opacity: 1;
    visibility: visible;
  }

  /* Gutter */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: rgba(70, 70, 70, 0.05);
  }
}

.li--selected {
  color: #052fb8;
  /* color: #002fff; */
  /* color: #1437fa; */
  color: #0057ff;
  /* color: #42b983; */
  font-weight: bold;
}

.li--playing {
  &::before {
    background-color: #efeef5;
    background-color: #f2f1f7;

    /* background-color: rgba(201, 198, 218, 0.4); */
    /* background-color: rgba(235, 235, 242, 0.8); */

    /* background-color: rgba(210, 210, 210, 0.25); */
    visibility: visible;
    opacity: 1;
  }
}

.action {
  transition: all 0.1s ease-out;
  width: 2rem;
  height: 2rem;
  display: flex;
  font-size: 1.8rem;

  /* Center children, display none on small screens */
  & * {
    margin: auto;

    @media (max-width: $sm) {
      display: none;
    }
  }
}

li div {
  margin: 0 0.5rem;
}

.image {
  border-radius: 5px;
  width: 3rem;
  height: 3rem;
  overflow: hidden;
}

.title {
  /* <- Define the element's width using 'justify-self: stretch' instead
  of 'width: 100%' to truncate text on Chrome. Firefox is OK with both width and justify-self. */
  justify-self: stretch;
  text-align: start;

  /* Text ellipsis. Overflow prevents truncating. */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
