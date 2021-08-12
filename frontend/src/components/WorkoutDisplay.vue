<template>
    <div class="workout-card">
        <div class="flex-container">
            <h3>{{ exercise.name }}</h3>
            <span class="icon-container" @click.stop="displayHover = !displayHover">
                <fa class="dots" icon="ellipsis-v"></fa>
            </span>
            <HoverMenu 
                :menuItems=hovMen 
                :display=displayHover  
                @option="handleOption"
                @minimize="displayHover = false"
                @click.stop
            />
        </div>
        <transition name="fade" mode="out-in">
            <div class="rep-table" v-if="!contracted">
                <div class="top-row">
                    <div class="table-header">Set</div>
                    <div class="table-header">Vægt</div>
                    <div class="table-header">Reps</div>
                    <div class="table-header">Status</div>
                </div>
                <div v-for="(set, index) in exercise.set" :key="set.id">
                    <div  class="repetition-row"
                        v-bind:class="{repetitionRowCompleted : set.completed}" >
                        <div 
                            class="table-content set" 
                            v-bind:class="{tableContentCompleted : set.completed}"
                        >{{ index + 1 }}
                        </div>
                        <div 
                            class="table-content" 
                            v-bind:class="{tableContentCompleted : set.completed}"
                            @click="weightPicker(index, set)"
                        >
                            {{ set.weight }}
                        </div>
                        <div
                            class="table-content" 
                            v-bind:class="{tableContentCompleted : set.completed}"
                            @click="repPicker(index, set)"
                        >
                            {{ set.repetitions }}
                        </div>
                        <div 
                            class="table-content set" 
                            v-bind:class="{tableContentCompleted : set.completed}"
                            @click="approveWorkout(set, index, exercise.id)"
                        ><fa icon="check"></fa></div>
                    </div>
                    <div class="divder"></div>
                </div>
            </div>
            <div class="exercise-summary" v-else-if="exercise.skipped">
                <p >Øvelse sprunget over.</p>
            </div>
            <div class="exercise-summary" v-else-if="allApproved">
                <p >Øvelse færdig, {{ avgWeight }} kg x {{ exercise.set.length }} sæt</p>
            </div>
            <div class="exercise-summary" v-else>
                <p>{{ avgWeight }} kg x {{ exercise.set.length }} sæt</p>
            </div>
        </transition>
    </div>
</template>


<script>
import HoverMenu from "../components/HoverMenu/HoverMenu.vue"

export default {
    /*
        A workout is displayed in the context of an ongoing workout.
    */
    name : 'WorkoutDisplay',
    components : {
        HoverMenu
    },
    props : {
        ["exercise"] : Object,
        ["expand"] : Boolean
    },
    emits : {
        ["send-rep"] : Object,
        ["skipped"] : Object,
        ["change-set"] : Object
    },
    data() {
        return {
            contracted : false,
            hovMen: ["Skip exercise"],
            displayHover: false,
            allApproved : false
        }
    },
    computed: {
        avgWeight() {
            let amount = 0
            for (let set of this.exercise.set){
                amount = amount + set.weight 
            }
            return Math.round(amount / this.exercise.set.length)
        }
    },
    methods : {
        approveWorkout(set, index, exerciseId) {
            let allApproved = true
            for (let i = 0; i < index; i++) {
                if (this.exercise.set[i].completed != true) {
                    allApproved = false 
                    break;
                }
            }
            if (allApproved)  {
                set.completed = true
                this.$emit('send-rep', { set : set, exerciseId : exerciseId}) 
                if (index == this.exercise.set.length - 1) {
                    this.contracted = true
                    this.allApproved = true
                }
            }
        },
        repPicker(index, set){
            this.emitter.emit('picker', {
                number : set.repetitions, 
                unit : "reps", 
                steps : 1
            } )
            this.emitter.on('picker-completed', (data) => {
                this.onCompleteReps(data, index)
                this.emitter.off('picker-completed')
            })
        },
        weightPicker(index, set){
            this.emitter.emit('picker', {
                number : set.weight, 
                unit : "kg",
                steps : 2.5
            }
            )
            this.emitter.on('picker-completed', (data) => {
                this.onCompleteWeight(data, index)
                this.emitter.off('picker-completed')
            })
        },
        handleOption(item){
            /*
                Handle the option clicked in the HoverMenu component.
            */
            switch(item) {
                case this.hovMen[0]:
                    this.contracted = true;
                    this.$emit("skipped", {exerciseId : this.exercise.id } )
                    break;
            }
        },
        checkAllApproved() {
            let allApproved = true
            for (let i = 0; i < this.exercise.set.length - 1; i++) {
                if (this.exercise.set[i].completed != true) {
                    allApproved = false 
                    break;
                }
            }
            return allApproved
        },
        onCompleteWeight(data, index) {
            this.$emit('change-set', {
                newSet : this.exercise.set[index],
                index : index,
                exerciseId : this.exercise.id
            })
        },
        onCompleteReps(data, index) {
            this.$emit('change-set', {
                newSet : this.exercise.set[index],
                index : index,
                exerciseId : this.exercise.id
            })
        }
    },
    updated() {
        this.contracted = !this.expand
        this.allApproved = this.checkAllApproved()
    },
    mounted() {

    }
}
</script>



<style scoped lang="scss">
@import "../assets/variables.scss";

.workout-card {
    @include workout-card
}


.flex-container {
    display: flex;
    position: relative;
    flex-direction: row;  
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    width: 100%;

    h3 {
        font-weight: 700; 
        text-align: left;
        font-size: 1.3rem;
    }

    #title:hover {
        cursor: pointer;
    }


    .icon-container {
        width: 2rem;
    }

    .dots {
        color: lighten($text-color, 30%);

        &:hover {
            color: $text-color; 
            cursor: pointer;
        }
    }
}

.divder {
  @include divider;
}

.exercise-summary {


    
    & > p {
        text-align: left;
    }
}

.rep-table {
    display: table;
    width: 100%;
    padding: 0 0.5rem;

    .top-row {
        display: flex; 
        justify-content: space-between;
        .table-header {
            flex: 1;
            padding: 0.3rem 0;
            font-weight: 700;
        }
    }

    .repetition-row {
        display: flex;
        justify-content: space-between;
        margin: 0.25rem 0;
        border-radius: 4px;

        .table-content {
            flex: 1;
            padding: 0.25rem 1.25rem;
            margin: 0 0.5rem; 
            background-color: $background-color;
            border-radius: 4px;
        }

        .table-content.set {
            background-color: transparent;
        }


        .tableContentCompleted {
            background-color: transparent;
            color: white;
        }

    }
}

.fade-enter-active {
  animation: move-list 0.4s linear;
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

.repetitionRowCompleted {
    background-color: lighten( $accent-color , 40%);
}


</style>
