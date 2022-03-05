<template>
  <ul class="todo-main">
    <Item
      v-for="(todo, index) in todos"
      :key="todo.id"
      :todo="todo"
      :deleteTodo="deleteTodo"
      :index="index"
      :updateTode="updateTode"
    ></Item>
  </ul>
</template>

<script lang="ts">
import Item from "./Item.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "List",
  components: { Item },
  props: ["todos", "deleteTodo", "updateTode"],
  setup() {
    return {};
  },
});
</script>

<style  scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
