<script setup lang="ts">
import { provide } from 'vue'

import { ISchemaFormContext, Schema, ITheme } from './types'
import SchemaItems from './SchemaItems.vue'
import { schemaFormContextKey } from './symbol'
import { useModelWrapper } from './utils'

interface IProps {
    schema: Schema
    uiSchema: Record<string, unknown>
    modelValue: unknown
    theme: ITheme
}

const props = defineProps<IProps>()

const emit = defineEmits<{ (event: 'update:modelValue', value: unknown): void }>()

const theModel = useModelWrapper(props, emit)

const context = {
    SchemaItems,
    theme: props.theme
} as ISchemaFormContext

provide(schemaFormContextKey, context)

function handleChange(v: unknown) {
    theModel.value = v
}
</script>

<template>
    <SchemaItems
        :schema="schema"
        :uiSchema="uiSchema"
        :value="theModel"
        @change="handleChange"
    />
</template>
