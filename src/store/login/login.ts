import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import { mapMenusToRouter } from '@/utils/map-menus'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async LoginAccountActive(account: IAccount) {
      const loginAccount = await accountLoginRequest(account)
      const id = loginAccount.data.id
      this.token = loginAccount.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      this.userMenus = userMenusResult.data

      localCache.setCache('userInfo', this.userInfo)
      localCache.setCache('userMenus', this.userMenus)
      router.push('/main')

      // 动态添加路由
      const routes = mapMenusToRouter(this.userMenus)
      if (routes) routes.forEach((route) => router.addRoute('main', route))
    },
    loadLoginCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
        // 动态添加路由
        const routes = mapMenusToRouter(this.userMenus)
        if (routes) routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
