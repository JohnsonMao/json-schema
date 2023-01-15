import { mount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import SchemaForm, { NumberField } from '../../lib'
import theme from '../../lib/theme'
import number from '../../src/demos/number'

/**
 * @vitest-environment jsdom
 */

describe('SchemaForm', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
        wrapper = mount(SchemaForm, {
            props: {
                theme,
                schema: number.schema,
                uiSchema: number.uiSchema,
                modelValue: number.value
            }
        })
    })

    it('Should render correct Number', async () => {
        const numberField = wrapper.findComponent(NumberField)
        expect(numberField.exists()).toBeTruthy()

        const input = numberField.find('input')

        await input.setValue(19)
        expect(numberField.emitted().change[0]?.[0]).toEqual(19)
        expect(input.element.value).toBe('19')

        await input.setValue('19-')
        expect(input.element.value).toBe('')
        expect(numberField.emitted().change[1]?.[0]).toBeNull()

        await input.setValue('-19')
        expect(input.element.value).toBe('-19')
        expect(numberField.emitted().change[2]?.[0]).toEqual(-19)
    })
})
