import { PropType, DefineComponent } from 'vue'
import Ajv, { ErrorObject } from 'ajv'
import i18n from 'Ajv-i18n'
import { withFormItemWidget } from './theme'

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
    label?: string
    default?: unknown
    title?: string

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

export type Errors = (Partial<ErrorObject> & {
    name?: string
    property?: string
})[]

export type Data<T extends Schema> = T['type'] extends
    | SchemaType.OBJECT
    | SchemaType.ARRAY
    ? { [key in keyof T['properties']]: T['properties'][key] }
    : unknown

export type AddError = (msg: string) => void

export type ErrorSchema = {
    [key: string]: ErrorSchema
} & {
    __errors?: string[]
    addError?: AddError
}

export const DefineFieldProps = {
    schema: {
        type: Object as PropType<Schema>,
        required: true
    },
    uiSchema: {
        type: Object as PropType<Record<string, unknown>>
    },
    errorSchema: {
        type: Object as PropType<ErrorSchema>,
        default: () => ({})
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
    value: {},
    errors: {
        type: Array as PropType<string[]>
    },
    schema: {
        type: Object as PropType<Schema>
    }
} as const

export const DefineOptionsWidgetProps = {
    ...DefineWidgetProps,
    options: {
        type: Array as PropType<{ label: string; value: unknown }[]>,
        default: () => []
    }
} as const

export enum widgetsName {
    MultiSelectWidget = 'MultiSelectWidget',
    TextWidget = 'TextWidget',
    NumberWidget = 'NumberWidget'
}

export interface IWidgets {
    [widgetsName.MultiSelectWidget]: withFormItemWidget
    [widgetsName.TextWidget]: withFormItemWidget
    [widgetsName.NumberWidget]: withFormItemWidget
}

export interface ITheme {
    widgets: IWidgets
}

export interface ISchemaFormContext {
    readonly SchemaItems: DefineComponent<typeof DefineFieldProps>
    readonly theme: ITheme
}

export type CustomValidate<E extends ErrorSchema = ErrorSchema> = {
    (data: unknown, errors: E): void
}

export interface IValidateParam {
    validator: Ajv
    formData: unknown
    schema: Schema
    locale: keyof typeof i18n
    customValidate?: CustomValidate
}
