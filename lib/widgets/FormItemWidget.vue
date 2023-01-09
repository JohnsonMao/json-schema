<script setup lang="ts">
import { DefineWidgetProps } from '../types'

defineProps(DefineWidgetProps)
</script>

<template>
    <div>
        <label>{{ schema?.title }}</label>
        <slot></slot>
        <ul>
            <li v-for="(error, index) in errors" :key="index">
                {{ error }}
            </li>
        </ul>
    </div>
</template>
