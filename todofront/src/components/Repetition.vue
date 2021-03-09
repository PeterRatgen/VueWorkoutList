<template> 
  <div class="name">
    <p> Reps:{{ repetition.repetitions }}  <span v-show="showWeight"> Weight {{ repetition.weight }}</span></p>  
  </div>
</template>

<script>
export default {
  name: "Repetition",
  props: ["repetition"],
  data () {
    return {
      showWeight: false
    }
  }, 
  created() {
    if (this.repetition.weight) {
      this.showWeight = true;
    }
  }
}
  
</script>


<style scoped>
  
</style>


