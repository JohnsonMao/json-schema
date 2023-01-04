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
        type: Object as PropType<Record<string, unknown>>
    },
    value: {}
} as const

export const DefineObjectProps = {
    ...DefineFieldProps,
    value: {
        type: Object as PropType<Record<string | number, unknown>>,
        default: () => ({})
    }
} as const

export const DefineArrayProps = {
    ...DefineFieldProps,
    value: {
        type: Array as PropType<unknown[]>,
        default: () => []
    }
} as const

export const DefineWidgetProps = {
    value: {}
} as const

export const DefineOptionsWidgetProps = {
    ...DefineWidgetProps,
    options: {
        type: Array as PropType<{ label: string; value: unknown }[]>,
        required: true
    }
} as const

type DefineWidget = DefineComponent<typeof DefineWidgetProps>
type DefineOptionsWidget = DefineComponent<typeof DefineOptionsWidgetProps>

export enum widgetsName {
    MultiSelectWidget = 'MultiSelectWidget',
    TextWidget = 'TextWidget',
    NumberWidget = 'NumberWidget'
}

export interface ITheme {
    widgets: {
        [widgetsName.MultiSelectWidget]: DefineOptionsWidget
        [widgetsName.TextWidget]: DefineWidget
        [widgetsName.NumberWidget]: DefineWidget
    }
}

export interface ISchemaFormContext {
    readonly SchemaItems: DefineComponent<typeof DefineFieldProps>
    readonly theme: ITheme
}
