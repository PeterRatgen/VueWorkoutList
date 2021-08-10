<template>
    <div class="workout-card">
        <div class="exercise-name">
            <h3>{{ work.name }}</h3>
        </div>
        <div class="rep-table">
            <div class="top-row">
                <div class="table-header">Set</div>
                <div class="table-header">Vægt</div>
                <div class="table-header">Reps</div>
                <div class="table-header">Status</div>
            </div>
            <div v-for="(set, index) in work.set" :key="set.id">
                <div  class="repetition-row"
                    v-bind:class="{repetitionRowCompleted : set.completed}" >
                    <div class="table-content set" >{{ index + 1 }}</div>
                    <div 
                        class="table-content" 
                        v-bind:class="{tableContentCompleted : set.completed}"
                    >
                        {{ set.weight }}
                    </div>
                    <div
                        class="table-content" 
                        v-bind:class="{tableContentCompleted : set.completed}"
                    >
                        {{ set.repetitions }}
                    </div>
                    <div 
                        class="table-content set" 
                        @click="approveWorkout(set, index, work.id)"
                    ><fa icon="check"></fa></div>
                </div>
                <div class="divder"></div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    /*
        A workout is displayed in the context of an ongoing workout.
    */
    name : 'WorkoutDisplay',
    components : {
    },
    props : {
        ["exercise"] : Object
    },
    emits : {
        ["send-rep"] : Object
    },
    data() {
        return {
            work : {}
        }
    },
    computed: {
    },
    methods : {
        approveWorkout(set, index, exerciseId) {
            let allApproved = true
            for (let i = 0; i < index; i++) {
                if (this.work.set[i].completed != true) {
                    allApproved = false 
                    break;
                }
            }
            if (allApproved)  {
                set.completed = true
                this.$emit('send-rep', { set : set, exerciseId : exerciseId}) 
            }
        }
    },
    mounted() {
        this.work = this.exercise
    }
}
</script>



<style scoped lang="scss">
@import "../assets/variables.scss";

.workout-card {
    @include workout-card
}

.exercise-name {
    margin-bottom: 0.4rem;
}

.divder {
  @include divider;
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
        }

    }
}

.repetitionRowCompleted {
    background-color: lighten($go-color, 30%);
}


</style>
