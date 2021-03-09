<template> 
  <div class="divder"></div>
  <div class="name">
    <h4> {{ exerciseItem.name }}</h4>    
    <div v-for="rep in exerciseItem.set" v-bind:key="rep">
      <Repetition v-bind:repetition="rep"/>
    </div>
  </div>
</template>

<script>
import Repetition from './Repetition'

export default {
  name: "ExerciseItem",
  props: ["exerciseItem"],
  components: {
    Repetition
  },
  data () {
    return {
      ex: '',
      showWeight: false
    }
  }, 
  created() {
    this.ex = this.exerciseItem;
  }
}
  
</script>


<style scoped>

.divder {
  height: 80%;
  border-top: 1px solid #ebebeb;
}

.name {
  margin: 1rem 0.5rem;
}

h4 {
  text-align: left;
}
  
</style>


