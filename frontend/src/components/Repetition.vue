<template> 
    <div class="rep-container" 
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
    >
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
        <div class="trash-container"
                v-bind:class="{ trashrephover : isHover }"
                @click="deleteRep"
            >
            <fa 
                class="trash-rep" 
                icon="trash-alt" >
            </fa> 
        </div>
    </div>
</template>

<script>

export default {
    name: "Repetition",
    props: ["repetition"],
    emits :  {
        ["completed-rep-edit"] : Object, 
        [ "delete-rep"] : ( repObject ) => {
            if (typeof(repObject) === "object" ) {
                if (repObject.repId != undefined ) {
                    if ( typeof(repObject.repId)  === "string"){
                        return true
                    }
                    else {
                        console.error("Wrong type in the id passed from Repetion to delete")
                        return false
                    }
                }
                else {
                    console.error("No attribute repId was found in the object");
                    return false
                }
            }
            else {
                console.error("Value to be emitted from Repetion was not of type object")
                return false;
            }
        }
    },
    data () {
        return {
            showWeight: false,
            alignment: 'left',
            repItem: '',
            editing: false,
            isHover: false
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
        deleteRep() {
            /**
                Deleting a rep.
            */
           this.$emit('delete-rep', { repId  : this.repItem.id }) 
        },
        inc(target) {
            /**
                Increment the weight or reps.
            */
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
            /**
                Decremet the weight or rep.
            */
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
            /**
                What happens when a repetition is clicked.
            */
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
        },
        scrolledReps(event) {
            /**
                Scroll on reps.
            */
            if (event.deltaY < 0){
                this.inc("reps")
            } else {
                this.dec("reps")
            }
        },
        scrolledWeight(event) {
            /** 
                Scroll on weight.
            */
            if (event.deltaY < 0){
                this.inc("weight")
            } else {
                this.dec("weight")
            }
        },
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

.trash-container {
    display: none;
    position: absolute;
    right: -8px;
    top: -8px;
    color: $delete-color;
    background-color: white;
    width: 1.6rem;
    height: 1.6rem;
    border: 1px solid $divider-color;
    border-radius: 50px;
}

.trash-rep {
    font-size: 0.8rem;
}

.trashrephover {
    display: inline;
}

@media only screen and (max-width: 1350px) {

}

@media only screen and (max-width: 600px) {
  .todo-block {
   width: 95%;
  }
}
  
</style>


