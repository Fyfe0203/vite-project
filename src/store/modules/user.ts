import type { UserInfo } from '/#/types'

import store from '/@/store/index'
import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators'
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper'

import { PageEnum } from '/@/enums/pageEnum'
import { RoleEnum } from '/@/enums/roleEnum'
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum'

import { useMessage } from '/@/hooks/web/useMessage'
import { useI18n } from '/@/hooks/web/useI18n'

import router from '/@/router'

import { getAuthCache, setAuthCache } from '/@/utils/auth/index'

const NAME = 'app-user'
hotModuleUnregisterModule(NAME)

@Module({ namespaced: true, name: NAME, dynamic: true, store })
class User extends VuexModule {
    // user info
    private userInfoState: UserInfo | null = null

    // token
    private tokenState = ''

    // roleList
    private roleListState: RoleEnum[] = []

    get getUserInfoState(): UserInfo {
        return this.userInfoState || getAuthCache<UserInfo>(USER_INFO_KEY) || {}
    }

    get getTokenState(): string {
        return this.tokenState || getAuthCache<string>(TOKEN_KEY)
    }

    get getRoleListState(): RoleEnum[] {
        return this.roleListState.length > 0 ? this.roleListState : getAuthCache<RoleEnum[]>(ROLES_KEY)
    }

    @Mutation
    commitResetState(): void {
        this.userInfoState = null
        this.tokenState = ''
        this.roleListState = []
    }

    @Mutation
    commitUserInfoState(info: UserInfo): void {
        this.userInfoState = info
        setAuthCache(USER_INFO_KEY, info)
    }

    @Mutation
    commitRoleListState(roleList: RoleEnum[]): void {
        this.roleListState = roleList
        setAuthCache(ROLES_KEY, roleList)
    }

    @Mutation
    commitTokenState(info: string): void {
        this.tokenState = info
        setAuthCache(TOKEN_KEY, info)
    }

    /**
     * @description: login
     */
    @Action
    async login(params = {}): Promise<{} | null> {
        try {
            // save token
            this.commitTokenState('token')
            await router.replace(PageEnum.BASE_HOME)
            return params
        } catch (error) {
            return null
        }
    }

    /**
     * @description: logout
     */
    @Action
    async logout(goLogin = false) {
        goLogin && router.push(PageEnum.BASE_LOGIN)
    }

    /**
     * @description: Confirm before logging out
     */
    @Action
    async confirmLoginOut() {
        const { createConfirm } = useMessage()
        const { t } = useI18n()
        createConfirm({
            iconType: 'warning',
            title: t('sys.app.logoutTip'),
            content: t('sys.app.logoutMessage'),
            onOk: async () => {
                await this.logout(true)
            }
        })
    }
}
export const userStore = getModule<User>(User)
