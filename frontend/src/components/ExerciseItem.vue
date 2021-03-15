<template> 
  <div>
    <div class="divder"></div>
    <div class="name">
      <h4> {{ exerciseItem.name }}</h4>    
      <div class="repetition-container">
        <div @click.stop class="repetition" v-for="rep in exerciseItem.set" v-bind:key="rep">
          <Repetition  v-bind:repetition="rep"/>
        </div>
      </div>
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

.repetition {
    flex: 1;
    margin: 0.5rem 0.5rem;
    box-sizing: border-box;
    padding: auto auto;
    background-color: #F0F0FA;
    border-radius: 6px;
    min-width: 45%;
    max-width: 45%;

}

.repetition-container {
  margin: 0.5rem 0;
  display: flex;
  flex-wrap: wrap;

}

.divder {
  height: 80%;
  border-top: 1px solid #ebebeb;
}

.name {
  margin: 0.5rem 0.5rem;
}

h4 {
  font-weight: 700;
  text-align: left;
}
  
</style>


