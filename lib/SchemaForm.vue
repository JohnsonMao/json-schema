<script setup lang="ts">
import { provide } from 'vue'

import { ISchemaFormContext, DefineFieldProps } from './types'
import SchemaItems from './SchemaItems.vue'
import { schemaFormContextKey } from './symbol'

defineProps(DefineFieldProps)

const emit = defineEmits<{ (event: 'change', value: unknown): void }>()

const context = {
    SchemaItems
} as ISchemaFormContext

provide(schemaFormContextKey, context)

function handleChange(v: unknown) {
    emit('change', v)
}
</script>

<template>
    <SchemaItems v-bind="$props" @change="handleChange" />
</template>
