import Ajv from 'ajv'
import i18n from 'Ajv-i18n'
import { Errors, ErrorSchema, IValidateParam } from './types'

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

export function validateFormData(validateParam: IValidateParam) {
    const {
        validator,
        formData,
        schema,
        locale = 'zh-TW',
        customValidate
    } = validateParam

    let validationError = ''
    try {
        validator.validate(schema, formData)
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

    customValidate(formData, errors)

    return {
        errors,
        errorSchema,
        valid: errors.length === 0
    }
}
