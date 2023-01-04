<script setup lang="ts">
import { ref, computed } from 'vue'
import MonacoEditorVue from './components/MonacoEditor.vue'
import SchemaForm, { Schema } from '../lib'
import theme from '../lib/theme'

interface IDemo {
    name: string
    schema: Schema
    uiSchema: Record<string, unknown>
    value: unknown
}

const demos = Object.values(
    import.meta.glob<IDemo>('./demos/*.ts', { import: 'default', eager: true })
)

const stringify = (data: unknown) => JSON.stringify(data, null, 2)
const demo = ref(demos[0])
const schemaCodeRef = computed(() => stringify(demo.value.schema))
const uiSchemaCodeRef = computed(() => stringify(demo.value.uiSchema))
const valueCodeRef = computed(() => stringify(demo.value.value))

function toggleDemo(index: number) {
    demo.value = demos[index]
}

function handleCode(code: string, key: keyof Omit<IDemo, 'name'>) {
    try {
        demo.value[key] = JSON.parse(code)
    } catch (err) {}
}

function handleValueForm(v: unknown) {
    demo.value.value = v
}
</script>

<template>
    <div class="container">
        <div class="container__code">
            <div class="container__code__buttons">
                <button
                    v-for="(demo, index) in demos"
                    :key="index"
                    @click="toggleDemo(index)"
                >
                    {{ demo.name }}
                </button>
            </div>
            <div class="container__code__editor">
                <MonacoEditorVue
                    :code="schemaCodeRef"
                    @change="handleCode($event, 'schema')"
                    title="Schema"
                />
                <MonacoEditorVue
                    :code="uiSchemaCodeRef"
                    @change="handleCode($event, 'uiSchema')"
                    title="UI Schema"
                />
                <MonacoEditorVue
                    :code="valueCodeRef"
                    @change="handleCode($event, 'value')"
                    title="Data"
                />
            </div>
        </div>
        <div class="container__form">
            <SchemaForm
                :theme="theme"
                :schema="demo.schema"
                :uiSchema="demo.uiSchema"
                :value="demo.value"
                @change="handleValueForm"
            />
        </div>
    </div>
</template>

<style lang="scss">
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.container {
    display: flex;

    &__code {
        display: flex;
        flex-direction: column;
        width: 50%;
        height: 100vh;

        &__buttons {
            display: flex;
            padding: 0.25rem 1rem;
            gap: 0.5rem;
        }

        &__editor {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, 1fr);
            flex: 1;
            gap: 0.25rem;
        }

        &__editor div:first-child {
            grid-column: 1 / 3;
            grid-row: 1 / 2;
        }
    }

    &__form {
        padding: 1rem;
    }
}
</style>
