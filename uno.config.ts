import {defineConfig, presetUno, presetIcons} from 'unocss'

export default defineConfig({
    content: {
        filesystem: [
            'src/**/*.{vue,htm,html,jsx,tsx}'
        ]
    },
    presets: [
        presetUno(),
        presetIcons()
    ]
})
