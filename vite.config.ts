import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'

import modifyVar from './build/config/themeConfig'

import { createVitePlugins, pathResolve } from './build/vite/plugin'
import { wrapperEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'

// api: https://vitejs.dev/config/
export default function defineConfig({ command, mode }: ConfigEnv): UserConfig {
    const root = process.cwd()
    const env = loadEnv(mode, root)

    // The boolean type read by loadEnv is a string. This function can be converted to boolean type
    const viteEnv = wrapperEnv(env)

    const { VITE_PORT, VITE_PROXY, VITE_BASE_URL } = viteEnv

    const isBuild = command === 'build'
    return {
        base: VITE_BASE_URL,
        build: {
            outDir: 'dist'
        },
        resolve: {
            // https://decembersoft.com/posts/say-goodbye-to-relative-paths-in-typescript-imports/
            alias: {
                '/@': pathResolve('src'),
                '/#': pathResolve('types'),
                '/com': pathResolve('src/components'),
                '/assets': pathResolve('src/assets'),
                '/plugins': pathResolve('src/plugins'),
                '/utils': pathResolve('src/utils'),
                '/views': pathResolve('src/views')
            }
        },
        server: {
            port: VITE_PORT,
            open: false,
            base: '/',
            proxy: createProxy(VITE_PROXY),
            hmr: {
                overlay: true
            }
        },
        plugins: createVitePlugins(viteEnv, isBuild),
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        // 用于全局导入，以避免每个样式文件单独导入
                        // 参考:避免重复的参考
                        hack: `true; @import (reference) "${pathResolve('src/assets/css/config.less')}";`,
                        ...modifyVar
                    },
                    javascriptEnabled: true
                }
            }
        }
    }
}
