/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        eslintPlugin({ cache: false }),
        monacoEditorPlugin.default({
            languageWorkers: ['editorWorkerService', 'json']
        })
    ],
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
