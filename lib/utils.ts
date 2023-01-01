import { inject, InjectionKey } from 'vue'

export function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
    const resolved = inject(key, fallback)
    if (!resolved) throw new Error(`Could not resolve ${key.description}`)
    return resolved
}

export function isObject(thing: unknown) {
    return typeof thing === 'object' && thing !== null && !Array.isArray(thing)
}

export function isEmptyObject(thing: unknown) {
    return isObject(thing) && Object.keys(thing as object).length === 0
}

export function hasOwnProperty(obj: unknown, key: string) {
    return Object.prototype.hasOwnProperty.call(obj, key)
}
