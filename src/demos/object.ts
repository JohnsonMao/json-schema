import { ErrorSchema, CustomValidate } from '../../lib/types'
import { IDemo } from '../types'

interface IData {
    password: string,
    retryPassword: string
}

type IErrors = {
    [key in keyof IData]?: ErrorSchema
}

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
    customValidate: (data: IData, errors) => {
        if (data.password !== data.retryPassword) {
            errors.retryPassword?.addError?.('密碼必須相同')
        }
    },
    uiSchema: {},
    value: {}
} as IDemo & { customValidate: CustomValidate<IErrors> }
