<template>
  <div>
    <h1>Hej, {{ header.split(" ")[0] }} </h1>
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
}

</style>
