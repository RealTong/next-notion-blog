import {defineConfig, presetUno, presetIcons} from 'unocss'

export default defineConfig({
    content: {
        filesystem: [
            '**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}'
        ]
    },
    presets: [
        presetUno(),
        presetIcons()
    ]
})
