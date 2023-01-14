<script setup lang="ts">
import { computed } from 'vue'
import { getWidget } from '../theme'
import { DefineFieldProps, widgetsName } from '../types'

const props = defineProps(DefineFieldProps)

const TextWidget = getWidget(widgetsName.TextWidget, props.uiSchema)

const emit = defineEmits<{ (event: 'change', value: string): void }>()

const configRef = computed(() => {
    if (!props.uiSchema) return

    const { widget, items, properties, ...config } = props.uiSchema

    return { widget, items, properties, config }
})

function handleChange(value: string) {
    emit('change', value)
}
</script>

<template>
    <TextWidget
        :schema="schema"
        :value="value"
        :errors="errorSchema.__errors"
        :config="configRef?.config"
        @change="handleChange"
    />
</template>
