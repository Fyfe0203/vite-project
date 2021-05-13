import 'virtual:windi.css'
// import 'virtual:windi-devtools'
import '/assets/css/index.less'

import { createApp } from 'vue'
import App from './App.vue'

import router, { setupRouter } from './router'
import { setupStore } from './store'
import { setupI18n } from '/@/locales/setupI18n'
import { registerElement } from '/plugins/element-ui'

// router-guard
import '/@/router/guard'
;(async () => {
    const app = createApp(App)

    // 注册组件库(包括svg图标)
    registerElement(app)

    // 多语言配置
    await setupI18n(app)

    setupStore(app)

    setupRouter(app)

    // 当路由准备好时就挂载
    await router.isReady()

    app.mount('#app', true)
})()
