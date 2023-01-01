<script setup lang="ts">
import StringField from './fields/StringField.vue'
import NumberField from './fields/NumberField.vue'
import ObjectField from './fields/ObjectField.vue'
import ArrayField from './fields/ArrayField.vue'
import { DefineFieldProps, SchemaType } from './types'
import { hasOwnProperty } from './utils'

defineProps(DefineFieldProps)

const emit = defineEmits<{ (event: 'change', value: unknown): void }>()

const components = {
    [SchemaType.STRING]: StringField,
    [SchemaType.NUMBER]: NumberField,
    [SchemaType.OBJECT]: ObjectField,
    [SchemaType.ARRAY]: ArrayField
}

function handleChange(v: unknown) {
    emit('change', v)
}
</script>

<template>
    <component
        v-if="hasOwnProperty(components, schema?.type)"
        v-bind="$props"
        :is="components[schema.type as keyof typeof components]"
        @change="handleChange"
    />
</template>
