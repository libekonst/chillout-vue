<template>
  <div>
    <router-link to="/radios">Radios</router-link>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="scss" scoped>
a {
  color: #fafafa;
  font-weight: bold;
  font-size: 2rem;
}
div {
  display: flex;
  justify-content: space-evenly;
}
</style>
