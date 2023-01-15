import { CustomValidate, ErrorData } from '../../lib'
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
                type: 'string'
            },
            retryPassword: {
                type: 'string'
            },
            color: {
                type: 'string',
                format: 'color'
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
    uiSchema: {
        properties: {
            password: {
                label: 'Password',
                widget: 'PasswordWidget'
            },
            retryPassword: {
                label: 'Retry Password',
                widget: 'PasswordWidget'
            },
            color: {
                label: 'color'
            }
        }
    },
    value: {}
} as IDemo & { customValidate: CustomValidate<IErrors> }
