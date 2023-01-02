import { mount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import SchemaForm, { ObjectField } from '../../lib'
import object from '../../src/demos/object'

/**
 * @vitest-environment jsdom
 */

describe('SchemaForm', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
        wrapper = mount(SchemaForm, {
            props: {
                schema: object.schema,
                uiSchema: object.uiSchema
            }
        })
    })

    it('Should render correct Object', async () => {
        const objectField = wrapper.findComponent(ObjectField)
        expect(objectField.exists()).toBeTruthy()

        const input = objectField.find('input')

        await input.setValue('Test')
        expect(objectField.emitted().change[0]?.[0]).toEqual({ name: 'Test' })

        await input.setValue('')
        expect(objectField.emitted().change[1]?.[0]).toEqual({})
    })

    it('Should render correct Error message', async () => {
        expect(() => mount(ObjectField)).toThrowError('Could not resolve schemaFormContextKey')
    })
})
