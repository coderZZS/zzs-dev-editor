/*
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-10-24 14:26:08
 * @LastEditTime: 2022-10-24 15:23:37
 */
import { get } from '../request'

export function getCosKey() {
    return get({
        url: '/api/utils/getCosToken',
    })
}
