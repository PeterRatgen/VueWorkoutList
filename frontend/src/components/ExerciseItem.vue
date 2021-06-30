<template> 
  <div class="divder"></div>
  <div class="name" @click="expand_card">
    <transition name="fade" mode="out-in">
      <div class="description" v-if="contracted">
        <h4> {{ exerciseItem.name }}</h4>    
      </div>
      <div v-else class="description-expand">
    <h4> {{ exerciseItem.name }}</h4>    
    <div class="repetition-container">
      <div class="repetition" 
        @click.stop 
        v-for="rep in exerciseItem.set" 
        v-bind:key="rep">
        <Repetition  v-bind:repetition="rep"/>
      </div>
    </div>
      </div>
    </transition>
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
      showWeight: false,
      contracted: true
    }
  }, 
  methods : {
    expand_card() {
      if (this.contracted) {
        this.contracted = false
      } else {
        this.contracted = true
      }
    }
  },
  created() {
    this.ex = this.exerciseItem;
  }
}
  

</script>


<style lang="scss" scoped>
@import '../assets/variables.scss';

.repetition {
    flex: 1;
    margin: 0.5rem 0.5rem;
    box-sizing: border-box;
    padding: auto auto;
    background-color: lighten($accent-color, 50%);
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
  @include divider;
}

.name {
  margin: 0.5rem 0.5rem;
}

h4 {
  font-weight: 700;
  text-align: left;
}

.fade-enter-active {
  animation: move-list 0.4s linear;
}

.fade-leave-active {
  animation: move-list 0.2s linear reverse;
}
  
</style>


