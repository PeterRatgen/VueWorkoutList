<template>
    <div class="workout-card">
        <div class="exercise-name">
            <h3>{{ exercise.name }}</h3>
        </div>
        <table class="rep-table">
            <tr>
                <th >Set</th>
                <th>Vægt</th>
                <th>Reps</th>
                <th>Done</th>
            </tr>
            <tr class="repetition-row" v-for="(set, index) in exercise.set" :key="set.id">
                <td class="set">{{ index + 1 }}</td>
                <td>{{ set.weight }}</td>
                <td>{{ set.repetitions }}</td>
                <th><fa icon="check"></fa></th>
            </tr>
        </table>
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
    },
    data() {
        return {
        }
    },
    computed: {
    },
    methods : {
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

.repetition-row {
}

.rep-table {
    margin: auto;
    width: 90%;


    & > tr {
        & > td {
            padding: 0.2rem;
            background-color: $background-color;
            border-radius: 4px;
        }
        & > td.set {
            background-color: transparent;
        }
    }

}

</style>
