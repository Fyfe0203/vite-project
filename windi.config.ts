import { defineConfig } from 'vite-plugin-windicss'
import colors from 'windicss/colors'

import { primaryColor } from './build/config/themeConfig'

export default defineConfig({
    darkMode: 'class',
    // 缩写，将多个class合并成一个class
    shortcuts: {
        btn: 'rounded border border-gray-300 text-gray-600 px-4 py-2 m-2 inline-block hover:shadow'
    },
    theme: {
        extend: {
            colors: {
                ...colors,
                primary: primaryColor
            },
            screens: {
                sm: '576px',
                md: '768px',
                lg: '992px',
                xl: '1200px',
                '2xl': '1600px'
            }
        }
    }
})
