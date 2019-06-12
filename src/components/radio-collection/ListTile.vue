<script>
import AsyncImage from '@/components/AsyncImage.vue';

export default {
  name: 'ListTile',
  components: { AsyncImage },
  props: {
    name: String,
    image: String,
    isActive: Boolean,
    isPlaying: Boolean,
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
  },
  computed: {
    actionTitle() {
      if (this.isPlaying) return 'Pause';
      return 'Play';
    },
  },
};
</script>


<template>
  <li
    @mouseenter="handleEnter()"
    @mouseleave="handleLeave()"
    @click="$emit('play-radio', id)"
    :class="isActive && 'li--active'"
  >
    <div class="action" :title="actionTitle">
      <ion-icon v-if="isHovered && isActive && isPlaying" name="ios-pause"></ion-icon>
      <ion-icon v-else-if="!isHovered && isActive && isPlaying" name="ios-volume-high"></ion-icon>
      <ion-icon v-else-if="isHovered" name="ios-play"></ion-icon>
    </div>

    <div class="favorite" @click.stop>
      <ion-icon name="md-heart-empty"></ion-icon>
    </div>
    <div>
      <AsyncImage :src="image" :alt="`${name}'s logo`" class="image"/>
    </div>
    <div class="title">{{name}}</div>
  </li>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_breakpoints.scss';

li {
  width: 100%;
  height: auto;
  position: relative;
  cursor: default;
  padding: 0.5rem 0;

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
    left: 2rem;
    right: 2rem;
    bottom: 0;
    height: 1px;
    background-color: rgba(70, 70, 70, 0.05);
  }
}

.li--active {
  color: #052fb8;
  font-weight: bold;

  &::before {
    background-color: rgba(210, 210, 210, 0.3);
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

  /* Center children */
  & * {
    margin: auto;

    @media (max-width: $sm) {
      display: none;
    }
  }
}

.favorite {
  /* width: 100%;
  height: 100%; */

  &:active {
    transform: scale(1.5);
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
