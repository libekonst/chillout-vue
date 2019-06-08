<template>
  <div class="home">
    <div class="appbar">Appbar</div>
    <div class="content">
      <div>
        <img alt="Vue logo" src="../assets/logo.png">

        <HelloWorld msg="Ooooh it's amazing! "/>
        <HelloWorld msg="Ooooh fantastic!"/>
        <HelloWorld msg="Aaaaah"/>
      </div>
    </div>
    <div class="player">Player</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;

  /* Grid */
  display: grid;
  grid-template-rows: 2rem auto 4rem;
}

.appbar {
  background-color: purple;
}

.content {
  overflow: auto;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar-thumb {
    visibility: hidden;
  }

  &:hover::-webkit-scrollbar-thumb {
    visibility: visible;
  }
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
</style>
