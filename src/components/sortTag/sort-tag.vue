<template>
  <!-- 用法 <sort-tag text="排序" resetValue="0" @click="click"></sort-tag> -->
  <div @click="sortFun" class="sort">
    {{ text }}
    <span class="sortTag">
      <i
        class="arrow default"
        :class="{
          default: order === '',
          up: order === 'asc',
          down: order === 'desc',
        }"
      ></i>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    defaultOrder: {
      //最开始排序的状态 不传就是空
      type: String,
      default: "",
    },
    resetValue: Number, //重置当前排序状态 随机生成数
    text: String, //排序左边的文字
  },
  data() {
    return {
      order: this.defaultOrder ? this.defaultOrder : "",
    }
  },
  watch: {
    // 修改resetValue来清空状态
    // 比如 resetValue = Math.random()
    resetValue: function () {
      this.order = ""
    },
  },
  methods: {
    /**
     * asc-升序，desc-降序
     */
    sortFun() {
      if (!this.order) {
        this.order = "asc"
      } else if (this.order == "asc") {
        this.order = "desc"
      } else if (this.order == "desc") {
        this.order = ""
      }

      // 冒泡出去给的事件 还有状态返回回去
      this.$emit("click", this.order)
    },
  },
}
</script>
<style lang="less" scope>
.sort {
  display: flex;
  align-items: center;

  .sortTag {
    display: inline-block;
    color: #999;
    width: 22rpx;
    height: 22rpx;
    .arrow {
      display: inline-block;
      background-size: 100%;
      width: 100%;
      height: 100%;
    }
    .default {
      background-image: url("./sortImg/arrow.png");
    }
    .up {
      background-image: url("./sortImg/arrow-up.png");
    }
    .down {
      background-image: url("./sortImg/arrow-down.png");
    }
  }
}
</style>