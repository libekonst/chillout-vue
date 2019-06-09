<script>
import AsyncImage from '@/components/AsyncImage.vue';

export default {
  name: 'ListTile',
  components: { AsyncImage },
  props: {
    name: String,
    image: String,
  },
  data: () => ({ isActive: false, isHovered: false }),
  methods: {
    play() {
      this.isActive = !this.isActive;
    },
    handleEnter() {
      this.isHovered = true;
    },
    handleLeave() {
      this.isHovered = false;
    },
  },
  computed: {
    actionIcon() {
      if (this.isHovered && this.isActive) return 'ios-pause';
      if (!this.isHovered && this.isActive) return 'ios-volume-high';
      return 'ios-play';
    },
  },
};
</script>


<template>
  <li
    @click="play()"
    @mouseenter="handleEnter()"
    @mouseleave="handleLeave()"
    :class="isActive && 'li--active'"
  >
    <!-- <div class="action"> -->
    <div :class="['action', {'action--show': isActive || isHovered}]">
      <ion-icon
        size="large"
        :name="actionIcon"
        :style="actionIcon !== 'ios-play' && {color: 'white'}"
      ></ion-icon>
    </div>
    <!-- </div> -->
    <div class="favorite">
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
  /* display: grid;
  grid-template-columns: 0 3rem 3rem auto 0;
  grid-column-gap: 0.5rem;
  grid-template-areas: 'playcontrol favorite image title genre';
  align-items: center;
  justify-items: start;

  @media (min-width: $sm) {
    grid-template-columns: 0 3rem 3rem auto 8rem;
  }
  @media (min-width: $md) {
    grid-template-columns: 3rem 3rem 3rem auto 8rem;
  } */

  /* Flex layout */
  display: flex;
  align-items: center;
  justify-content: flex-start;

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
  color: white;

  &::before {
    background-color: rgba(127, 0, 127, 1);
    opacity: 1;
    visibility: visible;
  }
}

.action {
  font-size: 1rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.1s ease-out;
  width: 2rem;
  height: 2rem;

  @media (max-width: $sm) {
    display: none;
  }

  &--show {
    opacity: 1;
    visibility: visible;
  }
}

.favorite {
  width: 1rem;
  height: 1rem;

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
  align-self: auto;
  justify-self: stretch;

  /* Text ellipsis. Overflow prevents truncating. */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
