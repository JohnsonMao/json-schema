<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
    value?: unknown[]
    options?: { label: string; value: unknown }[]
}>()

const theModel = ref(Array.isArray(props.value) ? props.value : [])

const emit = defineEmits<{ (event: 'change', value: unknown[]): void }>()

function handleChange() {
    emit('change', theModel.value)
}

watch(
    () => props.value,
    (newValue, oldValue) => {
        if (newValue !== oldValue) {
            theModel.value = props.value || []
        }
    }
)
</script>

<template>
    <select multiple v-model="theModel" @change="handleChange">
        <option
            v-for="(option, index) in options"
            :key="index"
            :value="option.value"
        >
            {{ option.label }}
        </option>
    </select>
</template>
