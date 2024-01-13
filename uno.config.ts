import {defineConfig, presetUno, presetIcons, presetAttributify} from 'unocss'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'

export default defineConfig({
    content: {
        filesystem: [
            'src/**/*.{vue,htm,html,jsx,tsx}'
        ]
    },
    presets: [
        presetUno(),
        presetIcons(),
        presetAttributify()

    ],
    transformers: [
        transformerAttributifyJsx()
    ]
})
