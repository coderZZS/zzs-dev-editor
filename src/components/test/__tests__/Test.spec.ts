/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-09-13 09:53:33
 * @LastEditTime: 2022-09-13 14:10:36
 */
import Test from '../Test.vue'

import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('Test', () => {
    it('mount test', () => {
        const wrapper = shallowMount(Test, {
            props: {
                msg: 'hello',
            },
        })
        expect(wrapper.text()).toBe('hello')
    })

    it('input change', async () => {
        const wrapper = shallowMount(Test, {
            props: {
                msg: 'hello',
            },
        })
        await wrapper.get('input').setValue('h')
        expect(wrapper.get('input').element.value).toBe('h')
    })

    it('button click change', async () => {
        const wrapper = shallowMount(Test, {
            props: {
                msg: 'hello',
            },
        })
        await wrapper.get('button').trigger('click')
        expect(wrapper.findAll('li')).toHaveLength(1)
    })
})
