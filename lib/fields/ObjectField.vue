<script setup lang="ts">
import { DefineObjectProps } from '../types'
import { schemaFormContextKey } from '../symbol'
import { injectStrict } from '../utils'

const props = defineProps(DefineObjectProps)

const emit = defineEmits<{
    (event: 'change', value: Record<string, unknown>): void
}>()

const context = injectStrict(schemaFormContextKey)
const { SchemaItems } = context

function handleChange(key: string | number, v: unknown) {
    const value = props.value

    if (v == null || v === '') {
        delete value[key]
    } else {
        value[key] = v
    }
    emit('change', value)
}
</script>

<template>
    <SchemaItems
        v-for="(prop, key) in schema?.properties || {}"
        :schema="prop"
        :uiSchema="uiSchema?.properties?.[key]"
        :value="value[key]"
        :errorSchema="errorSchema[key]"
        :key="key"
        @change="(v) => handleChange(key, v)"
    />
</template>
