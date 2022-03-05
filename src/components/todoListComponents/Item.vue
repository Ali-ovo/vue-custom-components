<template>
  <li
    :style="{
      backgroundColor: bgColor,
      color: myColor,
    }"
    @mouseenter="mouseHanlder(true)"
    @mouseleave="mouseHanlder(false)"
  >
    <label>
      <input type="checkbox" v-model="isCompetete" />
      <span>{{ todo.title }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleTodo">
      删除
    </button>
  </li>
</template>

<script lang="ts">
import { Todo } from "@/types/todo";
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  name: "Item",
  props: {
    todo: {
      type: Object as () => Todo, // 函数返回的是Todo类型,
      required: true,
    },
    deleteTodo: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    updateTode: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    // 背景色
    const bgColor = ref("white");
    // 前景色
    const myColor = ref("black");
    // 控制按钮显示
    const isShow = ref(false);

    // 鼠标进入和离开事件的回调函数
    const mouseHanlder = (flag: boolean) => {
      if (flag) {
        // 鼠标进入
        bgColor.value = "skyblue";
        myColor.value = "white";
        isShow.value = true;
      } else {
        // 鼠标离开
        bgColor.value = "white";
        myColor.value = "black";
        isShow.value = false;
      }
    };

    // 删除数据的方法
    const deleTodo = () => {
      // 提示
      if (window.confirm("确定删除吗?")) {
        props.deleteTodo(props.index);
      }
    };

    // 计算属性的方式来让当前的复选框选中/不选中
    const isCompetete = computed({
      get() {
        return props.todo.isCompleted;
      },
      set(val) {
        // todo对象中的 isCompleted 操作
        props.updateTode(props.todo, val);
      },
    });

    return {
      mouseHanlder,
      bgColor,
      myColor,
      isShow,
      deleTodo,
      isCompetete,
    };
  },
});
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
