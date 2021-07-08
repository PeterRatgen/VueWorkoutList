<template>
  <div @click="backgroundPressed()">
    <HelloHeader class="hello-header" v-bind:header="jwtData.name" v-on:click="getWorkout"/>
    <div class="todo-block">
      <div class="todo">
        <WorkoutList 
            v-bind:workouts="workouts" 
            v-on:title-change="titleChange"
            v-on:delete-workout="deleteWorkout"
        />
        <AddWorkout/>
      </div>
    </div>
  </div>
</template>

<script>
import AddWorkout from '../components/AddWorkout'
import HelloHeader from '../components/HelloHeader.vue'
import WorkoutList from '../components/WorkoutList';
import axios from 'axios'

export default {
    name: 'Home',
        components: {
        WorkoutList,
        HelloHeader,
        AddWorkout
        },
        data() {
            return {
                user: {},
                headerItem : '',
                email : 'peter@pratgen.dk',
                password : 'safe',
                apiInstance : '',
                workouts : ''
            }
    },
    methods: {
        async init() {
            await this.login()
            this.apiInstance = this.createInstance();  
            await this.getWorkout();
        },
        async login() {
            try {
                let response = await axios.post("https://pratgen.dk/todo/login",
                {
                    email : this.email, 
                    password: this.password
                })
                let token = response.data
                localStorage.setItem("user", token)
            } catch (err) {
                console.log(err)
            }
        },
        createInstance() {
            const token = localStorage.getItem("user")
            return axios.create({
                baseURL: "https://pratgen.dk/todo",
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
        },
        async getWorkout() {
            const response = await this.apiInstance.get('/workout')
            this.workouts = JSON.parse(response.request.response)
        },
        titleChange(workoutId, newName){
            this.apiInstance.post('/workout/rename',
                {
                    id : workoutId,
                    name : newName
                }
            )
            let ele = this.workouts.find(element => element["_id"] == workoutId)
            ele["title"] = newName
        },
        deleteWorkout(workoutId) {
            this.apiInstance.delete('/workout/' + workoutId )
            let ele = this.workouts.find(element => element["_id"] == workoutId)
            let index = this.workouts.indexOf(ele)
            this.workouts.splice(index, 1)
        },
        addRepetition(data){
            console.log("adding rep " + data["name"]+ " " + data["id"] )
            let workout = this.workouts.find(element => element["_id"] == data["id"])
            console.log("workout" + workout)
            let exercise = workout["exerciseList"].find(ele => ele["name"] == data["name"])
            const length = exercise["set"].length
            if (length > 1) {
                const weight = exercise["set"][length - 1]["weight"];
                const reps = exercise["set"][length - 1]["repetitions"];
                exercise["set"].push({repetitions : reps, weight : weight}) 
            } else {
                exercise["set"].push({repetitions : 0, weight : 0}) 
            }
        },
        changeRep(data){
            console.log("chaning reps")
            let workout = this.workouts.find(element => element["_id"] == data["workoutId"])
            let exercise =  workout["exerciseList"][data["exerciseIndex"]]
            let rep = exercise["set"][data["repIndex"]]
            rep.repetitions = data["repItem"].repetitions
            rep.weight = data["repItem"].weight
            this.apiInstance.post('/workout/update_exercise', {
                id: data["workoutId"],
                exerciseList : workout["exerciseList"]
            })
        },
        backgroundPressed() {
            console.log("Pressed background")
            this.emitter.emit('pressed-background')
        },
        async submitWorkout(data) {
            const res = await this.apiInstance.post('/workout', data)
            data._id =  res.data
            this.workouts.push(data)
        },
        changeExerciseName(data) {
            console.log("Changing exercise name")
            let workout = this.workouts.find(element => element["_id"] == data["workoutId"])
            let exercise =  workout["exerciseList"][data["exerciseIndex"]]
            exercise.name = data["name"]
            this.apiInstance.post('/workout/update_exercise', {
                id: data["workoutId"],
                exerciseList : workout["exerciseList"]
            })
        },
        deleteExercise(data) {
            let workout = this.workouts.find(element => element["_id"] == data["workoutId"])
            workout["exerciseList"].splice(data["exerciseIndex"], 1)
            this.apiInstance.post('/workout/update_exercise', {
                id: data["workoutId"],
                exerciseList : workout["exerciseList"]
            })
        }
    },
    computed : {
        jwtData() {
            const token = localStorage.getItem("user")
            if (token) {
                        return JSON.parse(atob(token.split('.')[1]))
            }
            else {
                return {};
            }
        }
    },
    created() {
        this.init()
    },
    mounted() {
        this.emitter.on('new-repetition', this.addRepetition)
        this.emitter.on('completed-rep-edit', this.changeRep)
        this.emitter.on('submit-new-workout', this.submitWorkout)
        this.emitter.on('exercise-name-change', this.changeExerciseName)
        this.emitter.on('delete-exercise', this.deleteExercise)
    }
}

</script>

<style lang="scss" >
@import "../assets/variables.scss";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}


body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}
.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
}
.btn:hover {
  background: #666;
}
.addtodo {
  padding-top: 25px;
}

.todo {
  padding-top: 0.3rem;

}
.todo-block {
  width: $content-width;
  margin: 0 auto;
}

.hello-header {
  width: calc(#{$content-width} - 2%);
  margin: 0 auto;
}

@media only screen and (max-width: 1400px) {
  .todo-block {
    width: 60%;
  }
  .hello-header {
    width: 60%;
  }
}


@media only screen and (max-width: 1000px) {
  .todo-block {
    width: 80%;
  }
  .hello-header {
    width: 80%;
  }
}

@media only screen and (max-width: 600px) {
  .todo-block {
   width: 100%;
  }
  .hello-header {
    width: 95%;
  }
}

</style>

