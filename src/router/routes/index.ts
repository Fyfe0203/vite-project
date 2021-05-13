import type { AppRouteRecordRaw, AppRouteModule } from '/#/types'

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '../constant'
import { PageEnum } from '/@/enums/pageEnum'
import { t } from '/@/hooks/web/useI18n'

const LOGIN_PATH = PageEnum.BASE_LOGIN
const modules = import.meta.globEager('./modules/**/*.ts')

const routeModuleList: AppRouteModule[] = []

Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    routeModuleList.push(...modList)
})

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList]

export const RootRoute: AppRouteRecordRaw = {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
        title: 'Root'
    }
}

export const LoginRoute: AppRouteRecordRaw = {
    path: LOGIN_PATH,
    name: 'Login',
    component: () => import('/@/views/system/login/login.vue'),
    meta: {
        title: t('routes.basic.login')
    }
}

// Basic routing without permission
export const basicRoutes = [LoginRoute, RootRoute, REDIRECT_ROUTE]
