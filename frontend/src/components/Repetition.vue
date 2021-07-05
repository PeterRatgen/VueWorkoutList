<template> 
    <div @click.stop="editing = !editing">
        <div v-if="editing">
            <div class="item"> 
                <fa icon=minus @click.stop="dec('weight')" ></fa>
                {{ repItem.weight }} kg 
                <fa icon=plus @click.stop="inc('weight')" ></fa>
            </div>
            <div class="item">
                <fa icon=minus @click.stop="dec('reps')"></fa>
                {{ repItem.repetitions }} reps
                <fa icon=plus @click.stop="inc('reps')"></fa>
            </div> 
            
        </div>
        <div v-else>
            <span v-show="showWeight"> 
                {{ repItem.weight }} kg x
            </span>
            <span>
                {{ repItem.repetitions }}
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
      repItem: '',
        editing: false
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
    },
    inc(target) {
        switch(target){
            case "weight":
                this.repItem.weight = this.repItem.weight + 1.25
                break;
            case "reps":
                this.repItem.repetitions = this.repItem.repetitions  + 1.25
                break;
        }
    },
    dec(target){
        switch(target){
            case "weight":
                this.repItem.weight = this.repItem.weight - 1.25
                break;
            case "reps":
                this.repItem.repetitions = this.repItem.repetitions  - 1.25
                break;
        }
    }
  }
}

  
</script>


<style lang="scss" scoped>
@import '../assets/variables.scss';

.item {
    display: flex;
    margin: auto;
    width: 75%;
    justify-content: space-between;
    align-items: center;
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


