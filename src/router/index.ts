import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'
import { basicRoutes, LoginRoute } from './routes'

const WHITE_NAME_LIST = [LoginRoute.name]

const router = createRouter({
    history: createWebHistory(String(import.meta.env.BASE_URL)),
    routes: (basicRoutes as unknown) as RouteRecordRaw[],
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

// reset router
export function resetRouter() {
    router.getRoutes().forEach((route) => {
        const { name } = route
        if (name && !WHITE_NAME_LIST.includes(name as string)) {
            router.hasRoute(name) && router.removeRoute(name)
        }
    })
}
// config router
export function setupRouter(app: App<Element>) {
    app.use(router)
}

export default router
