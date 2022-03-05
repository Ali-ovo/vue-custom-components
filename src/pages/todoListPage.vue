<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"></Header>
      <List
        :todos="todos"
        :deleteTodo="deleteTodo"
        :updateTode="updateTode"
      ></List>
      <Footer
        :todos="todos"
        :checkAll="checkAll"
        :clearAllCheckTodos="clearAllCheckTodos"
      ></Footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue"
// 引入直接的子级组件
import Header from "../components/todoListComponents/Header.vue"
import List from "../components/todoListComponents/List.vue"
import Footer from "../components/todoListComponents/Footer.vue"

// // 引入接口
import { Todo } from "../types/todo"

// 引入封装好操作本地存储的方法
import { saveTodos, readTodos } from "../utils/localStorageUtils"

export default defineComponent({
  name: "todoList",
  // 注册组件
  components: {
    Header,
    List,
    Footer,
  },

  // 数据应该用数组来存储 数组中每一个数据都是一个对象 对象中应该有三个属性(id,title,Completed)
  // 把数据暂且定义在App中
  setup() {
    // 定义一个数组数据
    const state = reactive<{ todos: Todo[] }>({
      todos: [],
    })

    // 界面加载完毕后过了一会儿再读取数据
    onMounted(() => {
      setTimeout(() => {
        state.todos = readTodos()
      }, 1000)
    })

    // 添加数据的方法
    const addTodo = (todo: Todo) => {
      state.todos.unshift(todo)
    }

    // 删除数据的方法
    const deleteTodo = (index: number) => {
      state.todos.splice(index, 1)
    }

    // 修改是否选中
    const updateTode = (todo: Todo, isCompleted: boolean) => {
      todo.isCompleted = isCompleted
      console.log(todo)
    }

    // 全选或者全部选的方法
    const checkAll = (check: boolean) => {
      state.todos.forEach((todo) => {
        todo.isCompleted = check
      })
    }

    // 清理所有选中数据
    const clearAllCheckTodos = () => {
      state.todos = state.todos.filter((todo) => !todo.isCompleted)
    }

    // 监视操作 如果 todos 数据发生变化就保存到浏览器缓存
    // watch(
    //   () => state.todos,
    //   (value) => {
    //     // 保存到浏览器的缓存中
    //     localStorage.setItem("todos_key", JSON.stringify(value));
    //   },
    //   { deep: true }
    // );

    // watch(
    //   () => state.todos,
    //   (value) => {
    //     saveTodos(value);
    //   },
    //   { deep: true }
    // );
    watch(() => state.todos, saveTodos, { deep: true })

    return {
      ...toRefs(state),
      addTodo,
      deleteTodo,
      updateTode,
      checkAll,
      clearAllCheckTodos,
    }
  },
})
</script>

<style  scoped>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
