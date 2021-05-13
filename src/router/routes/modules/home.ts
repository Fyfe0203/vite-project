import type { AppRouteModule } from '/#/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const dashboard: AppRouteModule = {
    path: '/home',
    name: 'Home',
    component: LAYOUT,
    redirect: '/home/welcome',
    meta: {
        icon: 'ion:home-outline',
        title: t('routes.dashboard.welcome')
    },
    children: [
        {
            path: 'welcome',
            name: 'Welcome',
            component: () => import('/@/views/dashboard/index.vue'),
            meta: {
                title: t('routes.dashboard.welcome'),
                affix: true,
                icon: 'bx:bx-home'
            }
        }
    ]
}

export default dashboard
