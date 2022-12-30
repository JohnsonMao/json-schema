<script setup lang="ts">
import SchemaItems from './SchemaItems.vue'
import { Schema } from './types.d'

const props = defineProps<{
    schema: Schema
    value?: unknown
}>()

const emit = defineEmits<{ (event: 'change', id: unknown): void }>()

function handleChange(v: unknown) {
    emit('change', v)
}
</script>

<template>
    <SchemaItems v-bind="props" @change="handleChange" />
</template>
