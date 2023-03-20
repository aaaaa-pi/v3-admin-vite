<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" />
    <user-content ref="contentRef" />
  </div>
</template>

<script setup lang="ts">
import userSearch from './cpns/user-search.vue'
import userContent from './cpns/user-content.vue'
import { ref } from 'vue'
const contentRef = ref<InstanceType<typeof userContent>>()
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData()
}
</script>

<style lang="less" scoped></style>
