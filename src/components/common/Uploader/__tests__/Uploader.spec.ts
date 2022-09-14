/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-09-14 16:51:11
 * @LastEditTime: 2022-09-14 18:12:08
 */
import axios from '@/__mocks__/axios'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import Uploader from '../index'

vi.mock('axios')
let wrapper: VueWrapper<any>
describe('Uploader component', () => {
    beforeAll(() => {
        wrapper = shallowMount(Uploader, {
            props: {
                value: true,
                text: 'B',
                activeValue: 'bold',
                tips: '加粗',
            },
        })
    })
    it('basic layout before uploading', async () => {
        expect(wrapper.find('button').exists()).toBeTruthy()
        expect(wrapper.find('.file-upload__text').text()).toBe('点击上传')
    })
    it('upload process should works fine', async () => {
        const fileInput = wrapper.get('input').element as HTMLInputElement
        const files = [new File(['xzy'], 'test.png', { type: 'image/png' })]
        Object.defineProperty(fileInput, 'files', {
            value: files,
            writable: false,
        })

        await wrapper.get('input').trigger('change')
        await axios.get('upload')
        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(wrapper.get('.file-upload__text').text()).toBe('正在上传')
    })
})
