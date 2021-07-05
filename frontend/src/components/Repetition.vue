<template> 
    <div @click.stop="repetition_click">
        <div v-if="editing">
            <div class="item"> 
                <span class="icon-container" @click.stop="dec('weight')">
                    <fa class="icon" icon=minus  ></fa>
                </span>
                {{ repItem.weight }} kg 
                <span class="icon-container" @click.stop="inc('weight')">
                    <fa class="icon" icon=plus  ></fa>
                </span>
            </div>
            <div class="item">
                <span class="icon-container" @click.stop="dec('reps')">
                    <fa class="icon" icon=minus  ></fa>
                </span>
                {{ repItem.repetitions }} reps
                <span class="icon-container" @click.stop="inc('reps')">
                    <fa class="icon" icon=plus  ></fa>
                </span>
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
                    this.repItem.repetitions = this.repItem.repetitions  + 1
                    break;
            }
        },
        dec(target){
            switch(target){
                case "weight":
                    this.repItem.weight = this.repItem.weight - 1.25
                    break;
                case "reps":
                    this.repItem.repetitions = this.repItem.repetitions  - 1
                    break;
            }
        },
        repetition_click(){
            this.editing = !this.editing
            this.emitter.emit('pressed-repetition')
        }
    }
}

  
</script>


<style lang="scss" scoped>
@import '../assets/variables.scss';

.item {
    display: flex;
    margin: auto;
    width: 95%;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0;
}

.icon {
    color: lighten($text-color, 5%);
}

.icon-container {
    display: flex;
    width: 1.75rem;
    height: 2rem;
    justify-content: center;
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


