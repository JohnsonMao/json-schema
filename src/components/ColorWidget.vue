<script setup lang="ts">
import { DefineWidgetProps } from '../../lib'

defineProps(DefineWidgetProps)

const emit = defineEmits<{ (event: 'change', value: string): void }>()

function handleChange(e: Event) {
    const { value } = e.target as HTMLInputElement

    emit('change', value)
}
</script>

<template>
    <input type="color" :value="value" @input="handleChange" />
</template>
