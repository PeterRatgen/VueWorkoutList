<template>
    <div class="top-bar"> <!-- Top bar -->
        <div class="back-button" @click="$emit('back')"> 
            <fa class="arrow" icon="arrow-left"  ></fa>
        </div>
        <p class="timer">{{ timeSinceStart }}</p>
    </div>
    <div class="header-container"> <!-- Header -->
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
    emits : {
        ["back"] : undefined
    },
    data() {
        return {
            timeSinceStart : ''
        }
    },
    computed: {
    },
    methods : {
        calcTime() {
            let timeOfStart = new Date()
            setInterval(() => {
                let a = new Date()
                let toExpired = a.valueOf() - timeOfStart.valueOf()
                let date = new Date(toExpired)
                let secs = date.getSeconds()
                if (secs < 10) {
                    secs = "0" + secs
                } 
                let print = date.getMinutes() + ':' + secs
                this.timeSinceStart = print
            }, 1000)
        }
    },
    mounted() {
        this.calcTime()
    }
}
</script>



<style scoped lang="scss">
@import "../assets/variables.scss";

.header-container {
    width: 95%;
    margin: auto;
    .header {
        @include header;
    }

}

.accent-divider {
    margin-top: 0.3rem;
    width: 10rem;
    height: 0.5rem;
    background: $accent-color;
}


.top-bar {
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .back-button {
        display: inline-block;
        position: relative;
        width: 3rem;
        height: 3rem;
        background-color: #fff;
        border: 2px #ddd solid;
        border-radius: 50%;
    }

    .timer {
        display: inline;
        font-weight: 600;
        font-size: 1.2rem;
        margin-right: 10%;
    }
}

.arrow {
    font-size: 1.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>
