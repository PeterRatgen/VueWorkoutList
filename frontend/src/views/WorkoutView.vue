<template>
  <div @click="backgroundPressed()">
    <HelloHeader class="hello-header" v-bind:header="jwtData.name" v-on:click="getWorkout"/>
    <div class="todo-block">
      <div class="todo">
          <div v-bind:key="workout" v-for="workout in workouts" >
            <Workout 
                v-bind:workout="workout" 
            />
          </div>
        <AddWorkout/>
      </div>
    </div>
  </div>
</template>

<script>
import AddWorkout from '../components/AddWorkout'
import HelloHeader from '../components/HelloHeader.vue'
import Workout from '../components/Workout'
import axios from 'axios'

export default {
    /**
        View of the workouts.
    */
    name: 'WorkoutView',
        components: {
            Workout,
            HelloHeader,
            AddWorkout
        },
        data() {
            return {
                /*
                    The user is the JWT Token, which stores the token of the
                    user, which is logged in.
                */
                user: {},
                headerItem : '',
                email : 'peter@pratgen.dk',
                password : 'safe',
                /*
                    Instance of the axios connection, where queries to the API
                    can be performed.
                */
                apiInstance : '',
                /* 
                   Array of the workouts 
                */
                workouts : []
            }
    },
    methods: {
        async init() {
            /*
                Init script, initializes the website with data, and API instances.
            */
            await this.login()
            this.apiInstance = this.createInstance();  
            await this.getWorkout();
        },
        async login() {
            /**
                Logs in with the stored credentials, and stores the JSON Web
                Token retured by the endpoint
            */
            try {
                let response = await axios.post("https://liftlog.app/api/login",
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
            /**
                Saves an instance of the API connection, as not to repeat the
                Bearer Token
            */
            const token = localStorage.getItem("user")
            return axios.create({
                baseURL: "https://liftlog.app/api",
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
        },
        async getWorkout() {
            /**
                Retrieve the workouts of the user, and save the response.
            */
            const response = await this.apiInstance.get('/workout')
            this.workouts = JSON.parse(response.request.response)
        },
        async titleChange(data){
            /**
                Change the title of a workout.
            */
            let res = await this.apiInstance.post('/workout/rename',
                {
                    id : data["workoutId"],
                    title : data["title"]
                }
            )
            console.log(res)
            let ele = this.workouts.find(element => element._id == data.workoutId)
            ele.title = data.title
        },
        deleteWorkout(workoutId) {
            /**
                Delete one workout. First on the database, and then in the data
                stores locally.
            */
            this.apiInstance.delete('/workout/' + workoutId )
            let ele = this.workouts.find(element => element["_id"] == workoutId)
            let index = this.workouts.indexOf(ele)
            this.workouts.splice(index, 1)
        },
        async addRepetition(data){
            /**
                Add a repetition to a workout. If another repetition exists
                before it, then add the same weight and reps to the new one.
                
                @exerciseId - id of the exercise
                @workoutId - id of the workout
            */
            let workout = this.workouts.find(element => element["_id"] == data.workoutId)
            let exercise = workout.exerciseList.find(element => element.id == data.exerciseId)
            const length = exercise.set.length
            let repItem = {}
            if (length > 0) {
                const weight = exercise.set[length - 1].weight;
                const reps = exercise.set[length - 1].repetitions;
                repItem = {repetitions : reps, weight : weight}
            } else {
                repItem = {repetitions : 0, weight : 0}
            }
            data.repItem = repItem
            let res = await this.apiInstance.put('/workout/add_repetition', data)
            repItem.id = res.data
            exercise.set.push(repItem) 
        },
        async changeRep(data){
            /**
                Change a rep of the workout. First in the local data, then in
                the database.
            */
            let workout = this.workouts.find(element => element._id == data.workoutId)
            let exercise =  workout.exerciseList.find(element => element.id == data.exerciseId)
            let rep = exercise.set.find(element => element.id == data.repItem.id)
            rep.repetitions = data.repItem.repetitions
            rep.weight = data.repItem.weight
            this.apiInstance.put('/workout/rep_change', {
                workoutId: data["workoutId"],
                exerciseId : data["exerciseId"],
                repItem: data["repItem"]
            })
            console.log("changed rep to " + JSON.stringify(data["repItem"]))
        },
        backgroundPressed() {
            this.emitter.emit('pressed-background')
        },
        async submitWorkout(data) {
            /**
                Add a new workout to the user.
            */
            const res = await this.apiInstance.post('/workout', data)
            data._id =  res.data
            this.workouts.push(data)
        },
        async changeExerciseName(data) {
            /**
                Change the name of an exercise.
            */
            console.log(data)
            let workout = this.workouts.find(element => element["_id"] == data["workoutId"])
            let exercise =  workout["exerciseList"].find(element => element["id"] == data["exerciseId"])
            exercise.name = data["name"]
            let res = await this.apiInstance.put('/workout/rename_exercise', {
                id: data["workoutId"],
                exerciseId : data["exerciseId"],
                name : data["name"]
            })
            console.log(res)
        },
        deleteExercise(data) {
            /*
                Delete an exercise.
            */
            let workout = this.workouts.find(element => element["_id"] == data["workoutId"])
            let exercise = this.workouts.find(element => element.id == data.exerciseId)
            let index =  this.workouts.indexOf(exercise);
            workout["exerciseList"].splice(index, 1)
            this.apiInstance.post('/workout/update_exercise', {
                id: data["workoutId"],
                exerciseList : workout["exerciseList"]
            })
        },
        async addExercise(data) {
            /*
                @data contains 
                    workoutId - for the workout where the exercise should be
            */
            let response = await this.apiInstance.put('/workout/add_exercise', {
                workoutId : data.workoutId
            })
            let exerciseId = response.data
            if(typeof(exerciseId) == "string") {
                if (exerciseId.length == 24){
                    let workout = this.workouts.find(element => element["_id"] == data.workoutId)
                    workout["exerciseList"].push({id :  exerciseId, name: "", set: []})
                } else {
                    console.warn("Server did not return an id of correct length")
                }
            } else {
                console.warn("Server did not return a proper id")
            }
        },
        deleteRep(data) {
            /*
                Delete a repetition of an exercise in a workout.
            */
            let workout = this.workouts.find(element => element["_id"] == data.workoutId)
            let exercise = workout.exerciseList.find(element => element.id == data.exerciseId)
            exercise.set.splice(data.repIndex, 1)
            this.apiInstance.post('/workout/update_exercise', {
                id: data.workoutId,
                exerciseList : workout.exerciseList
            })
        }
    },
    computed : {
        jwtData() {
            /**
                Get the data stored within the jwt token.         
            */
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
        /**
            Receiving emitted events
        */
        this.emitter.on('new-repetition', this.addRepetition)
        this.emitter.on('completed-rep-edit', this.changeRep)
        this.emitter.on('submit-new-workout', this.submitWorkout)
        this.emitter.on('exercise-name-change', this.changeExerciseName)
        this.emitter.on('delete-exercise', this.deleteExercise)
        this.emitter.on('add-exercise', this.addExercise)
        this.emitter.on('delete-rep', this.deleteRep)
        this.emitter.on('title-change', this.titleChange)
        this.emitter.on('delete-workout', this.deleteWorkout)
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

