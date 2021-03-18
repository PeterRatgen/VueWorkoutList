<template>
  <div>
    <HelloHeader class="hello-header" v-bind:header="headerItem"/>
    <div class="todo-block">
      <div class="todo">
        <WorkoutList v-bind:workouts="user.workout" v-on:toggle-todo="toggleTodo" v-on:del-todo="deleteTodo"/>
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
   width: 95%;
  }
  .hello-header {
    width: 95%;
  }
}

</style>

