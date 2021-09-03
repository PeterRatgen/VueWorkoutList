<template> 
    <div class="rep-container" 
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
    >
        <div @click.stop="repetition_click()" data-test="repetition-clicker">
            <transition name="fade" mode="out-in">
            <div v-if="editing">
                <div class="item" data-test="expanded-weight" @mousewheel.prevent="scrolledWeight" > 
                    <span class="icon-container" data-test="weight-minus" @click.stop="dec('weight')">
                        <fa class="icon" icon="minus"  ></fa>
                    </span>
                    <p data-test="weight-count"> {{ repItem.weight }} kg </p>
                    <span class="icon-container" data-test="weight-plus"  @click.stop="inc('weight')">
                        <fa class="icon" icon="plus"  ></fa>
                    </span>
                </div>
                <div class="item" @mousewheel.prevent="scrolledReps">
                    <span class="icon-container" data-test="rep-minus" @click.stop="dec('reps')">
                        <fa class="icon" icon="minus" ></fa>
                    </span>
                    <p data-test="rep-count"> {{ repItem.repetitions }} reps </p>
                    <span class="icon-container" data-test="rep-plus" @click.stop="inc('reps')">
                        <fa class="icon" icon="plus" ></fa>
                    </span>
                </div> 
                
            </div>
            <div v-else>
                <span v-if="repItem.weight > 0"  > 
                    <p data-test="no-edit-weight">{{ repItem.weight }} kg x {{ repItem.repetitions }}</p>
                </span>
                <span v-else  >
                    <p data-test="no-edit-rep" >{{ repItem.repetitions }} reps</p>
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

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { IRepetition } from '../types';

export default defineComponent({
    name: "Repetition",
    props: {
        repetition : {
            type : Object as () => IRepetition
        }
    },
    emits :  {
        ["completed-rep-edit"] : ( data : {repItem : IRepetition }) => {
            return data.repItem.weight > 0 && data.repItem.repetitions > 0;
        },
        ["delete-rep"] : ( payload : { repId : string  }) => {
                return payload.repId != '';
        }
    },
    data () {
        return {
            showWeight: false,
            alignment: 'left',
            repItem: {} as IRepetition,
            editing: false,
            isHover: false
        };
    }, 
    created() : void {
        if (this.repetition != undefined) {
            if (this.repetition.weight) {
                this.showWeight = true;
            }
            if (!this.showWeight) {
                this.alignment = 'right';
            }
            this.repItem = this.repetition;

            const emitter : any = inject("emitter"); // Inject `emitter`
            emitter.on('pressed-repetition', () => {
                this.editing = false;
            });

        }
    },
    methods: {
        deleteRep() {
            /**
                Deleting a rep.
            */
            if(this.repItem.id != undefined) {
                this.$emit('delete-rep', { repId  : this.repItem.id });
            }
        },
        inc(target : string) {
            /**
                Increment the weight or reps.
            */
            switch(target){
                case "weight":
                    this.repItem.weight = this.repItem.weight + 2.5;
                    break;
                case "reps":
                    this.repItem.repetitions = this.repItem.repetitions  + 1;
                    break;
            }
        },
        dec(target : string){
            /**
                Decremet the weight or rep.
            */
            switch(target){
                case "weight":
                    if (this.repItem.weight != 0) {
                        this.repItem.weight = this.repItem.weight - 2.5;
                    }
                    break;
                case "reps":
                    if (this.repItem.repetitions != 0) {
                        this.repItem.repetitions = this.repItem.repetitions  - 1;
                    }
                    break;
            }
        },
        repetition_click(){
            /**
                What happens when a repetition is clicked.
            */
            let oldEdit = this.editing;
            this.editing = !this.editing;
            const emitter : any = inject("emitter"); // Inject `emitter`
            if ( emitter != undefined ) {
                emitter.emit('pressed-repetition');
            }
            console.log("Pressed the repetition");
            if (oldEdit == false) {
                this.editing = true;
            } else {
                this.editing = false;
                this.$emit("completed-rep-edit", { repItem : this.repItem });
            }
        },
        scrolledReps(event : any) {
            /**
                Scroll on reps.
            */
            if (event.deltaY < 0){
                this.inc("reps");
            } else {
                this.dec("reps");
            }
        },
        scrolledWeight(event : any) {
            /** 
                Scroll on weight.
            */
            if (event.deltaY < 0){
                this.inc("weight");
            } else {
                this.dec("weight");
            }
        },
    }
});
  
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


