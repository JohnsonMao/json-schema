<script setup lang="ts">
import { computed } from 'vue'
import { getWidget } from '../theme'
import { DefineFieldProps, widgetsName } from '../types'

const props = defineProps(DefineFieldProps)

const Widget = getWidget(widgetsName.TextWidget, props)

const emit = defineEmits<{ (event: 'change', value: string): void }>()

const configRef = computed(() => {
    if (!props.uiSchema) return

    const config = props.uiSchema

    delete config.widget
    delete config.items
    delete config.properties

    return config
})

function handleChange(value: string) {
    emit('change', value)
}
</script>

<template>
    <Widget
        :schema="schema"
        :value="value"
        :errors="errorSchema.__errors"
        :config="configRef"
        @change="handleChange"
    />
</template>
