<template>
  <div class="todo-item" v-bind:class="{'is-complete':todo.completed}">
    <div v-if="todo.completed === true">  
    <div class="todo-flex">  
      <input type="checkbox" v-on:change="$emit('toggle-todo', todo.id)" checked> 
      <p>{{todo.title}}</p>
      <button @click="$emit('del-todo', todo.id)" class="del">x</button>
    </div>
    </div>
    <div v-else>  
    <div class="todo-flex"> 
      <input type="checkbox" v-on:change="$emit('toggle-todo', todo.id)" > 
      <p>{{todo.title}}</p>
      <button @click="$emit('del-todo', todo.id)" class="del">x</button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todo"],
}
</script>

<style scoped>
  .todo-item {
    background: #f4f4f4;
    padding: 10px;
    border-bottom: 1px #ccc dotted;
    border-radius: 20px;
    margin: 10px 0;
  }
  .todo-flex {
    display: flex;
    flex-wrap: none;
    flex-direction: row;
  }
  .todo-flex > p {
    width: stretch;
    text-align: left;
  }
  .todo-flex > button, p, input {
    margin: auto 3%;
  }


  .is-complete {
    text-decoration: line-through;
  }
  .del {
    background-color: #dddddd;
    color: #111;
    border: none;
    padding: 5px 9px;
    border-radius: 50%;
    cursor: pointer;
    float: right;
  }
</style>
