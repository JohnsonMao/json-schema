/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), eslintPlugin({ cache: false })],
    test: {
        globals: true,
        environment: 'jsdom'
    },
    resolve: {
        alias: {
            '@': '/src'
        }
    },
    server: {
        host: '0.0.0.0',
        port: 8080,
        open: true
    }
})
