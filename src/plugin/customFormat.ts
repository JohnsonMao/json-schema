import { CustomFormats, DefineWidget } from '../../lib'
import ColorWidget from '../components/ColorWidget.vue'

const format: CustomFormats = {
    name: 'color',
    definition: {
        type: 'string',
        validate: /^#[\dA-Fa-f]{6}$/
    },
    component: ColorWidget as DefineWidget
}

export default format
