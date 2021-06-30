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
                <div class="repetition" @click.stop v-for="rep in exerciseItem.set" v-bind:key="rep">
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
    margin: 0.5rem 0;
    flex-wrap: wrap;
    padding: 0 15%
}

.repetition {
    width: calc(33.3% - 0.3rem * 2);
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 4px;
    margin-top: 0.5rem;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    padding: 0.35rem;
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

@media only screen and (max-width: 600px) {
    .repetition-container {
        padding: 0;
    }

    .repetition {
        width: calc(50% - 0.3rem * 2)
    }
}
  
</style>


