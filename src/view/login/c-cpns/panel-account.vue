<template>
  <div class="panel-account">
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
      ref="formRef"
    >
      <el-form-item label="帐号" prop="username">
        <el-input v-model="account.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" type="password" showPassword />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { ElForm, FormRules } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'username'
const CACHE_PASSWORD = 'password'

const account = reactive<IAccount>({
  username: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})
const accountRules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: '必须输入帐号信息',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,20}$/,
      message: '必须由5-20位的数字和字母组成',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '必须输入密码信息',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须由6-20位的数字和字母组成',
      trigger: 'blur'
    }
  ]
})
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isKeepPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      const username = account.username
      const password = account.password
      loginStore.LoginAccountActive({ username, password }).then(() => {
        if (isKeepPwd) {
          localCache.setCache(CACHE_NAME, username)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('请您输入正确的格式后再登录~~')
    }
  })
}
defineExpose({ loginAction })
</script>

<style lang="less" scoped></style>
