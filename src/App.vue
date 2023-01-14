<script setup lang="ts">
import { ref, computed } from 'vue'
import MonacoEditorVue from './components/MonacoEditor.vue'
import SchemaForm from '../lib'
import theme from '../lib/theme'
import { IDemo } from './types'
import format from './plugin/customFormat'

const demos = Object.values(
    import.meta.glob<IDemo>('./demos/*.ts', { import: 'default', eager: true })
)

const stringify = (data: unknown) => JSON.stringify(data, null, 2)
const demo = ref(demos[0])
const schemaCodeRef = computed(() => stringify(demo.value.schema))
const uiSchemaCodeRef = computed(() => stringify(demo.value.uiSchema))
const valueCodeRef = computed(() => stringify(demo.value.value))
const errorCodeRef = ref('')
const schemaFormRef = ref<InstanceType<typeof SchemaForm>>()

function toggleDemo(index: number) {
    demo.value = demos[index]
}

function handleCode(code: string, key: keyof Omit<IDemo, 'name'>) {
    try {
        demo.value[key] = JSON.parse(code)
    } catch (err) {}
}

async function handleVaild() {
    const validion = await schemaFormRef.value?.validate()

    errorCodeRef.value = stringify(validion?.errorSchema)
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
                    :code="valueCodeRef"
                    @change="handleCode($event, 'value')"
                    title="Data"
                />
                <MonacoEditorVue
                    :code="uiSchemaCodeRef"
                    @change="handleCode($event, 'uiSchema')"
                    title="UI Schema"
                />
                <MonacoEditorVue
                    :code="errorCodeRef"
                    title="Error Schema"
                />
            </div>
        </div>
        <div class="container__form">
            <SchemaForm
                ref="schemaFormRef"
                v-model="demo.value"
                :theme="theme"
                :schema="demo.schema"
                :uiSchema="demo.uiSchema"
                :customValidate="demo.customValidate"
                :customFormats="format"
            />
            <button @click="handleVaild">驗證</button>
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
    }

    &__form {
        padding: 1rem;
    }
}
</style>
