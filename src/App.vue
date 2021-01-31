<template>
  <div id="app" class="container is-fluid is-marginless">
    <header>
      <app-header></app-header>
    </header>
    <main class="container">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/_layout/Layout.Header';

export default {
  name: 'App',
  components: {
    'app-header': AppHeader
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1.5rem;
}
</style>
