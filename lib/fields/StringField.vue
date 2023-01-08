<script setup lang="ts">
import { schemaFormContextKey } from '../symbol'
import { DefineFieldProps } from '../types'
import { injectStrict } from '../utils'

defineProps(DefineFieldProps)

const context = injectStrict(schemaFormContextKey)
const { theme } = context
const { TextWidget } = theme.widgets

const emit = defineEmits<{ (event: 'change', value: string): void }>()

function handleChange(value: string) {
    emit('change', value)
}
</script>

<template>
    <TextWidget
        :value="value"
        :error="errorSchema.__errors"
        @change="handleChange"
    />
</template>
