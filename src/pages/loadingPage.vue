<template>
  <div class="loading">
    <sipnLoading fix v-if="loading"></sipnLoading>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent, ref, onMounted } from "vue"
import sipnLoading from "../components/spinLoading/spin.vue"
export default defineComponent({
  name: "myLoading",
  components: {
    sipnLoading,
  },
  setup() {
    const data = reactive({})
    const refData = toRefs(data)
    const loading = ref(true)

    onMounted(() => {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    })

    return {
      ...refData,
      loading,
    }
  },
})
</script>

<style scoped>
.loading {
  width: 300px;
  height: 300px;
  position: relative;
  margin: 0 auto;
  background-color: skyblue;
}
</style>
