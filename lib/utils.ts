import {
    computed,
    inject,
    InjectionKey,
    WritableComputedRef,
    defineComponent,
    useAttrs,
    h
} from 'vue'
import { DefineWidget, DefineOptionsWidget } from './types'
import FormItemWidget from './widgets/FormItemWidget.vue'

export function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
    const resolved = inject(key, fallback)
    if (!resolved) throw new Error(`Could not resolve ${key.description}`)
    return resolved
}

interface IProps {
    modelValue: unknown
}

export function useModelWrapper<
    TProps extends IProps,
    TKey extends keyof TProps & string = 'modelValue'
>(
    props: TProps,
    emit: (event: `update:${TKey}`, value: TProps[TKey]) => void,
    name: TKey = 'modelValue' as TKey
): WritableComputedRef<TProps[TKey]> {
    return computed({
        get: () => props[name],
        set: (value) => emit(`update:${name}`, value)
    })
}

export function withFormItem(Widget: DefineWidget | DefineOptionsWidget) {
    return defineComponent({
        name: `Wrapped${Widget.name}`,
        setup() {
            const attr = useAttrs()

            return () => {
                return h(FormItemWidget, attr, [h(Widget, attr)])
            }
        }
    })
}
