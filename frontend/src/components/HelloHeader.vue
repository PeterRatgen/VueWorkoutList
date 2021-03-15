<template>
  <div>
    <h1>Hej, {{ header.split(" ")[0] }} </h1>
    <div class="accent"></div>
  </div>
</template>


<script>

export default {
  name: 'HelloHeader',
  props : ["header"],
  data () {
    return {
      headerName: ''
    }
  },
  update () {
  }
}

</script>



<style scoped>

h1 {
  text-align: left;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

</style>
