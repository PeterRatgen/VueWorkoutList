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
                <div  @click.stop v-for="rep in exerciseItem.set" v-bind:key="rep">
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
    expand_card(e) {
      if (this.contracted) {
            console.log("expanding card")
            this.contracted = false
            e.stopPropagation();
      } else {
            this.contracted = true
            e.stopPropagation();
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

.repetition-container {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
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

@keyframes move-list {
  0% {
    max-height: 0px;
    opacity: 0;
  }
  100% {
    max-height: 600px;
    opacity: 1;
  }
}
  
</style>


