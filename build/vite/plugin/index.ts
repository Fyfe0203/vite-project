import type { Plugin } from 'vite'
import type { ViteEnv } from '../../utils'

import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { configHtmlPlugin } from './html'
import { configStyleImportPlugin } from './styleImport'
import { configSvgIconsPlugin } from './svgSprite'
import { configWindiCssPlugin } from './windicss'

export const pathResolve = (dir: string) => {
    return path.join(__dirname, dir)
}

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
    const vitePlugins: (Plugin | Plugin[])[] = [
        // have to
        vue(),
        // have to
        vueJsx()
    ]

    // vite-plugin-html
    vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

    // vite-plugin-svg-icons
    vitePlugins.push(configSvgIconsPlugin(pathResolve('src/assets/svg/')))

    // vite-plugin-style-import
    vitePlugins.push(configStyleImportPlugin(isBuild))

    // vite-plugin-windicss
    vitePlugins.push(configWindiCssPlugin())

    return vitePlugins
}
