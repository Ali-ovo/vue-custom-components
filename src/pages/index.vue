<template>
  <div class="index">
    <header>点击跳转对应组件</header>

    <div class="links">
      <!-- <button @click="gotoNewVue3">Vue-ToDoList</button> -->
      <button @click="goToloadingn">Loading</button>
      <button @click="gotoSortTag">SortTag</button>
      <button @click="gotoNumber">animationNumberPage</button>
      <button @click="gotoPullList">pullListPage</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { reactive, toRefs, defineComponent } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    const data = reactive({});
    const refData = toRefs(data);
    const router = useRouter();

    function gotoNewVue3() {
      router.push("/todoList");
    }

    const goToloadingn = () => {
      router.push("/loading");
    };
    const gotoSortTag = () => {
      router.push("/sorttag");
    };

    const gotoNumber = () => {
      router.push("/number");
    };
    const gotoPullList = () => {
      router.push("/pullList");
    };
    return {
      ...refData,
      gotoNewVue3,
      goToloadingn,
      gotoSortTag,
      gotoNumber,
      gotoPullList,
    };
  },
});
</script>

<style scoped>
.index {
  /* width: 1200px;
  height: 100vh; */
  margin: 0 auto;
}
header {
  font-size: 30px;
  font-weight: 700;
  margin: 30px auto;
  text-align: center;
}

.links {
  /* width: 100%;
  display: flex; */
}

button {
  margin: 10px;
}
</style>
