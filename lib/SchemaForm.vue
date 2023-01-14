<script setup lang="ts">
import {
    ref,
    shallowRef,
    computed,
    provide,
    withDefaults,
    watch,
    WatchStopHandle
} from 'vue'
import Ajv, { Options } from 'ajv'
import i18n from 'ajv-i18n'

import SchemaItems from './SchemaItems.vue'
import { schemaFormContextKey } from './symbol'
import { useModelWrapper } from './utils'
import { validateData } from './validator'
import {
    ISchemaFormContext,
    CustomValidate,
    ITheme,
    Schema,
    UISchema,
    ErrorSchema,
    DefineWidget,
    AwaitValidateData,
    CustomFormats
} from './types'

interface IProps {
    schema: Schema
    uiSchema?: UISchema
    modelValue: unknown
    theme: ITheme
    ajvOptions?: Options
    locale?: keyof typeof i18n
    customValidate?: CustomValidate
    customFormats?: CustomFormats[] | CustomFormats
}

const props = withDefaults(defineProps<IProps>(), {
    locale: 'zh-TW'
})

const emit = defineEmits<{
    (event: 'update:modelValue', value: unknown): void
}>()

const theModel = useModelWrapper(props, emit)
const errorSchemaRef = shallowRef<ErrorSchema>({})

const defaultAjvOptions: Options = {
    allErrors: true
}

const validatorRef = computed(() => {
    const validator = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions
    })
    // if (props.customFormats) {
    //     const customFormats = Array.isArray(props.customFormats)
    //         ? props.customFormats
    //         : [props.customFormats]

    //     customFormats.forEach((format) => {
    //         validator.addFormat(format.name, format.definition)
    //     })
    // }

    return validator
})

const formatMapRef = computed<Record<string, DefineWidget>>(() => {
    if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
            ? props.customFormats
            : [props.customFormats]

        return customFormats.reduce((result, format) => {
            validatorRef.value.addFormat(format.name, format.definition)
            result[format.name] = format.component
            return result
        }, {} as Record<string, DefineWidget>)
    }
    return {}
})

const context = {
    SchemaItems,
    theme: props.theme,
    formatMapRef
} as ISchemaFormContext

provide(schemaFormContextKey, context)

function handleChange(v: unknown) {
    theModel.value = v
}

const validateResolveRef = ref<(result: AwaitValidateData) => void>()
const validateIndex = ref(0)
const stopWatchRef = ref<WatchStopHandle>()

async function doValidate() {
    const index = (validateIndex.value += 1)
    const result = await validateData({
        validator: validatorRef.value,
        data: theModel.value,
        schema: props.schema,
        locale: props.locale,
        customValidate: props.customValidate
    })

    if (index !== validateIndex.value) return

    errorSchemaRef.value = result.errorSchema

    validateResolveRef.value?.(result)
    validateResolveRef.value = undefined
    stopWatchRef.value?.()
    stopWatchRef.value = undefined
}

function validate() {
    return new Promise<AwaitValidateData>((resolve) => {
        validateResolveRef.value = resolve
        stopWatchRef.value = watch(
            theModel,
            () => {
                if (validateResolveRef.value) {
                    doValidate()
                }
            },
            { deep: true }
        )
        doValidate()
    })
}

defineExpose({ validate })
</script>

<template>
    <SchemaItems
        :schema="schema"
        :uiSchema="uiSchema"
        :errorSchema="errorSchemaRef"
        :value="theModel"
        @change="handleChange"
    />
</template>
