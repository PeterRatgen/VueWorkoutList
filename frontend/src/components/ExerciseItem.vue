<template> 
    <div class="divder"></div>
    <div class="name" @click.stop="expand_card">
        <div class="item-header">
            <div v-if="nameEdit" >
                <InputField
                    :startEdit="nameEdit"   
                    v-on:result="titleSubmitEdit"
                    v-on:stop-edit="titleEditEnd"
                />
            </div>
            <div v-else>
                <h4> {{ exerciseItem.name }}</h4>    
            </div>
            <span> {{ exerciseItem.set.length }} sæt</span>
        </div>
    <transition name="fade" mode="out-in">
        <div class="description" v-if="contracted">
        </div>
        <div v-else class="description-expand">
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
import InputField from "./input_field/InputField";

export default {
  name: "ExerciseItem",
  props: ["exerciseItem", "edit"],
  emits: ["exercise-item"],
  components: {
    Repetition,
    InputField
  },
  data () {
    return {
      ex: '',
      showWeight: false,
      contracted: true,
      nameEdit: ''
    }
  }, 
  methods : {
    expand_card() {
      if (this.contracted) {
            console.log("expanding card")
            this.contracted = false
      } else {
            this.contracted = true
      }
    },
    titleSubmitEdit(result) {
        this.nameEdit = false
        this.$emit('exercise-item', this.exerciseItem, result)
    },
    titleEditEnd() {
        this.nameEdit = false 
    }
  },
  created() {
    this.ex = this.exerciseItem;
    this.nameEdit = this.edit;
    console.log("editing " + this.nameEdit)
  }
}
  

</script>


<style lang="scss" scoped>
@import '../assets/variables.scss';

.repetition-container {
    display: flex;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    padding: 0 15%
}

.repetition {
    width: calc(33.3% - 0.3rem * 2);
    box-sizing: border-box;
    border: 1px solid darken($divider-color, 10%);
    border-radius: 4px;
    margin-top: 0.5rem;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    padding: 0.35rem;
}

.item-header {
    display: flex;
    justify-content: space-between;

    h4 {
        display: inline;
    }
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


