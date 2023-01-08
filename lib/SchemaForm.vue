<script setup lang="ts">
import { shallowRef, computed, provide, withDefaults } from 'vue'
import Ajv, { Options } from 'ajv'
import i18n from 'ajv-i18n'

import { ISchemaFormContext, Schema, ITheme, ErrorSchema } from './types'
import SchemaItems from './SchemaItems.vue'
import { schemaFormContextKey } from './symbol'
import { useModelWrapper } from './utils'
import { validateFormData } from './validator'

interface IProps {
    schema: Schema
    uiSchema: Record<string, unknown>
    modelValue: unknown
    theme: ITheme
    ajvOptions?: Options
    locale?: keyof typeof i18n
}

const props = withDefaults(defineProps<IProps>(), {
    locale: 'zh-TW'
})

const emit = defineEmits<{
    (event: 'update:modelValue', value: unknown): void
}>()

const theModel = useModelWrapper(props, emit)
const errorSchemaRef = shallowRef<ErrorSchema>({})

const context = {
    SchemaItems,
    theme: props.theme
} as ISchemaFormContext

provide(schemaFormContextKey, context)

const defaultAjvOptions: Options = {
    allErrors: true
}

const validator = computed(
    () =>
        new Ajv({
            ...defaultAjvOptions,
            ...props.ajvOptions
        })
)

function handleChange(v: unknown) {
    theModel.value = v
}

function validate() {
    const result = validateFormData(
        validator.value,
        theModel.value,
        props.schema,
        props.locale
    )

    errorSchemaRef.value = result.errorSchema

    return result
}

defineExpose({ validate })
</script>

<template>
    <SchemaItems
        :schema="schema"
        :uiSchema="uiSchema"
        :errorSchema="errorSchemaRef"
        :value="theModel"
        @change="handleChange"
    />
</template>
