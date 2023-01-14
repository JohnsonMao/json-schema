<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { DefineArrayProps, widgetsName } from '../types'
import { schemaFormContextKey } from '../symbol'
import { injectStrict } from '../utils'
import { getWidget } from '../theme'

const props = defineProps(DefineArrayProps)

const emit = defineEmits<{ (event: 'change', value: unknown[]): void }>()

const context = injectStrict(schemaFormContextKey)
const { SchemaItems } = context
const MultiSelectWidget = getWidget(widgetsName.MultiSelectWidget, props)

function handleChange(index: number, v: unknown) {
    const value = props.value

    value[index] = v

    emit('change', value)
}

function handleArray(action: string, index: number) {
    const value = props.value

    switch (action) {
        case 'add':
            value.splice(index + 1, 0, null)
            break
        case 'remove':
            value.splice(index, 1)
            break
        case 'up': {
            if (index === 0) return
            const [item] = value.splice(index, 1)
            value.splice(index - 1, 0, item)
            break
        }
        case 'down': {
            if (index === value.length - 1) return
            const [item] = value.splice(index, 1)
            value.splice(index + 1, 0, item)
            break
        }
    }

    emit('change', value)
}
function selectionArray(value: unknown[]) {
    emit('change', value)
}

const ArrayItemWrapper = defineComponent({
    name: 'ArrayItemWrapper',
    emits: ['change'],
    setup(prop, { slots, emit }) {
        const handleClick = (e: Event) => {
            emit('change', (e.target as HTMLElement).id)
        }
        return () => {
            return h('div', null, [
                h(
                    'div',
                    {
                        style: 'display: flex; gap: 0.5rem',
                        onClick: handleClick
                    },
                    [
                        h('button', { id: 'add' }, '增加'),
                        h('button', { id: 'remove' }, '刪除'),
                        h('button', { id: 'up' }, '上移'),
                        h('button', { id: 'down' }, '下移')
                    ]
                ),
                h('div', null, slots.default && slots.default())
            ])
        }
    }
})
</script>

<template>
    <template v-if="Array.isArray(schema.items)">
        <SchemaItems
            v-for="(item, index) in schema.items"
            :schema="item"
            :uiSchema="
                Array.isArray(uiSchema?.items)
                    ? uiSchema?.items?.[index]
                    : uiSchema?.items
            "
            :errorSchema="errorSchema[index]"
            :value="value[index]"
            :key="index"
            @change="(v) => handleChange(index, v)"
        />
    </template>
    <template v-else-if="schema.items?.enum">
        <MultiSelectWidget
            :schema="schema"
            :value="value"
            :errors="errorSchema.__errors"
            :options="schema.items.enum.map((v) => ({ label: v, value: v }))"
            @change="selectionArray"
        />
    </template>
    <template v-else-if="schema.items">
        <ArrayItemWrapper
            v-for="(itemValue, index) in value"
            :key="index"
            @change="(action) => handleArray(action, index)"
        >
            <SchemaItems
                :schema="schema.items"
                :uiSchema="
                    Array.isArray(uiSchema?.items) ? {} : uiSchema?.items
                "
                :errorSchema="errorSchema[index]"
                :value="itemValue"
                @change="(v) => handleChange(index, v)"
            />
        </ArrayItemWrapper>
    </template>
</template>
