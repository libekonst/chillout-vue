<template>
  <div class="player">
    Player
    <h1 v-if="isLoading" style="color: white;">LOADING...</h1>
    <audio
      :autoplay="false"
      ref="audio"
      @loadstart="handleLoadStarted()"
      @playing="handleAudioStarted()"
    >Your browser doesn't support the audio element :(</audio>
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  methods: {
    handleLoadStarted() {
      const { src } = this.$refs.audio;
      this.$store.dispatch('startLoad', { src, resetAudioSrc });
    },
    handleAudioStarted() {
      this.$store.dispatch('startPlaying');
    },
  },
};
</script>

<style lang="scss" scoped>
.player {
  width: 100%;
  height: 100%;
  box-shadow: 0 -1px 5px -3px rgba(0, 0, 0, 0.75);
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
