import { http } from '/@/utils/http'

import { LoginParams, LoginResultModel } from './model/userModel'
/**
 * @description: user login api
 */
export function loginApi(params: LoginParams) {
    return http.post<LoginResultModel>({
        url: '/login',
        params
    })
}
