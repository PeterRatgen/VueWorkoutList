<template>
  <div class="add-card" 
    v-bind:style="{backgroundColor: addCardColor}" 
    @click="createCard">  
    <transition name="cardTransition" mode="out-in">
      <div v-if="createButton">
        <fa class="plus-icon" icon="plus"></fa>
      </div>
      <div class="add-form" @click.stop v-else>
        <WorkoutFormAdder/>
        <div class="divider"></div>
        <button @click="collapseCard" >Cancel</button>
        <button @click="collapseCard" >Save</button>
      </div>
    </transition>
  </div>
</template>

<script>
import WorkoutFormAdder from './WorkoutFormAdder'

export default {
  name: "AddTodo",
  components : {
    WorkoutFormAdder
  },
  data() {
    return {
      title: '',
      createButton: true,
      addCardColor : '#efefef',
    }
  },
  methods: {
    createCard() {
      if(this.createButton) {
        this.createButton = false;
        this.addCardColor = "#fff"
      }
    },
    collapseCard() {
      if(!this.createButton) {
        this.createButton = true;
        this.addCardColor = "#fff"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/variables.scss';

  .add-card {
    @include workout-card;
    background-color: #f9f9f9;
    transition: background-color 0.4s;
  }

  .plus-icon {
    transform: scale(2);
    color: lighten($accent-color, 5%);
  }

  .divider {
    @include divider;
    margin: 1rem 0;
  }
    
  .cardTransition-enter-active {
    animation: move-list 0.6s linear;
  }

  .cardTransition-leave-active {
    animation: move-list 0.6s linear reverse;
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
