<script>
import AsyncImage from '@/components/AsyncImage.vue';

export default {
  name: 'FavoriteCard',
  components: { AsyncImage },
  props: {
    name: String,
    image: String,
    isPlaying: Boolean,
    id: Number,
    title: String,
  },
  data: () => ({ isHover: false }),
  methods: {
    handleEnter() {
      this.isHover = true;
    },
    handleLeave() {
      this.isHover = false;
    },
    handleClick() {
      this.$emit('play', this.id);
    },
  },
};
</script>

<template>
  <div class="card">
    <div
      class="media"
      @mouseenter="handleEnter()"
      @mouseleave="handleLeave()"
      @click="handleClick()"
    >
      <div :class="['overlay', {'overlay--show': isHover}]"></div>
      <AsyncImage :src="image" :alt="`${name}'s logo`" class="image"/>
      <img :src="image" :class="['blurred', {'blurred--show': isHover}]">
      <div class="icon">
        <div
          :class="['icon__inner', {'icon__inner--border': isHover}]"
          v-show="isHover || isPlaying"
        >
          <ion-icon v-if="isHover && isPlaying" name="ios-pause"></ion-icon>
          <ion-icon v-else-if="!isHover && isPlaying" name="ios-volume-high"></ion-icon>
          <ion-icon v-else-if="isHover" name="ios-play"></ion-icon>
        </div>
      </div>
    </div>
    <div class="title">
      <p class="title__inner">{{title}}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  height: auto;
  width: 7.5rem;
}

.media {
  /* Styles */
  border-radius: 10px;
  position: relative;
  height: 7.5rem;
  width: auto;

  /* Flex */
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 40px -5px rgba(89, 89, 89, 0.1);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  transition: opacity 0.2s ease-in-out;
  opacity: 0;
  background-color: rgb(180, 180, 180);

  &--show {
    transition: opacity 0.2s ease-in-out;
    opacity: 0.3;
  }
}

.blurred {
  /* Positioning */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  width: 100%;
  background-color: white;
  background-repeat: no-repeat;
  background-position: center;

  /* Effects */
  opacity: 0;
  transform: scale(1);
  filter: blur(7px);
  transition: opacity 0.05s linear, transform 0.1s ease-out;

  &--show {
    opacity: 1;
    transform: scale(1.15);
  }
}

.icon {
  /* Position */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  /* Flex */
  display: flex;
  align-items: center;
  justify-content: center;

  &__inner {
    /* Flex */
    display: flex;
    justify-content: center;
    align-items: center;

    /* Styles */
    font-size: 2.3rem;
    color: white;
    border-radius: 50%;
    padding: 0.2rem;
    background-color: rgba(45, 45, 45, 0.6);

    &--border {
      background-color: rgba(230, 230, 230, 0.7);
      border: 1px solid white;
    }
  }
}

.title {
  width: 100%;
  text-align: start;
  margin-top: 0.8rem;

  &__inner {
    text-transform: capitalize;

    /* Truncate text */
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>


