<script setup lang="ts">
import { computed } from 'vue'
import { DefineWidgetProps } from '../types'

const props = defineProps(DefineWidgetProps)

const emit = defineEmits<{ (event: 'change', value: string): void }>()

function handleChange(e: Event) {
    const { value } = e.target as HTMLInputElement

    emit('change', value)
}

const styleRef = computed(() => props.config?.style)
const classRef = computed(() => props.config?.class)
</script>

<template>
    <input
        type="text"
        :value="value"
        :style="styleRef"
        :class="classRef"
        @input="handleChange"
    />
</template>
