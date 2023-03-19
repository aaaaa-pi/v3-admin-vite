<template>
  <div class="panel">
    <div class="title">
      <h1>后台管理系统</h1>
    </div>
    <div class="tab">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane label="帐号登录" name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <PanelAccount ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <PanelPhone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isKeepPwd" label="记住密码" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLoginBtnClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import PanelAccount from './panel-account.vue'
import PanelPhone from './panel-phone.vue'

const isKeepPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isKeepPwd, (newValue) => {
  console.log(newValue)
  localCache.setCache('isRemPwd', newValue)
})
const activeName = ref('account')
const accountRef = ref<InstanceType<typeof PanelAccount>>()

function handleLoginBtnClick() {
  if (activeName.value == 'account') {
    accountRef.value?.loginAction(isKeepPwd.value)
  } else {
    ElMessage.error('没有做手机的登录，请使用帐号密码登录')
  }
}
</script>

<style lang="less" scoped>
.panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
