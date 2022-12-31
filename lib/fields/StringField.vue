<script setup lang="ts">
import { DefineFieldProps } from '../types.d'

defineProps(DefineFieldProps)

const emit = defineEmits<{ (event: 'change', value: string): void }>()

function handleChange(e: Event) {
    const { value } = e.target as HTMLInputElement

    emit('change', value)
}
</script>

<template>
    <input type="text" :value="value" @input="handleChange" />
</template>
