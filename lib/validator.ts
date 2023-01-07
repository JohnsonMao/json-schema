import Ajv, { ErrorObject } from 'ajv'
import i18n from 'Ajv-i18n'
import { Schema } from './types'

type Errors = (Partial<ErrorObject> & { message: unknown })[]

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
    return errors
}

export function validateFormData(
    validator: Ajv,
    formData: unknown,
    schema: Schema,
    locale: keyof typeof i18n
) {
    let validationError = null
    try {
        validator.validate(schema, formData)
        i18n[locale](validator.errors)
    } catch (err) {
        validationError = err
    }
    const errors = transformErrors(validator.errors)

    if (typeof validationError === 'string') errors.push({ message: validationError })

    console.log(validationError)

    const errorSchema = toErrorSchema(errors)

    return {
        errors,
        errorSchema,
        valid: errors.length === 0
    }
}
