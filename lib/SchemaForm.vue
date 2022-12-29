<script setup lang="ts">
import { Schema, SchemaType } from './types.d'

const props = defineProps<{
    schema: Schema
    value?: unknown
}>()

console.log(props)
</script>

<template>
    <input v-if="schema.type === SchemaType.STRING" type="text">
    <div v-else>Schema Form</div>
</template>
