<script setup lang="ts">
import { computed, ref } from 'vue'
import MonacoEditorVue from './components/MonacoEditor.vue'

const schema = {
    type: 'string'
}

const schemaRef = ref<unknown>(schema)
const codeRef = computed(() => JSON.stringify(schemaRef.value, null, 2))

function handleChange(code: string) {
    let schema: unknown

    try {
        schema = JSON.parse(code)
    } catch (err) {}

    schemaRef.value = schema
}
</script>

<template>
    <MonacoEditorVue :code="codeRef" @change="handleChange" title="Schema" />
</template>
