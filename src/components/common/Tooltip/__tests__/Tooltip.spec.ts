/*
 * @Descripttion:
 * @Author: BZR
 * @Date: 2022-09-13 09:53:33
 * @LastEditTime: 2022-09-15 10:00:26
 */
import Tooltip from '../index'

import { mount, VueWrapper } from '@vue/test-utils'
import { beforeAll, describe, expect, it } from 'vitest'
let wrapper: VueWrapper<any>
describe('Color Picker component', () => {
    beforeAll(() => {
        wrapper = mount(Tooltip, {
            props: {
                value: true,
                text: 'B',
                activeValue: 'bold',
                tips: '加粗',
            },
        })
    })
    it('should render the correct interface', () => {
        // 测试文字是否正常显示
        const contentElement = wrapper.get('.tooltip__content')
        expect(contentElement.text()).toBe('B')
        const tipsElement = wrapper.get('.tooltip__tips')
        expect(tipsElement.text()).toBe('加粗')
    })
})
