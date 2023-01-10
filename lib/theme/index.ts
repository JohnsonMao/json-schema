import { DefineComponent, defineComponent, useAttrs, h } from 'vue'
import FormItemWidget from '../widgets/FormItemWidget.vue'
import MultiSelectWidget from '../widgets/MultiSelectWidget.vue'
import TextWidget from '../widgets/TextWidget.vue'
import NumberWidget from '../widgets/NumberWidget.vue'

type Widget =
    | typeof MultiSelectWidget
    | typeof TextWidget
    | typeof NumberWidget
    | DefineComponent

export type withFormItemWidget = ReturnType<typeof withFormItem>

export function withFormItem(Widget: Widget) {
    return defineComponent({
        name: `Wrapped${Widget.name}`,
        setup() {
            const attrs = useAttrs()

            return () => {
                return h(FormItemWidget, attrs, () => [h(Widget, attrs)])
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
