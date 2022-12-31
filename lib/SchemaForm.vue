<script setup lang="ts">
import { DefineFieldProps } from './types.d'
import SchemaItems from './SchemaItems.vue'

defineProps(DefineFieldProps)

const emit = defineEmits<{ (event: 'change', value: unknown): void }>()

function handleChange(v: unknown) {
    emit('change', v)
}
</script>

<template>
    <SchemaItems v-bind="$props" @change="handleChange" />
</template>
