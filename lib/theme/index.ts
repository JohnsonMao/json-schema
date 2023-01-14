import { computed, defineComponent, h } from 'vue'
import FormItemWidget from '../widgets/FormItemWidget.vue'
import MultiSelectWidget from '../widgets/MultiSelectWidget.vue'
import TextWidget from '../widgets/TextWidget.vue'
import NumberWidget from '../widgets/NumberWidget.vue'
import { injectStrict, isObject } from '../utils'
import { schemaFormContextKey } from '../symbol'
import {
    DefineWidgetProps,
    widgetsName,
    Widget,
    ITheme,
    UISchema
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

export function getWidget(name: widgetsName, uiSchema?: UISchema) {
    const w = uiSchema?.widget

    if (isObject(w)) {
        return computed(() => w)
    }

    const context = injectStrict(schemaFormContextKey)

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
