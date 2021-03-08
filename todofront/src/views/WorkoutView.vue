<template>
  <div id="app">
    <div class="todo-block">
      <div class="addtodo">
        <AddWorkout v-on:add-todo="addTodo" />
      </div>
      <div class="todo">
        <WorkoutList v-bind:workouts="user.workout" v-on:toggle-todo="toggleTodo" v-on:del-todo="deleteTodo"/>
        <p>lol</p>
      </div>
    </div>
  </div>
</template>

<script>
import WorkoutList from '../components/WorkoutList';
import AddWorkout from '../components/AddWorkout.vue';
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    WorkoutList,
    AddWorkout
  },
  data() {
    return {
      user: {}
    }
  },
  methods: {
    toggleTodo(id) {
      let itemIndex = this.todos.findIndex(todo => todo.id === id);
      let todoItem = this.todos[itemIndex];
      todoItem.completed = !todoItem.completed;
      this.todos[itemIndex] = todoItem;
    },
    deleteTodo(id) {
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(this.todos = this.todos.filter(todo => todo.id !== id))
        .catch((err) => console.log(err));
    },
    addTodo(newTodo) {
      const { title, completed } = newTodo;
      axios.post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed
      })
        .then(res => this.todos = [...this.todos, res.data])
        .catch(err => console.log(err));
    }
  },
  created() {
    fetch('https://pratgen.dk/todo/getUser/peter12')
      .then(response => response.json())
      .then(data => {
        this.user = data[0]
      })
      .catch(err => console.log(err));
  }
}

</script>

<style>
* {
  box-sizing: border-box;
margin: 0;
padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  padding: 30px;
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
.todo-block {
  margin-left: auto;
  width: 60%;
  margin-right: auto;
}
.addtodo {
  padding-top: 25px;
}

.todo {
  padding-top: 25px;
}

</style>

