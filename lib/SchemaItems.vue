<script setup lang="ts">
import { DefineFieldProps, SchemaType } from './types.d'
import StringField from './fields/StringField.vue'
import NumberField from './fields/NumberField.vue'

defineProps(DefineFieldProps)

const emit = defineEmits<{ (event: 'change', value: unknown): void }>()

const components = {
    [SchemaType.STRING]: StringField,
    [SchemaType.NUMBER]: NumberField
}

function handleChange(v: unknown) {
    emit('change', v)
}
</script>

<template>
    <component
        v-if="Object.keys(components).includes(schema.type)"
        v-bind="$props"
        :is="components[schema.type as keyof typeof components]"
        @change="handleChange"
    />
</template>
