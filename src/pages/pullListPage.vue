<template>
  <div class="index">
    <Pull-List></Pull-List>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import PullList from "../components/pullList/pullList.vue"
export default defineComponent({
  name: "pullListPage",
  components: {
    PullList,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.index {
  width: 400px;
  height: 100vh;
  margin: 0 auto;
}
</style>
