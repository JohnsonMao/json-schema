import { mount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import SchemaForm, { StringField, SchemaItems } from '../../lib'
import theme from '../../lib/theme'
import string from '../../src/demos/string'

/**
 * @vitest-environment jsdom
 */

describe('SchemaForm', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
        wrapper = mount(SchemaForm, {
            props: {
                theme,
                schema: string.schema,
                uiSchema: string.uiSchema,
                modelValue: string.value
            }
        })
    })

    it('Should render correct String', async () => {
        const schemaItems = wrapper.findComponent(SchemaItems)
        const stringField = schemaItems.findComponent(StringField)
        expect(stringField.exists()).toBeTruthy()

        const input = stringField.find('input')

        await input.setValue('Hello World!')
        expect(stringField.emitted().change[0]?.[0]).toEqual('Hello World!')
        expect(input.element.value).toBe('Hello World!')

        await input.setValue('2023!')
        expect(schemaItems.emitted().change[1]?.[0]).toEqual('2023!')
    })
})
