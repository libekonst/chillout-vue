<template>
  <div id="app">
    <header>
      <div
        id="nav"
        style="color: #fafafa; display: flex; align-items: center; justify-content: space-between;"
      >
        <router-link to="/">The Chillout App</router-link>
        <div style="display: flex; align-items: center; justify-content: center; ">
          <div style="padding-right: 1rem;">Andrew Schnap</div>
          <div
            style="height: 2rem; width: 2rem; border-radius: 50%; background-color: #42b983; display: flex; align-items: center; justify-content: center; font-weight: 800;"
          >AS</div>
        </div>
      </div>
    </header>
    <!-- <div id="nav"> -->
    <!-- <router-link to="/">Home</router-link>| -->
    <!-- <router-link to="/about">About</router-link> -->
    <!-- </div> -->
    <main class="main-body">
      <transition name="slide">
        <router-view />
      </transition>
    </main>
    <footer>
      <AudioPlayer />
    </footer>
  </div>
</template>

<script>
import AudioPlayer from '@/views/AudioPlayer.vue';
export default {
  name: 'App',
  components: { AudioPlayer },
};
</script>

<style lang="scss">
/* Reset */
@import '@/assets/scss/_index.scss';
@import '@/assets/scss/_normalize.scss';
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
  /* transform: translateY(0); */
  /* opacity: 1; */
}

.slide-enter,
.slide-leave-to {
  transform: translateY(90vh);
  opacity: 0.5;
}

#app {
  width: 100%;
  height: 100%;

  /* background-color: purple; */
  /* background-color: #42b983; */
  background-color: rgb(23, 25, 54);

  /* Grid */
  display: grid;
  grid-template-rows: auto 1fr 4rem;
}

main.main-body {
  overflow: hidden;
}

#nav {
  padding: 1rem;

  a {
    font-weight: bold;
    /* color: #2c3e50; */
    color: #fafafa;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
