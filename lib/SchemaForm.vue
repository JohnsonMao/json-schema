<script setup lang="ts">
import { provide } from 'vue'

import { ISchemaFormContext, Schema, ITheme } from './types'
import SchemaItems from './SchemaItems.vue'
import { schemaFormContextKey } from './symbol'

const props = defineProps<{
    schema: Schema
    uiSchema: Record<string, unknown>
    value: unknown
    theme: ITheme
}>()

const emit = defineEmits<{ (event: 'change', value: unknown): void }>()

const context = {
    SchemaItems,
    theme: props.theme
} as ISchemaFormContext

provide(schemaFormContextKey, context)

function handleChange(v: unknown) {
    emit('change', v)
}
</script>

<template>
    <SchemaItems
        :schema="schema"
        :uiSchema="uiSchema"
        :value="value"
        @change="handleChange"
    />
</template>
