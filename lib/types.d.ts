import { PropType } from 'vue'

export enum SchemaType {
    'NUMBER' = 'number',
    'INTEGER' = 'integer',
    'STRING' = 'string',
    'OBJECT' = 'object',
    'ARRAY' = 'array',
    'BOOLEAN' = 'boolean'
}

type SchemaRef = { $ref: string }

export interface Schema {
    type: SchemaType | string
    const?: unknown
    format?: string
    default?: unknown
    properties?: {
        [key: string]: Schema | SchemaRef
    }
    items?: Schema | Schema[] | SchemaRef
    dependencies?: {
        [key: string]: string[] | Schema | SchemaRef
    }
    required?: string[]
    enum?: unknown[]
    enumKeyValue?: unknown[]
    additionalProperties?: unknown
    additionalItems?: Schema
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
    value: {
        required: true
    }
} as const
