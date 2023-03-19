<template>
  <div class="search">
    <el-card>
      <!-- 查询表单 -->
      <el-form
        :model="searchForm"
        ref="formRef"
        label-width="80px"
        size="large"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="用户名" prop="name">
              <el-input
                v-model="searchForm.name"
                placeholder="请输入需要查询的用户名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="真实姓名" prop="realName">
              <el-input
                v-model="searchForm.realName"
                placeholder="请输入需要查询的真实姓名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码" prop="cellphone">
              <el-input
                v-model="searchForm.cellphone"
                placeholder="请输入需要查询的手机号码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态" prop="enable">
              <el-select
                v-model="searchForm.enable"
                placeholder="查询状态"
                style="width: 100%"
              >
                <el-option label="开启" :value="1" />
                <el-option label="禁用" value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="修改时间" prop="creatAt">
              <el-date-picker
                v-model="searchForm.creatAt"
                type="datetimerange"
                range-separator="To"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 按钮 -->
      <div class="btns">
        <el-button type="primary" size="large" icon="Search">查询</el-button>
        <el-button size="large" icon="refresh" @click="handleResetClick">
          重置
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'

const searchForm = reactive({
  name: '',
  realName: '',
  cellphone: '',
  enable: 1,
  creatAt: []
})
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  formRef.value?.resetFields()
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
  }
}
</style>
