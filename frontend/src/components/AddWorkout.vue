<template>
  <div class="add-card" v-bind:style="{backgroundColor: addCardColor}" @click="createCard">  
    <div v-if="createButton">
      <fa class="plus-icon" icon="plus"></fa>
    </div>
    <div class="add-form" @click.stop v-else>
      <div class="flex-box">
        <input class="header-input" type="text" v-model="workoutHeader" placeholder="Titel" @blur="checkHeader"/>
        <datepicker class="datepicker" v-model="picked"/>
      </div>
      <button @click="createCard" >Cancel</button>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vue3-datepicker' 
import { ref } from 'vue'

export default {
  name: "AddTodo",
  components : {
    Datepicker   
  },
  data() {
    return {
      title: '',
      createButton: true,
      workoutHeader : '',
      addCardColor : '#efefef',
      picked : ''
    }
  },
  created() {
    this.picked = ref(new Date())
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
    checkHeader() {
      console.log(this.workoutHeader)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/variables.scss';

  .flex-box {
    display: flex;
    justify-content: space-between;

    .header-input {
      font-weight: 700; 
      text-align: left;
      font-size: 1.3rem;
      border: 2px solid #d1d1d1;
      padding: 0.5rem 0.5rem;
      border-radius: 6px;
      background-color: #fff;
      box-sizing: border-box;
      outline: none;

      &:focus {
        outline: none;
        border: 2px solid lighten($accent-color, 20%);
        background-color: #fff;
      }
    }

  }

  .add-card {
    @include workout-card;
    background-color: #f9f9f9;
    transition: background-color 0.4s;
  }

  .plus-icon {
    transform: scale(2);
    color: lighten($accent-color, 5%);
  }

  .datepicker {
    z-index: 1;
  }


</style>
