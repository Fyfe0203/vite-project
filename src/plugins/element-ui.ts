import { Button } from 'ant-design-vue'
import SvgIcon from '/com/SvgIcon/index.vue'

const components = [Button]

// const plugins = [
//     // ElInfiniteScroll,
//     ElLoading,
//     ElMessage,
//     ElMessageBox,
//     ElNotification,
// ]

export function registerElement(app: any) {
    components.forEach((component) => {
        app.component(component.name, component)
    })

    app.component('svg-icon', SvgIcon)
    // plugins.forEach(plugin => {
    //     app.use(plugin)
    // })
}
