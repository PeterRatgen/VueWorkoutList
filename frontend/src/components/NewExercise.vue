<template>
    <div class="add-exercise-button" @click.stop="addExercise">
        <fa class="plus-icon" icon="plus"></fa>
    </div>
</template>

<script>

export default {
    name: "NewExercise",
    components : {
    },
    emits: {
        ['add-exercise'] : null
    },
    data() {
        return {
        }
    },
    methods: {
        addExercise() {
            let newId = this.makeId()
            this.$emit('add-exercise', { exerciseId : newId})
        },
        makeId() {
            let ID = "";
            let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            for ( var i = 0; i < 12; i++ ) {
                ID += characters.charAt(Math.floor(Math.random() * 36));
            }
            return ID;
        }

  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';
  .add-exercise-button {
    background-color: lighten($accent-color, 5%); 
    width: 5rem;
    height: 1.8rem;
    margin: auto;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;

    &:hover {
        background-color: lighten($accent-color, 20%); 
        cursor: pointer;
    }
  }

  .plus-icon {
    transform: scale(1.2);
    color: white;
  }
    
</style>
