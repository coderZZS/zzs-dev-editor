/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-09-14 16:51:11
 * @LastEditTime: 2022-09-16 16:08:29
 */
// import axios from '@/__mocks__/axios'
import { mount, shallowMount, VueWrapper } from '@vue/test-utils'
import { beforeAll, describe, expect, it, vi, Mocked, afterEach } from 'vitest'
import Uploader from '../index'
import flushPromises from 'flush-promises'
import axios from 'axios'
import { defineComponent } from 'vue'

vi.mock('axios')
const mockComponent = defineComponent({
    template: `<div><slot name="default"></slot></div>`,
})
const mockedAxios = axios as Mocked<typeof axios>
let wrapper: VueWrapper<any>
const testFile = new File(['xzy'], 'test.png', { type: 'image/png' })
const setInputValue = (input: HTMLInputElement) => {
    const files = [testFile]
    Object.defineProperty(input, 'files', {
        value: files,
        writable: false,
    })
}

describe('Uploader component', () => {
    beforeAll(() => {
        wrapper = shallowMount(Uploader, {
            props: {
                value: true,
                text: 'B',
                activeValue: 'bold',
                tips: '加粗',
            },
            global: {
                components: {
                    'a-button': mockComponent,
                },
                stubs: ['FolderAddTwoTone'],
            },
        })
    })
    it('basic layout before uploading', async () => {
        expect(wrapper.find('.upload-button').exists()).toBeTruthy()
        expect(wrapper.find('.file-upload__text').text()).toBe('点击上传')
    })
    it('upload process should works fine', async () => {
        mockedAxios.post.mockResolvedValueOnce({ status: 200 })
        const fileInput = wrapper.get('input').element as HTMLInputElement
        setInputValue(fileInput)
        await wrapper.get('input').trigger('change')
        expect(mockedAxios.post).toHaveBeenCalledTimes(1)
        expect(wrapper.get('.file-upload__text').text()).toBe('正在上传')

        // button 为disabled
        expect(wrapper.get('.upload-button').attributes()).toHaveProperty('disabled')
        // 列表长度修改，并且有正确的class
        expect(wrapper.findAll('li').length).toBe(1)
        const firstItem = wrapper.get('li:first-child')
        expect(firstItem.classes()).toContain('upload-loading')
        await flushPromises()
        expect(wrapper.get('.file-upload__text').text()).toBe('点击上传')
        // 有正确的class, 并且文件名称相对应
        expect(firstItem.classes()).toContain('upload-success')
        expect(firstItem.get('.filename').text()).toBe(testFile.name)
    })
    it('should return error text when post is rejected', async () => {
        mockedAxios.post.mockRejectedValueOnce({ error: 'error' })
        await wrapper.get('input').trigger('change')
        expect(mockedAxios.post).toHaveBeenCalledTimes(1)
        expect(wrapper.get('.file-upload__text').text()).toBe('正在上传')
        await flushPromises()
        expect(wrapper.get('.file-upload__text').text()).toBe('点击上传')
        // 列表长度增加，并且列表的最后一项有正确的class名
        expect(wrapper.findAll('li').length).toBe(2)
        // 点击删除按钮，删除上传失败的列表
        const lastItem = wrapper.get('li:last-child')
        expect(lastItem.classes()).toContain('upload-error')
        await lastItem.get('.delete-icon').trigger('click')
        expect(wrapper.findAll('li').length).toBe(1)
    })
    it('should show the correct interface when using custom slot', async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: { url: 'testimg.url' } })
        const wrapper = mount(Uploader, {
            props: {
                action: 'text.url',
            },
            slots: {
                default: '<button>custom button</button>',
                loading: '<div class="loading">custom loading</div>',
                uploaded: `<template #uploaded="{uploadedData}">
                    <div class="custom-loaded">{{ uploadedData.url }}</div>
                </template>`,
            },
        })
        expect(wrapper.get('button').text()).toBe('custom button')
        const fileInput = wrapper.get('input').element as HTMLInputElement
        setInputValue(fileInput)
        await wrapper.get('input').trigger('change')
        expect(wrapper.get('.loading').text()).toBe('custom loading')
        await flushPromises()
        expect(wrapper.get('.custom-loaded').text()).toBe('testimg.url')
    })

    it('before upload check', async () => {
        const callback = vi.fn()
        mockedAxios.post.mockResolvedValueOnce({ data: { url: 'testimg.url' } })
        const checkFileSize = (file: File) => {
            if (file.size > 2) {
                callback()
                return false
            }
            return true
        }
        const wrapper = shallowMount(Uploader, {
            props: {
                action: 'test.url',
                beforeUpload: checkFileSize,
            },
        })
        const fileInput = wrapper.get('input').element as HTMLInputElement
        setInputValue(fileInput)
        expect(mockedAxios.post).not.toHaveBeenCalled()
        expect(wrapper.findAll('li').length).toBe(0)
        expect(callback).not.toHaveBeenCalled()
    })

    it('before upload check using Promise', async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: { url: 'testimg.url' } })
        const failedPromise = (file: File) => {
            return Promise.reject('wrong type')
        }
        const successPromise = (file: File) => {
            const newFile = new File([file], 'new_name.docx', { type: file.type })
            return Promise.resolve(newFile)
        }
        const wrapper = shallowMount(Uploader, {
            props: {
                action: 'test.url',
                beforeUpload: failedPromise,
            },
        })
        const fileInput = wrapper.get('input').element as HTMLInputElement
        setInputValue(fileInput)
        await wrapper.get('input').trigger('change')
        await flushPromises()
        expect(mockedAxios.post).not.toHaveBeenCalled()
        expect(wrapper.findAll('li').length).toBe(0)
        await wrapper.setProps({ beforeUpload: successPromise })
        await wrapper.get('input').trigger('change')
        await flushPromises()
        expect(mockedAxios.post).toHaveBeenCalled()

        const firstItem = wrapper.get('li:first-child')
        expect(firstItem.classes()).toContain('upload-success')
        expect(firstItem.get('.filename').text()).toBe('new_name.docx')
    })

    afterEach(() => {
        mockedAxios.post.mockReset()
    })
})
