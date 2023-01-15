<script setup lang="ts">
import { DefineWidgetProps } from '../types'

defineProps(DefineWidgetProps)
</script>

<template>
    <div class="form__item">
        <label v-if="config?.label">{{ config?.label }}</label>
        <div>
            <slot></slot>
            <ul>
                <li v-for="(error, index) in errors" :key="index">
                    {{ error }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.form__item {
    display: flex;
    margin: .5rem;
    align-items: center;
    gap: .5rem;

    label {
        flex: 1;
        text-align: right;
    }

    div {
        flex: 3;
    }
}
</style>
