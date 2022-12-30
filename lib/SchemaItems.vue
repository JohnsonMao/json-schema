<script setup lang="ts">
import { Schema, SchemaType } from './types.d'
import StringField from './fields/StringField.vue'
import NumberField from './fields/NumberField.vue'

const props = defineProps<{
    schema: Schema
    value?: unknown
}>()

const components = {
    [SchemaType.STRING]: StringField,
    [SchemaType.NUMBER]: NumberField
}

console.log(props)
</script>

<template>
    <component
        :is="components[schema.type as keyof typeof components] || 'div'"
    />
</template>
