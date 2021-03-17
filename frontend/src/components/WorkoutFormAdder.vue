<template>
  <div class="flex-box">
    <input class="header-input" type="text" v-model="workoutHeader" placeholder="Titel" @blur="checkHeader"/>
    <datepicker class="datepicker" v-model="picked"/>
  </div>
</template>


<script>
import Datepicker from 'vue3-datepicker' 
import { ref } from 'vue'

export default {
  name: "WorkoutFormAdder",
  components : {
    Datepicker   
  },
  created() {
    this.picked = ref(new Date())
  },
  data() {
    return {
      workoutHeader : '',
      picked : ''
    }
  },
  methods: {
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
      border: none;
      border-bottom: 2px solid #d1d1d1;
      padding: 0.25rem 0.25rem;
      background-color: #fff;
      box-sizing: border-box;
      outline: none;

      &:focus {
        outline: none;
        border: none;
        border-bottom: 2px solid lighten($accent-color, 20%);
        background-color: #fff;
      }
    }

  }

</style>
