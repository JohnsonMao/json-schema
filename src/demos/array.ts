import { IDemo } from '../types'

export default {
    name: 'Array',
    schema: {
        type: 'object',
        properties: {
            lover: {
                type: 'array',
                items: [
                    {
                        type: 'string',
                        minLength: 10,
                        title: 'Lover'
                    },
                    {
                        type: 'number'
                    }
                ]
            },
            hobby: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            language: {
                type: 'array',
                items: {
                    type: 'string',
                    enum: ['English', 'Chinese', 'Japanese']
                }
            }
        }
    },
    uiSchema: {},
    value: {
        hobby: ['Coding']
    }
} as IDemo
