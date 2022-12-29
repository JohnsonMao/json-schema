<script setup lang="ts">
import { ref, shallowRef, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import * as Monaco from 'monaco-editor'

const props = defineProps<{
    code: string
    title: string
}>()

const emit = defineEmits<{ (event: 'change', id: string): void }>()

const monacoInstanceRef = shallowRef<ReturnType<typeof Monaco.editor.create>>()
const monacoRef = ref()
let monacoListener: Monaco.IDisposable

onMounted(() => {
    const editor = Monaco.editor.create(monacoRef.value, {
        value: props.code,
        language: 'json',
        formatOnPaste: true,
        tabSize: 2,
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: {
            enabled: false
        }
    })
    monacoInstanceRef.value = editor
    monacoListener = editor.onDidChangeModelContent(() => {
        const code = editor.getValue()

        emit('change', code)
    })
})

onBeforeUnmount(() => {
    if (monacoListener) monacoListener.dispose()
})

watchEffect(() => {
    const model = monacoInstanceRef.value?.getModel()

    monacoInstanceRef.value?.pushUndoStop()
    model?.pushEditOperations(
        [],
        [
            {
                range: model?.getFullModelRange(),
                text: props.code
            }
        ],
        () => null
    )
    monacoInstanceRef.value?.pushUndoStop()
})
</script>

<template>
    <div class="container">
        <div class="title">{{ title }}</div>
        <div class="schema" ref="monacoRef"></div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.title {
    background: #333;
    color: #ccc;
    text-align: center;
}
.schema {
    flex: 1;
}
</style>
