<template>
  <div class="panel-phone">
    <el-form :model="phone" label-width="60px" size="large">
      <el-form-item label="手机号">
        <el-input v-model="phone.name" />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input />
          <el-button class="get-code" type="primary" @click="getCode"
            >发送验证码</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
const phone = reactive({
  name: '',
  password: ''
})
function getCode() {
  ElMessage.error('有点麻烦，不做了，请使用帐号密码登录！')
}
</script>

<style lang="less" scoped>
.verify-code {
  display: flex;
  .get-code {
    margin-left: 8px;
  }
}
</style>
