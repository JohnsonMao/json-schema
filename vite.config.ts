/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'

interface IMonacoEditorPlugin {
    default: typeof monacoEditorPlugin
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    const isLib = env.VITE_MODE !== 'DEMO'

    return {
        base: env.VITE_BASE,
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
            lib: isLib && {
                entry: resolve(__dirname, 'lib/index.ts'),
                name: 'json-schema',
                fileName: 'json-schema'
            },
            rollupOptions: isLib && {
                external: ['vue'],
                output: {
                    globals: {
                        vue: 'Vue'
                    }
                }
            },
            outDir: isLib ? 'dist' : 'web'
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
    }
})
