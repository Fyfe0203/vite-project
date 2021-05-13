import { Plugin } from 'vite'
import { readFileSync, readdirSync } from 'fs'

const regSvgTitle = /<svg([^>+].*?)>/
const regHeightWidth = /(width|height)="([^>+].*?)"/g
const regViewBox = /(viewBox="[^>+].*?")/g
const regReturn = /(\r)|(\n)/g

function findSvgFile(dir: string, perfix: string = 'icon'): string[] {
    const svgRes = []
    const dirents = readdirSync(dir, {
        withFileTypes: true
    })

    for (const dirent of dirents) {
        if (dirent.isDirectory()) {
            svgRes.push(...findSvgFile(dir + dirent.name + '/', perfix))
        } else {
            const svg = readFileSync(dir + dirent.name)
                .toString()
                .replace(regReturn, '')
                .replace(regSvgTitle, ($1, $2) => {
                    let width = 0
                    let height = 0
                    let content = $2.replace(regHeightWidth, (s1: string, s2: string, s3: number) => {
                        if (s2 === 'width') {
                            width = s3
                        } else if (s2 === 'height') {
                            height = s3
                        }
                        return ''
                    })
                    if (!regViewBox.test($2)) {
                        content += `viewBox="0 0 ${width} ${height}"`
                    }
                    return `<symbol id="${perfix}-${dirent.name.replace('.svg', '')}" ${content}>`
                })
                .replace('</svg>', '</symbol>')
            svgRes.push(svg)
        }
    }
    return svgRes
}

export const configSvgIconsPlugin = (path: string, perfix = 'icon'): Plugin => {
    let def = {} as Plugin
    if (path === '') return def

    const res = findSvgFile(path, perfix)
    if (!res.length) return def
    return {
        name: 'svg-transform',
        transformIndexHtml(html): string {
            return html.replace(
                '<body>',
                `
                <body>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">${res.join(
                        ''
                    )}</svg>
                `
            )
        }
    }
}
