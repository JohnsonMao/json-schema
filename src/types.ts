import { Schema } from '../lib'

export interface IDemo {
    name: string
    schema: Schema
    uiSchema: Record<string, unknown>
    value: unknown
}
