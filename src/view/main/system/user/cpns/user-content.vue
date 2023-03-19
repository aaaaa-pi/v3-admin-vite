<template>
  <div class="content">
    <el-card>
      <div class="header">
        <h2 class="title">用户列表</h2>
        <el-button type="primary" size="large"> 新建用户 </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.content {
  background-color: #fff;
  padding: 0 20px;
  border-radius: 8px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
}
</style>
