import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstmenu } from '@/utils/map-menus'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      name: 'main',
      path: '/main',
      component: () => import('../view/main/Main.vue')
    },
    {
      path: '/login',
      component: () => import('../view/login/Login.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../view/not-found/NotFound.vue')
    }
  ]
})

//路由守卫
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  if (to.path === '/main') {
    return firstmenu?.url
  }
})

export default router
