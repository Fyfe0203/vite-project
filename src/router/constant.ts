import type { AppRouteRecordRaw } from '/#/types'

export const REDIRECT_NAME = 'Redirect'

export const EXCEPTION_COMPONENT = () => import('/views/system/exception/index.vue')

/**
 * @description: default layout
 */
export const LAYOUT = () => import('/@/layouts/default/index.vue')

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
    path: '/:path(.*)*',
    name: 'ErrorPage',
    component: LAYOUT,
    meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true
    },
    children: [
        {
            path: '/:path(.*)*',
            name: 'ErrorPage',
            component: EXCEPTION_COMPONENT,
            meta: {
                title: 'ErrorPage',
                hideBreadcrumb: true
            }
        }
    ]
}

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
    path: '/redirect',
    name: REDIRECT_NAME,
    component: LAYOUT,
    meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true
    },
    children: [
        {
            path: '/redirect/:path(.*)',
            name: REDIRECT_NAME,
            component: () => import('/@/views/system/redirect.vue'),
            meta: {
                title: REDIRECT_NAME,
                hideBreadcrumb: true
            }
        }
    ]
}
