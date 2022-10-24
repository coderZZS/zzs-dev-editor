/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-10-24 14:31:44
 * @LastEditTime: 2022-10-24 16:22:26
 */
import { getCosKey } from '@/api'
import COS from 'cos-js-sdk-v5'

export const getCos = () => {
    return new COS({
        getAuthorization: async (options, callback) => {
            try {
                const data = await getCosKey()
                if (!data || !data.data.Credentials) return console.error('credentials invalid')
                const { Credentials } = data.data
                callback({
                    TmpSecretId: Credentials.TmpSecretId,
                    TmpSecretKey: Credentials.TmpSecretKey,
                    SecurityToken: Credentials.Token,
                    ExpiredTime: data.data.ExpiredTime,
                    StartTime: data.data.ExpiredTime - 60000,
                })
            } catch (error) {
                console.error(error)
            }
        },
    })
}
