import { PropType, DefineComponent } from 'vue'

export enum SchemaType {
    'NUMBER' = 'number',
    'INTEGER' = 'integer',
    'STRING' = 'string',
    'OBJECT' = 'object',
    'ARRAY' = 'array',
    'BOOLEAN' = 'boolean'
}

export interface Schema {
    type: SchemaType | string
    const?: unknown
    format?: string
    label: string,
    default?: unknown

    properties?: {
        [key: string]: Schema
    }
    items?: Schema | Schema[]
    dependencies?: {
        [key: string]: string[] | Schema
    }

    oneOf?: Schema[]
    anyOf?: Schema[]
    allOf?: Schema[]
    required?: string[]

    enum?: string[]
    enumNames?: string[]
    enumKeyValue?: string[]
    additionalProperties?: unknown
    additionalItems?: Schema

    minLength?: number
    maxLength?: number
    minimun?: number
    maximum?: number
    multipleOf?: number
    exclusiveMaximum?: number
    exclusiveMinimum?: number
}

export const DefineFieldProps = {
    schema: {
        type: Object as PropType<Schema>,
        required: true
    },
    uiSchema: {
        type: Object,
        required: true
    },
    rootSchema: {
        type: Object,
        required: true
    },
    value: {
        required: true
    }
} as const

export interface ISchemaFormContext {
    readonly SchemaItems: DefineComponent<typeof DefineFieldProps>
}
