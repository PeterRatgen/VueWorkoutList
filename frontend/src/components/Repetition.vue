<template> 
    <span v-show="showWeight"> 
        {{ repItem.weight }} kg
    </span>
    <span class="item">
      x {{ repItem.repetitions }}
    </span> 
</template>

<script>

export default {
  name: "Repetition",
  props: ["repetition"],
  data () {
    return {
      showWeight: false,
      alignment: 'left',
      repItem: ''
    }
  }, 
  created() {
    if (this.repetition.weight) {
      this.showWeight = true;
    }
    if (!this.showWeight) {
      this.alignment = 'right'
    }
    this.repItem = this.repetition
  },
  methods: {
    check (e) {
      console.log(e)
      if (this.repItem.weight > 100) {
        e.originalTarget.style.color = 'red'
      }
      if ( this.repItem.weight < 100) {
        e.originalTarget.style.color = 'black'
      }
      console.log(this.repItem.weight)
    },
    printWeight() {
      console.log(this.repItem.weight)
    }
  }
}

  
</script>


<style lang="scss" scoped>
@import '../assets/variables.scss';

  .input-content {
    width: 1.8rem;
    font-family: 'Open Sans';
    font-size: 1rem;
    box-sizing: border-box;
    border-radius: 4px;
    border: 2px solid white;
    background-color: rgba(255,255,255, 0.8);
    text-align: center;
  }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
  .rep { 
    margin: 1rem 0.5rem;
    padding: 0.1rem 1.0rem;
    color: black;
  }

  .repetition {
    display: flex;
    justify-content: space-between;
    margin: 0.25rem;
    border: 1.5px solid black;
    border-radius: 4px;
    padding-right: 0.8rem;
  }

@media only screen and (max-width: 1350px) {
  .item-header{
  }
  .item-content{
    
  }
}
@media only screen and (max-width: 600px) {
  .todo-block {
   width: 95%;
  }
}
  
</style>


