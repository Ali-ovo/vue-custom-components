<template>
  <div class="index">
    <header>点击跳转对应组件</header>

    <div class="links">
      <button @click="goToloadingn">Loading</button>
      <button @click="gotoSortTag">SortTag</button>
      <button @click="gotoNumber">animationNumberPage</button>
      <button @click="gotoPullList">pullListPage</button>
      <button @click="gotoVirtualList">virtualList</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToloadingn = () => {
  router.push('/loading')
}
const gotoSortTag = () => {
  router.push('/sorttag')
}

const gotoNumber = () => {
  router.push('/number')
}
const gotoPullList = () => {
  router.push('/pullList')
}

const gotoVirtualList = () => {
  router.push('/virtualList')
}
</script>
<script lang="ts">
export default {
  name: 'App',
}
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
