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

function resizeLayout() {
    const { offsetWidth, offsetHeight } = document.body
    const width = (offsetWidth - 8) / 4
    const height = (offsetHeight - 76) / 2

    monacoInstanceRef.value?.layout({ width, height })
}

onMounted(() => {
    const editor = Monaco.editor.create(monacoRef.value, {
        value: props.code,
        language: 'json',
        formatOnPaste: true,
        tabSize: 2,
        theme: 'vs-dark',
        minimap: {
            enabled: false
        }
    })
    monacoInstanceRef.value = editor
    monacoListener = editor.onDidChangeModelContent(() => {
        const code = editor.getValue()

        emit('change', code)
    })
    window.addEventListener('resize', resizeLayout)
})

onBeforeUnmount(() => {
    if (monacoListener) monacoListener.dispose()
    window.removeEventListener('resize', resizeLayout)
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
