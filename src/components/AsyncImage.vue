<script>
export default {
  name: 'AsyncImage',
  data: () => ({ hasLoaded: false }),
  methods: {
    handleLoad() {
      this.hasLoaded = true;
    },
  },
};
</script>

<template>
  <div>
    <div class="placeholder" v-if="!hasLoaded"></div>
    <transition name="fade">
      <img v-bind="$attrs" @load="handleLoad()" v-show="hasLoaded">
    </transition>
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}

.placeholder {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;

  &::after {
    /* Position */
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    /* Styles */
    opacity: 1;
    visibility: visible;
    transition: all 0.2s ease-out;
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-leave,
.fade-enter-to {
  opacity: 1;
}
</style>

