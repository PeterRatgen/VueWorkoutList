<template>
  <div id="app">
    <HelloHeader v-bind:header="headerItem"/>
    <div class="todo-block">
      <div class="todo">
        <WorkoutList v-bind:workouts="user.workout" v-on:toggle-todo="toggleTodo" v-on:del-todo="deleteTodo"/>
      </div>
    </div>
  </div>
</template>

<script>
import HelloHeader from '../components/HelloHeader.vue'
import WorkoutList from '../components/WorkoutList';
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    WorkoutList,
    HelloHeader
  },
  data() {
    return {
      user: {},
      headerItem : ''
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
        this.headerItem = data[0].name
        console.log(this.headerItem)
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

#app {
  padding: 5vh 5vw
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
  padding-top: 25px;

}
.todo-block {
  width: 40%;
  margin: 0 auto;
}

@media only screen and (max-width: 1350px) {
  .todo-block {
    width: 60%;
  }
}
@media only screen and (max-width: 600px) {
  .todo-block {
   width: 95%;
  }
}

</style>

