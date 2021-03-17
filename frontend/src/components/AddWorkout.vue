<template>
  <div class="add-card" v-bind:style="{backgroundColor: addCardColor}" @click="createCard">  
    <div v-if="createButton">
      <fa class="plus-icon" icon="plus"></fa>
    </div>
    <div class="add-form" @click.stop v-else>
      <WorkoutFormAdder/>
      <button @click="createCard" >Cancel</button>
    </div>
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
      else {
        this.createButton = true
        this.addCardColor = "#efefef"
      }
    },
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
</style>
