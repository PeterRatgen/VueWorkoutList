<template>
  <div class="app">
    <div id="nav">
  <!---    <Header /> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
//import Header from './components/layout/Header.vue';
export default {
  name: "App",
  components: {
    //Header 
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600;1,700;1,800&display=swap');
.app {
  font-family: 'Open Sans', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 5vh 5vw;
}


#nav a {
  font-weight: bold;
  color: c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
