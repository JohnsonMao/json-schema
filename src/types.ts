import { CustomValidate, Schema, UISchema } from '../lib'

export interface IDemo {
    name: string
    schema: Schema
    uiSchema?: UISchema
    value: unknown
    customValidate?: CustomValidate
}
