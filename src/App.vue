<template>
  <div id="nav">
<!---    <Header /> -->
  </div>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import Header from './components/layout/Header.vue';
export default defineComponent({
  name: 'App',
  components: {
    // Header
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600;1,700;1,800&display=swap');
#app {
  font-family: 'Open Sans', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 2.5vh 2.5vw;
}

#nav a {
  font-weight: bold;
  color: c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
