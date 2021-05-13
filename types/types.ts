import { defineComponent } from 'vue'
import { RoleEnum } from '/@/enums/roleEnum'

export type Component<T extends any = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>)

export interface DropMenu {
    onClick?: Fn
    to?: string
    icon?: string
    event: string | number
    text: string
    disabled?: boolean
    divider?: boolean
}

export interface RouteMeta {
    // title
    title: string
    // Whether to ignore permissions
    ignoreAuth?: boolean
    // role info
    roles?: RoleEnum[]
    // Whether not to cache
    ignoreKeepAlive?: boolean
    // Is it fixed on tab
    affix?: boolean
    // icon on tab
    icon?: string

    frameSrc?: string

    // current page transition
    transitionName?: string

    // Whether the route has been dynamically added
    hideBreadcrumb?: boolean

    // Carrying parameters
    carryParam?: boolean

    // Used internally to mark single-level menus
    single?: boolean

    // Currently active menu
    currentActiveMenu?: string

    // Never show in tab
    hideTab?: boolean

    // Never show in menu
    hideMenu?: boolean
}

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string
    meta: RouteMeta
    component?: Component | string
    components?: Component
    children?: AppRouteRecordRaw[]
    props?: Recordable
    fullPath?: string
}

export interface MenuTag {
    type?: 'primary' | 'error' | 'warn' | 'success'
    content?: string
    dot?: boolean
}

export interface Menu {
    name: string

    icon?: string

    path: string

    disabled?: boolean

    children?: Menu[]

    orderNo?: number

    roles?: RoleEnum[]

    meta?: Partial<RouteMeta>

    tag?: MenuTag

    hideMenu?: boolean
}

export interface MenuModule {
    orderNo?: number
    menu: Menu
}

// export type AppRouteModule = RouteModule | AppRouteRecordRaw;
export type AppRouteModule = AppRouteRecordRaw

export interface LockInfo {
    pwd: string | undefined
    isLock: boolean
}

export interface UserInfo {
    // 用户id
    userId: string | number
    // 用户名
    username: string
    // 真实名字
    realName: string
    // 介绍
    desc?: string
}
