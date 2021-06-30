<template> 
  <div class="rep">
    <div class="reps"> 
      <span class="item" v-bind:style="{textAlign: alignment}">
          <input class="input-content"   type="number" 
          v-bind:value="repItem.repetitions" @input="update_repetitions"
          />
      reps</span> 
    </div>  
    <div class="reps" v-show="showWeight"> 
        <span class="item">
          <input class="input-content" type="number"  step="0.01"
          v-model="repItem.weight" @input="check" @blur="printWeight"/>
          kg
        </span> 
      </div>
  </div>
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

  .input-content {
    width: 2.4rem;
    font-family: 'Open Sans';
    font-size: 1rem;
    box-sizing: border-box;
    border-radius: 4px;
    border: 2px solid white;
    padding: 0.1rem 0.4rem;
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
  .item {
  }
  .reps {
    display: flex;
    margin: 0.6rem 0;
    text-align: left;
    align-items: center;
  }
  .rep { 
    margin: 1rem 0.5rem;
    padding: 0.1rem 1.0rem;
    color: black;
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


