<script setup lang="ts">
import { DefineWidgetProps } from '../types'

defineProps(DefineWidgetProps)

const emit = defineEmits<{ (event: 'change', value: number | null): void }>()

function handleChange(e: Event) {
    const { value } = e.target as HTMLInputElement

    if (value === '' || Number.isNaN(+value)) {
        emit('change', null)
    } else {
        emit('change', +value)
    }
}
</script>

<template>
    <input type="number" :value="value" @input="handleChange" />
</template>
