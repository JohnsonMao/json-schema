import { mount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SchemaForm, { ArrayField, MultiSelection } from '../../lib'
import theme from '../../lib/theme'
import array from '../../src/demos/array'

/**
 * @vitest-environment jsdom
 */

describe('SchemaForm', () => {
    let wrapper: VueWrapper

    it('Should render correct Tuple Array', async () => {
        wrapper = mount(SchemaForm, {
            props: {
                theme,
                schema: {
                    type: 'array',
                    items: [
                        {
                            type: 'string'
                        },
                        {
                            type: 'number'
                        }
                    ]
                },
                uiSchema: array.uiSchema,
                modelValue: []
            }
        })

        const arrayField = wrapper.findComponent(ArrayField)
        expect(arrayField.exists()).toBeTruthy()

        const inputs = arrayField.findAll('input')
        expect(inputs.length).toBe(2)
        await inputs[0].setValue('Hello World!')
        await inputs[1].setValue(2023)
        expect(arrayField.emitted().change[0]?.[0]).toEqual([
            'Hello World!',
            2023
        ])
    })

    it('Should render correct multiple selection Array', async () => {
        wrapper = mount(SchemaForm, {
            props: {
                theme,
                schema: {
                    type: 'array',
                    items: {
                        type: 'string',
                        enum: ['English', 'Chinese', 'Japanese']
                    }
                },
                uiSchema: array.uiSchema,
                modelValue: []
            }
        })

        const arrayField = wrapper.findComponent(ArrayField)
        const multiSelection = arrayField.findComponent(MultiSelection)
        expect(multiSelection.exists()).toBeTruthy()

        const select = multiSelection.find('select')
        await select.setValue(['English', 'Chinese'])
        expect(arrayField.emitted().change[0]?.[0]).toEqual([
            'English',
            'Chinese'
        ])

        await wrapper.setProps({ value: ['Japanese'] })
        expect(arrayField.props().value).toEqual(['Japanese'])
    })

    it('Should render correct CRUD Array', async () => {
        wrapper = mount(SchemaForm, {
            props: {
                theme,
                schema: {
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                },
                uiSchema: array.uiSchema,
                modelValue: ['Apple']
            }
        })

        const arrayField = wrapper.findComponent(ArrayField)
        expect(arrayField.exists()).toBeTruthy()

        let buttons = arrayField.findAll('button')
        await buttons[0].trigger('click')
        await buttons[3].trigger('click')
        expect(arrayField.emitted().change[0]?.[0]).toEqual([null, 'Apple'])

        buttons = arrayField.findAll('button')
        await buttons[7].trigger('click')
        expect(arrayField.emitted().change[0]?.[0]).toEqual([null, 'Apple'])

        const inputs = arrayField.findAll('input')
        await inputs[0].setValue('Banana')
        expect(arrayField.emitted().change[0]?.[0]).toEqual(['Banana', 'Apple'])

        await buttons[6].trigger('click')
        expect(arrayField.emitted().change[0]?.[0]).toEqual(['Apple', 'Banana'])

        await buttons[5].trigger('click')
        expect(arrayField.emitted().change[0]?.[0]).toEqual(['Apple'])

        await buttons[2].trigger('click')
        expect(arrayField.emitted().change[0]?.[0]).toEqual(['Apple'])
    })
})
