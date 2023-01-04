/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'

interface IMonacoEditorPlugin {
    default: typeof monacoEditorPlugin
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        eslintPlugin({ cache: false }),
        (monacoEditorPlugin as unknown as IMonacoEditorPlugin).default({
            languageWorkers: ['editorWorkerService', 'json']
        })
    ],
    test: {
        globals: true,
        environment: 'jsdom'
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/index.ts'),
            name: 'json-schema',
            fileName: 'json-schema'
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
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
