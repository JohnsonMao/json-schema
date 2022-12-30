<script setup lang="ts">
import { reactive, computed } from 'vue'
import MonacoEditorVue from './components/MonacoEditor.vue'
import SchemaForm from '../lib'

const demos = Object.values(
    import.meta.glob('./demos/*.ts', { import: 'default', eager: true })
)

console.log(demos)

const schema = {
    type: 'string'
}

const demo = reactive({
    schema,
    data: {},
    uiSchema: {}
})

const schemaCodeRef = computed(() => JSON.stringify(demo.schema, null, 2))
const dataCodeRef = computed(() => JSON.stringify(demo.data, null, 2))
const uiSchemaCodeRef = computed(() => JSON.stringify(demo.uiSchema, null, 2))

function handleCode(code: string, key: 'schema' | 'data' | 'uiSchema') {
    try {
        demo[key] = JSON.parse(code)
    } catch (err) {}
}

function handleSchemaForm() {
    console.log('handle')
}
</script>

<template>
    <div class="container">
        <div class="container__code">
            <MonacoEditorVue
                :code="schemaCodeRef"
                @change="handleCode($event, 'schema')"
                title="Schema"
            />
            <MonacoEditorVue
                :code="dataCodeRef"
                @change="handleCode($event, 'data')"
                title="Data"
            />
            <MonacoEditorVue
                :code="uiSchemaCodeRef"
                @change="handleCode($event, 'uiSchema')"
                title="UI Schema"
            />
        </div>
        <div class="container__form">
            <SchemaForm
                :schema="demo.schema"
                :data="demo.data"
                @change="handleSchemaForm"
            />
        </div>
    </div>
</template>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.container {
    display: flex;
}
.container__code {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    width: 50%;
    height: 100vh;
    gap: 0.25rem;
}
.container__code div:first-child {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
}
.container__form {
    padding: 1rem;
}
</style>
