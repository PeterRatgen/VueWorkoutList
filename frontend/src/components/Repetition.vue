<template> 
    <div class="rep-container" >
        <div @click.stop="repetition_click()">
            <transition name="fade" mode="out-in">
            <div v-if="editing">
                <div class="item"  @mousewheel.prevent="scrolledWeight" > 
                    <span class="icon-container"  @click.stop="dec('weight')">
                        <fa class="icon" icon=minus  ></fa>
                    </span>
                    {{ repItem.weight }} kg 
                    <span class="icon-container"  @click.stop="inc('weight')">
                        <fa class="icon" icon=plus  ></fa>
                    </span>
                </div>
                <div class="item" @mousewheel.prevent="scrolledReps">
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
                <span v-if="repItem.weight > 0"> 
                    {{ repItem.weight }} kg x {{ repItem.repetitions }}
                </span>
                <span v-else>
                    {{ repItem.repetitions }} reps
                </span> 
            </div>
            </transition>
        </div>
    </div>
</template>

<script>

export default {
    name: "Repetition",
    props: ["repetition", "delMode"],
    emits : ["completed-rep-edit", "delete-rep"],
    data () {
        return {
            showWeight: false,
            alignment: 'left',
            repItem: '',
            editing: false,
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
        this.emitter.on('pressed-repetition', () => {
            this.editing = false
        })
    },
    methods: {
        check (e) {
          if (this.repItem.weight > 100) {
            e.originalTarget.style.color = 'red'
          }
          if ( this.repItem.weight < 100) {
            e.originalTarget.style.color = 'black'
          }
        },
        deleteRep() {
           this.$emit('delete-rep', this.repItem.id) 
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
            if (!this.delMode) {
                let oldEdit = this.editing;
                this.editing = !this.editing
                this.emitter.emit('pressed-repetition')
                console.log("Pressed the repetition")
                if (oldEdit == false) {
                    this.editing = true;
                } else {
                    this.editing = false;
                    this.$emit('completed-rep-edit', this.repItem)
                }
            } else {
                let element = this.$el;
                element.style.border = "2px solid #000"
                console.log("delMode true")
            }
        },
        scrolledReps(event) {
            if (event.deltaY < 0){
                this.inc("reps")
            } else {
                this.dec("reps")
            }
        },
        scrolledWeight(event) {
            if (event.deltaY < 0){
                this.inc("weight")
            } else {
                this.dec("weight")
            }
        },
    },
    updated() {
        console.log("state of delete " + this.delMode)
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

.rep-container {
    width: 100%;
}

.fade-enter-active {
    animation: move-list 0.2s linear;
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


