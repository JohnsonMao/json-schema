import Ajv from 'ajv'
import i18n from 'ajv-i18n'
import { mergeObject } from './utils'
import {
    AddError,
    Errors,
    ErrorData,
    ErrorSchema,
    IValidateParam
} from './types'

function transformErrors(errors: Ajv['errors']): Errors {
    if (errors == null) return []

    return errors.map(
        ({ message, instancePath, keyword, params, schemaPath }) => ({
            name: keyword,
            property: instancePath,
            message,
            params,
            schemaPath
        })
    )
}

function toErrorSchema(errors: Errors) {
    if (errors.length < 1) return {}

    return errors.reduce((errorSchema, error) => {
        const { property, message } = error
        const path = property?.split('/') || []
        let parent = errorSchema

        if (path.length > 0 && path[0] === '') {
            path.splice(0, 1)
        }

        path.forEach((key) => {
            if (!Object.hasOwn(parent, key)) parent[key] = {}
            parent = parent[key]
        })

        if (Array.isArray(parent.__errors)) {
            parent.__errors = parent.__errors.concat(message || '')
        } else if (message) {
            parent.__errors = [message]
        }

        return errorSchema
    }, {} as ErrorSchema)
}

function createErrorProxy(): ErrorData {
    const raw: ErrorData = {}

    return new Proxy(raw, {
        get(target, key: string, receiver) {
            if (key === 'addError') {
                const addError: AddError = (msg) => {
                    const __errors = Reflect.get(target, '__errors', receiver)
                    if (__errors && Array.isArray(__errors)) {
                        __errors.push(msg)
                    } else {
                        Reflect.set(target, '__errors', [msg], receiver)
                    }
                }
                return addError
            }
            const res = Reflect.get(target, key, receiver)

            if (res === undefined && key !== 'toJSON') {
                const p = createErrorProxy()
                Reflect.set(target, key, p, receiver)
                return p
            }

            return res
        }
    })
}

export async function validateData(validateParam: IValidateParam) {
    const {
        validator,
        data,
        schema,
        locale = 'zh-TW',
        customValidate
    } = validateParam

    let validationError = ''
    try {
        validator.validate(schema, data)
    } catch (err) {
        if (typeof err === 'string') validationError = err
        if (err instanceof Error) validationError = err.message
    }
    i18n[locale](validator.errors)

    const errors = transformErrors(validator.errors)

    if (validationError) {
        errors.push({ message: validationError })
    }

    const errorSchema = toErrorSchema(errors)

    if (!customValidate) {
        return {
            errors,
            errorSchema,
            valid: errors.length === 0
        }
    }

    const proxy = createErrorProxy()

    await customValidate(data, proxy)

    const newErrorSchema = mergeObject<ErrorSchema>(errorSchema, proxy, true)

    return {
        errors,
        errorSchema: newErrorSchema,
        valid: errors.length === 0
    }
}
