/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-09-14 17:33:09
 * @LastEditTime: 2022-09-15 10:19:12
 */
import { vi } from 'vitest'

type Datakeys = 'upload'
type Success = {
    status: number
    data: any
}
const datas: { [key in Datakeys]: Success } = {
    upload: { status: 200, data: [123, 321] },
}

export default {
    // get: vi.fn((url: Datakeys = 'upload') => Promise.resolve(datas[url])),
    get: vi.fn(),
    post: vi.fn(),
}
