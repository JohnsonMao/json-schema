import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SchemaForm, { NumberField } from '../../lib'
import demo from '../../src/demos/demo'

/**
 * @vitest-environment jsdom
 */

describe('SchemaForm', () => {
    it('should render correct Demo', async () => {
        const wrapper = mount(SchemaForm, {
            props: {
                // schema: demo.schema,
                // uiSchema: demo.uiSchema,
                // value: demo.value
                schema: { type: 'number' },
                uiSchema: demo.uiSchema,
                value: 18
            }
        })

        const numberField = wrapper.findComponent(NumberField)
        expect(numberField.exists()).toBeTruthy()

        const input = numberField.find('input')

        await input.setValue(19)
        await input.trigger('input')
        expect(input.element.value).toBe('19')
        await input.setValue('19e')
        expect(input.element.value).toBe('')
        await input.setValue('-19')
        expect(input.element.value).toBe('-19')
    })
})
