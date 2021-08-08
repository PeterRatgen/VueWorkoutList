<template>
    <div> <!-- Top bar -->
        <fa icon="arrow-left"></fa>
    </div>
    <div> <!-- Header -->
        <h1 class="header">{{ workout.title }}</h1>
        <div class="accent-divider"></div>
    </div>
</template>


<script>
export default {
    name : 'WorkoutProcess',
    props : {
        ["workout"] : Object
    },
    data() {
        return {

        }
    }, 
    mounted()  {
        console.log(this.$route.params.id)
    }
}
</script>



<style scoped lang="scss">
@import "../assets/variables.scss";

.header {
    @include header;
}
.accent-divider {
    margin-top: 0.3rem;
    width: 10rem;
    height: 0.5rem;
    background: $accent-color;
}

</style>
