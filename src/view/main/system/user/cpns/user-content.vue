<template>
  <div class="content">
    <el-card>
      <div class="header">
        <h2 class="title">用户列表</h2>
        <el-button type="primary" size="large"> 新建用户 </el-button>
      </div>
      <div class="table">
        <el-table :data="obj.newList" border style="width: 100%">
          <el-table-column align="center" type="selection" width="55" />
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="60px"
          />
          <el-table-column
            align="center"
            prop="name"
            label="用户名"
            width="220px"
          />
          <el-table-column
            align="center"
            prop="realname"
            label="真实姓名"
            width="150px"
          />
          <el-table-column
            align="center"
            prop="cellphone"
            label="手机号码"
            width="160px"
          />
          <el-table-column
            align="center"
            label="状态"
            prop="enable"
            width="100px"
          >
            <template #default="scope">
              <el-button
                size="small"
                :type="scope.row.enable ? 'primary' : 'danger'"
                plain
                >{{ scope.row.enable ? '启用' : '禁用' }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="creatAt" label="创建时间" />
          <el-table-column align="center" prop="updateAt" label="更新时间" />
          <el-table-column align="center" label="操作" width="160px">
            <el-button size="small" icon="Edit" type="primary" text>
              编辑
            </el-button>
            <el-button size="small" icon="Delete" type="danger" text>
              删除
            </el-button>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          layout="total, prev, pager, next"
          :total="usersTotalCount"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, watch, reactive } from 'vue'
import userSystemStore from '@/store/main/system/system'
const systemStore = userSystemStore()
systemStore.getUserListAction()
const { usersList, usersTotalCount } = storeToRefs(systemStore)
const currentPage = ref(1)
const pageSize = ref(10)
const obj = reactive({ newList: [] })
// 分页器功能
function handleCurrentChange() {
  obj.newList = systemStore.currentChange(currentPage.value, pageSize.value)
}
watch(
  usersList,
  () => {
    // obj.ListInfo = systemStore.currentChange(pageSize)
    obj.newList = systemStore.currentChange(currentPage.value, pageSize.value)
  },
  { immediate: true }
)
// function fetchUserListData(formData: any = {}) {
//   formData user-search传入的数据
//   1.获取offset/size
//   const size = pageSize.value
//   const offset = (currentPage.value - 1) * size
//   const pageInfo = { size, offset }

//   2.发起网络请求
//   const queryInfo = { ...pageInfo, ...Data }
//   systemStore.postUserListAction(queryInfo)
// }
function fetchUserListData() {
  systemStore.getUserListAction()
}
defineExpose({ fetchUserListData })
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
  padding: 0 20px;
  border-radius: 8px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.table {
  margin-top: 24px;
  .el-button {
    margin-left: 0;
  }
}
.pagination {
  display: flex;
  justify-content: center;
}
</style>
