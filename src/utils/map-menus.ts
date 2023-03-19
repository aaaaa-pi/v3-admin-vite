import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  const loginRoutes: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  })
  for (const key in files) {
    const modules = files[key]
    loginRoutes.push(modules.default)
  }
  return loginRoutes
}
export let firstmenu: any = null
export function mapMenusToRouter(userMenus: any[]) {
  const routes: RouteRecordRaw[] = []
  const loginRoutes = loadLocalRoutes()
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = loginRoutes.find((item) => item.path === submenu.url)
      if (route) {
        if (!routes.find((item) => item.path === menu.url)) {
          // 1.给route的顶层菜单增加重定向功能(但是只需要添加一次即可)
          routes.push({ path: menu.url, redirect: route.path })
        }
        // 2.将二级菜单对应的路径
        routes.push(route)
      }

      if (!firstmenu && route) firstmenu = submenu
    }
  }
  return routes
}

export function mapPathToMenus(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) return submenu
    }
  }
  return undefined
}

export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: any[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // 1.顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        // 2. 匹配菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
