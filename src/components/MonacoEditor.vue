<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, PropType } from 'vue'
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

const monacoInstanceRef = ref<ReturnType<typeof Monaco.editor.create>>()
const monacoRef = ref()
let monacoListener: null | Monaco.IDisposable = null

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
    monacoListener = monacoInstanceRef.value.onDidChangeModelContent(
        (event) => {
            console.log(event)
            console.log(monacoInstanceRef.value?.getValue())
            emit('change')
        }
    )
})

onBeforeUnmount(() => {
    if (monacoListener) monacoListener.dispose()
})

watch(
    () => props.code,
    (v) => {
        // const model = monacoInstanceRef.value?.getModel()
        // console.log(v, model?.getValue())
        // if (v !== model?.getValue()) {
        //     monacoInstanceRef.value?.pushUndoStop()
        //     model?.pushEditOperations(
        //         [],
        //         [
        //             {
        //                 range: model.getFullModelRange(),
        //                 text: v
        //             }
        //         ]
        //     )
        //     monacoInstanceRef.value?.pushUndoStop()
        // }
    }
)
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
