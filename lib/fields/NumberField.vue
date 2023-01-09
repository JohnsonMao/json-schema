<script setup lang="ts">
import { schemaFormContextKey } from '../symbol'
import { DefineFieldProps } from '../types'
import { injectStrict } from '../utils'

defineProps(DefineFieldProps)

const context = injectStrict(schemaFormContextKey)
const { theme } = context
const { NumberWidget } = theme.widgets

const emit = defineEmits<{ (event: 'change', value: number | null): void }>()

function handleChange(value: number | null) {
    emit('change', value)
}
</script>

<template>
    <NumberWidget
        :schema="schema"
        :value="value"
        :errors="errorSchema.__errors"
        @change="handleChange"
    />
</template>
