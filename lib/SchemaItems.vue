<script setup lang="ts">
import { computed } from 'vue'
import StringField from './fields/StringField.vue'
import NumberField from './fields/NumberField.vue'
import ObjectField from './fields/ObjectField.vue'
import ArrayField from './fields/ArrayField.vue'
import { DefineFieldProps, SchemaType } from './types'

const props = defineProps(DefineFieldProps)

const emit = defineEmits<{ (event: 'change', value: unknown): void }>()

const components = {
    [SchemaType.STRING]: StringField,
    [SchemaType.NUMBER]: NumberField,
    [SchemaType.OBJECT]: ObjectField,
    [SchemaType.ARRAY]: ArrayField
}

const componentTypeRef = computed(() => {
    const { type } = props.schema

    if (Object.hasOwn(components, type)) {
        return type as keyof typeof components
    }
    console.warn(`${type} does not support this type.`)
    return false
})

function handleChange(v: unknown) {
    emit('change', v)
}
</script>

<template>
    <component
        v-if="componentTypeRef"
        v-bind="$props"
        :is="components[componentTypeRef]"
        @change="handleChange"
    />
</template>
