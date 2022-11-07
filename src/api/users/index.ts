/*
 * @Descripttion: 
 * @Author: BZR
 * @Date: 2022-11-07 16:14:20
 * @LastEditTime: 2022-11-07 17:55:58
 */
import { post } from '../request'

export function getVerifyCode (data = {}) {
    return post({
        // url: '/api/db-check'
        url: '/api/users/genVeriCode',
        data
    })
} 

export function loginByPhoneNumber (data = {}) {
    return post({
        // url: '/api/db-check'
        url: '/api/users/loginByPhoneNumber',
        data
    })
} 