import { CustomFormat, DefineWidget } from '../../lib'
import ColorWidget from '../components/ColorWidget.vue'

const format: CustomFormat = {
    name: 'color',
    definition: {
        type: 'string',
        validate: /^#[\dA-Fa-f]{6}$/
    },
    component: ColorWidget as DefineWidget
}

export default format
