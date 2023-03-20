import { defineStore } from 'pinia'
import { getUserListData } from '@/service/main/system/system'
import { pagination } from '@/utils/pagination'
import type { ISystemStore } from './type'
const userSystemStore = defineStore('system', {
  state: (): ISystemStore => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async getUserListAction() {
      const usersListResult = await getUserListData()
      const list = usersListResult.data.list
      const totalCount = list.length
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    currentChange(value: any, pageSize: number) {
      return pagination(value, pageSize, this.usersList)
    }
  }
})

export default userSystemStore
