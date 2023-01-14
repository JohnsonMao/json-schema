import { CustomValidate, ErrorData } from '../../lib/types'
import { IDemo } from '../types'

interface IData {
    password: string
    retryPassword: string
}

type IErrors = {
    [key in keyof IData]?: ErrorData
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
    customValidate: async (data: IData, errors) => {
        return new Promise(resolve => {
            setTimeout(() => {
                if (data.password !== data.retryPassword) {
                    errors.retryPassword?.addError?.('密碼必須相同')
                }
                resolve()
            }, 2000)
        })
    },
    uiSchema: {},
    value: {}
} as IDemo & { customValidate: CustomValidate<IErrors> }
