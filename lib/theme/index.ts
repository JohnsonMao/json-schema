import { DefineComponent, defineComponent, h } from 'vue'
import FormItemWidget from '../widgets/FormItemWidget.vue'
import MultiSelectWidget from '../widgets/MultiSelectWidget.vue'
import TextWidget from '../widgets/TextWidget.vue'
import NumberWidget from '../widgets/NumberWidget.vue'
import { DefineFieldProps } from '../types'

type Widget =
    | typeof MultiSelectWidget
    | typeof TextWidget
    | typeof NumberWidget
    | DefineComponent

export type withFormItemWidget = ReturnType<typeof withFormItem>

export function withFormItem(Widget: Widget) {
    return defineComponent({
        name: `Wrapped${Widget.name}`,
        props: DefineFieldProps,
        emits: ['change'],
        setup(props, { emit, slots, attrs }) {
            const onChange = (v: unknown) => emit('change', v)

            return () => {
                return h(FormItemWidget, props, () => [h(Widget, {
                    ...props,
                    ...attrs,
                    ...slots,
                    onChange
                })])
            }
        }
    })
}

export default {
    widgets: {
        MultiSelectWidget: withFormItem(MultiSelectWidget),
        TextWidget: withFormItem(TextWidget),
        NumberWidget: withFormItem(NumberWidget)
    }
}
