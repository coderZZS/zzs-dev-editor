/*
 * @Descripttion: 配置持久化信息
 * @Author: BZR
 * @Date: 2022-06-21 17:50:37
 * @LastEditTime: 2022-06-21 17:53:59
 */
import { PersistedStateOptions } from 'pinia-plugin-persistedstate'
/**
 * key 存储的key
 */
const piniaPersistConfig = (key: string): PersistedStateOptions => {
    const target: PersistedStateOptions = {
        key,
        storage: window.localStorage
    }
    return target
}

export default piniaPersistConfig