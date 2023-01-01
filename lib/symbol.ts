import { InjectionKey } from 'vue'
import { ISchemaFormContext } from './types'

export const schemaFormContextKey: InjectionKey<ISchemaFormContext> = Symbol(
    'schemaFormContextKey'
)
