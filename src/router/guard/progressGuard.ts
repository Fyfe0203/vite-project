import type { Router } from 'vue-router'
import nProgress from 'nprogress'

import { appStore } from '/@/store/modules/app'
import { unref } from 'vue'

const { openNProgress = true } = appStore.getProjectConfig.transitionSetting || {}

export function createProgressGuard(router: Router) {
    router.beforeEach(async (to) => {
        if (to.meta.loaded) return true
        unref(openNProgress) && nProgress.start()
        return true
    })

    router.afterEach(async (to) => {
        if (to.meta.loaded) return true
        unref(openNProgress) && nProgress.done()
        return true
    })
}
