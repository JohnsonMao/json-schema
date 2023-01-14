import { DefineComponent } from 'vue'
import { CustomValidate, ErrorData } from '../../lib'
import PasswordWidget from '../components/PasswordWidget.vue'
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
            },
            color: {
                title: 'Color',
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
                widget: PasswordWidget as DefineComponent
            },
            retryPassword: {
                widget: PasswordWidget as DefineComponent
            }
        }
    },
    value: {}
} as IDemo & { customValidate: CustomValidate<IErrors> }
