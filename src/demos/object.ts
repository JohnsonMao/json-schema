import { IDemo } from '../types'

export default {
    name: 'Object',
    schema: {
        type: 'object',
        properties: {
            name: {
                type: 'string'
            },
            age: {
                type: 'number'
            }
        }
    },
    uiSchema: {},
    value: {}
} as IDemo
