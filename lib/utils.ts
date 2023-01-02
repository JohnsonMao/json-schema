import { inject, InjectionKey } from 'vue'

export function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
    const resolved = inject(key, fallback)
    if (!resolved) throw new Error(`Could not resolve ${key.description}`)
    return resolved
}

export function hasOwnProperty(obj: unknown, key: string) {
    return Object.prototype.hasOwnProperty.call(obj, key)
}
