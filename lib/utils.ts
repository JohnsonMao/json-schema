import { computed, inject, InjectionKey, WritableComputedRef } from 'vue'

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

export function isObject(thing: unknown): thing is Record<string, unknown> {
    return typeof thing === 'object' && thing != null && !Array.isArray(thing)
}

export function mergeObject<T = Record<string, unknown>>(
    obj1: Record<string, unknown>,
    obj2: Record<string, unknown>,
    concatArrays?: boolean
) {
    const source = Object.assign({}, obj1)

    return Object.keys(obj2).reduce((src, key) => {
        const left = obj1 ? obj1[key] : {}
        const right = obj2[key]

        if (Object.hasOwn(obj1, key) && isObject(left) && isObject(right)) {
            src[key] = mergeObject(left, right, concatArrays)
        } else if (
            concatArrays &&
            Array.isArray(left) &&
            Array.isArray(right)
        ) {
            src[key] = left.concat(right)
        } else {
            src[key] = right
        }
        return src
    }, source) as T
}
