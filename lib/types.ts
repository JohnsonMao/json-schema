import {
    PropType,
    DefineComponent,
    CSSProperties,
    ComputedRef,
    ExtractPropTypes
} from 'vue'
import Ajv, { ErrorObject, FormatDefinition } from 'ajv'
import i18n from 'ajv-i18n'
import { validateData } from './validator'

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

type WidgetConfig = {
    style?: string | CSSProperties
    class?: unknown
    label?: string
    [key: string]: unknown
}

export type Errors = (Partial<ErrorObject> & {
    name?: string
    property?: string
})[]

export type AddError = (msg: string) => void

export type ErrorFields = {
    __errors?: string[]
}

export type ErrorData<T = { addError?: AddError }> = {
    [key: string]: ErrorData
} & T

export type ErrorSchema = ErrorData & ErrorFields

export const DefineWidgetProps = {
    value: {},
    errors: {
        type: Array as PropType<string[]>
    },
    schema: {
        type: Object as PropType<Schema>
    },
    config: {
        type: Object as PropType<WidgetConfig>
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

export type DefineWidget = DefineComponent<
    ExtractPropTypes<typeof DefineWidgetProps>
>
export type DefineOptionsWidget = DefineComponent<
    ExtractPropTypes<typeof DefineOptionsWidgetProps>
>
export interface IWidgets {
    [widgetsName.MultiSelectWidget]: DefineOptionsWidget
    [widgetsName.TextWidget]: DefineWidget
    [widgetsName.NumberWidget]: DefineWidget
}

export type Widget = DefineWidget | DefineOptionsWidget | DefineComponent

export type UISchema = {
    widget?: string | Widget
    properties?: {
        [key: string]: UISchema
    }
    items?: UISchema | UISchema[]
} & WidgetConfig

export const DefineFieldProps = {
    schema: {
        type: Object as PropType<Schema>,
        required: true
    },
    uiSchema: {
        type: Object as PropType<UISchema>
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

export interface ITheme {
    widgets: IWidgets
    components?: Record<string, DefineComponent>
}

export interface ISchemaFormContext {
    readonly theme: ITheme
    readonly formatMapRef: ComputedRef<Record<string, DefineWidget>>
    readonly SchemaItems: DefineComponent<
        ExtractPropTypes<typeof DefineFieldProps>
    >
}

export type CustomValidate<E extends ErrorData = ErrorData> = {
    (data: unknown, errors: E): void
}

export interface IValidateParam {
    validator: Ajv
    data: unknown
    schema: Schema
    locale: keyof typeof i18n
    customValidate?: CustomValidate
}

export type AwaitPromise<T> = T extends Promise<infer R> ? R : T

export type AwaitValidateData = AwaitPromise<ReturnType<typeof validateData>>

export interface CustomFormat {
    name: string
    definition: FormatDefinition<string | number>
    component: DefineWidget
}
