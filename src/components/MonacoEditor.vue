<script setup lang="ts">
import {
    ref,
    shallowRef,
    watchEffect,
    onMounted,
    onBeforeUnmount,
    PropType
} from 'vue'
import * as Monaco from 'monaco-editor'

const props = defineProps({
    code: {
        type: String as PropType<string>,
        required: true
    },
    title: {
        type: String as PropType<string>,
        required: true
    }
})

const emit = defineEmits(['change'])

const monacoInstanceRef = shallowRef<ReturnType<typeof Monaco.editor.create>>()
const monacoRef = ref()
let monacoListener: Monaco.IDisposable

onMounted(() => {
    monacoInstanceRef.value = Monaco.editor.create(monacoRef.value, {
        value: props.code,
        language: 'json',
        formatOnPaste: true,
        tabSize: 2,
        minimap: {
            enabled: false
        }
    })
    monacoListener = monacoInstanceRef.value.onDidChangeModelContent(() => {
        emit('change', monacoInstanceRef.value?.getValue())
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
    <div>
        <div>{{ title }}</div>
        <div class="schema" ref="monacoRef"></div>
    </div>
</template>

<style>
.schema {
    height: 100px;
}
</style>
