import { IDemo } from '../types'

export default {
    name: 'Object',
    schema: {
        type: 'object',
        properties: {
            password: {
                title: 'Password',
                type: 'string'
            },
            retryPassword: {
                title: 'Retry Password',
                type: 'string'
            }
        }
    },
    customValidate: (data, errors) => {
        if (data.password !== data.retryPassword) {
            errors.retryPassword.addError('密碼必須相同')
        }
    },
    uiSchema: {},
    value: {}
} as IDemo
