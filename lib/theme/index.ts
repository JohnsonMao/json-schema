import {
    computed,
    ComputedRef,
    defineComponent,
    ExtractPropTypes,
    h
} from 'vue'
import FormItemWidget from '../widgets/FormItemWidget.vue'
import MultiSelectWidget from '../widgets/MultiSelectWidget.vue'
import TextWidget from '../widgets/TextWidget.vue'
import NumberWidget from '../widgets/NumberWidget.vue'
import { injectStrict, isObject } from '../utils'
import { schemaFormContextKey } from '../symbol'
import {
    DefineFieldProps,
    DefineWidgetProps,
    widgetsName,
    Widget,
    ITheme
} from '../types'

export function withFormItem(Widget: Widget) {
    return defineComponent({
        name: `Wrapped${Widget.name}`,
        props: DefineWidgetProps,
        emits: ['change'],
        setup(props, { emit, slots, attrs }) {
            const onChange = (v: unknown) => emit('change', v)

            return () => {
                return h(FormItemWidget, props, () => [
                    h(Widget, {
                        ...props,
                        ...attrs,
                        ...slots,
                        onChange
                    })
                ])
            }
        }
    })
}

export function getWidget(
    name: widgetsName,
    props?: ExtractPropTypes<typeof DefineFieldProps>
): ComputedRef<ReturnType<typeof withFormItem>> {
    const context = injectStrict(schemaFormContextKey)

    if (props) {
        const { uiSchema, schema } = props
        const w = uiSchema?.widget
        const f = schema.format

        if (isObject(w)) {
            return computed(() => withFormItem(w))
        }

        if (f && context.formatMapRef.value[f]) {
            return computed(() => withFormItem(context.formatMapRef.value[f]))
        }
    }

    if (!context) throw Error('Json schema theme is required')

    return computed(() => withFormItem(context.theme.widgets[name]))
}

export default {
    widgets: {
        MultiSelectWidget,
        TextWidget,
        NumberWidget
    }
} as ITheme
