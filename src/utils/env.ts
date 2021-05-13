import type { GlobEnvConfig } from '/#/config'

import { warn } from '/@/utils/log'
import pkg from '../../package.json'

export function getCommonStoragePrefix() {
    const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig()
    return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}`.toUpperCase()
}

// Generate cache key according to version
export function getStorageShortName() {
    return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase()
}

export function getAppEnvConfig() {
    const ENV = (import.meta.env as unknown) as GlobEnvConfig

    const { VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL, VITE_GLOB_APP_SHORT_NAME } = ENV

    if (!/[a-zA-Z\_]*/.test(VITE_GLOB_APP_SHORT_NAME)) {
        warn(
            `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`
        )
    }
    return {
        VITE_GLOB_APP_TITLE,
        VITE_GLOB_API_URL,
        VITE_GLOB_APP_SHORT_NAME
    }
}

/**
 * @description: Development model
 */
export const devMode = 'development'

/**
 * @description: Production mode
 */
export const prodMode = 'production'

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv(): string {
    return import.meta.env.MODE
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
    return import.meta.env.DEV
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
    return import.meta.env.PROD
}

/**
 * @description: Whether to open mock
 * @returns:
 * @example:
 */
export function isUseMock(): boolean {
    return import.meta.env.VITE_USE_MOCK === 'true'
}
