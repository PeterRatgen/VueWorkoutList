<template>
<header class="header">
<h1>TodoList</h1>
  <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link>
<div id="nav">
</div>
</header>
</template>

<script>
export default {
name: "Header"
}
</script>

<style scoped>
.header {
color: #111111;
       text-align: center;
padding: 10px;
}
.header a {
  color: #aaaaaa;
  padding-right: 5px;
  text-decoration: none;
}
</style>
