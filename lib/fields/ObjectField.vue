<script setup lang="ts">
import { computed } from 'vue'
import { DefineFieldProps } from '../types'
import { schemaFormContextKey } from '../symbol'
import { injectStrict, isObject } from '../utils'

const props = defineProps(DefineFieldProps)

const emit = defineEmits<{
    (event: 'change', value: Record<string, unknown>): void
}>()

const context = injectStrict(schemaFormContextKey)
const { SchemaItems } = context

const properties = computed(() => props.schema.properties || {})
const valueRef = computed(() => isObject(props.value) ? (props.value as Record<string, unknown>) : {})

function handleChange(key: string | number, v: unknown) {
    const value = valueRef.value

    if (v === undefined) {
        delete value[key]
    } else {
        value[key] = v
    }
    emit('change', value)
}
</script>

<template>
    <SchemaItems
        v-for="(prop, key) in properties"
        :schema="prop"
        :uiSchema="uiSchema"
        :root-schema="rootSchema"
        :value="valueRef[key]"
        :key="key"
        @change="(v) => handleChange(key, v)"
    />
</template>
