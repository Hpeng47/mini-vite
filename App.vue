<!--
 * @Date: 2024-04-29 20:44:24
 * @LastEditors: hhp && 775621376@qq.com
 * @LastEditTime: 2024-05-03 02:01:34
 * @FilePath: \vite-vue-min\App.vue
 * @Description: vue 项目入口
 * @Author: hehaipeng
-->
<template>
  {{ count }}
  <button @click="count++">➕</button>
  <button
    @click="
      () => {
        count++;
      }
    "
  >
    ➕
  </button>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const count = ref(0);
    return {
      count,
    };
  },
};
</script>

<style scoped></style>
