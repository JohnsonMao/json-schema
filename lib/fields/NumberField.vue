<script setup lang="ts">
import { getWidget } from '../theme'
import { DefineFieldProps, widgetsName } from '../types'

const props = defineProps(DefineFieldProps)

const Widget = getWidget(widgetsName.NumberWidget, props)

const emit = defineEmits<{ (event: 'change', value: number | null): void }>()

function handleChange(value: number | null) {
    emit('change', value)
}
</script>

<template>
    <Widget
        :schema="schema"
        :value="value"
        :errors="errorSchema.__errors"
        @change="handleChange"
    />
</template>
