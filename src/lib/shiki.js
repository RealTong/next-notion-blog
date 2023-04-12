import {getHighlighter, renderToHtml} from 'shiki'

let highlighter;

export async function highlight(code, theme, lang) {
    if (!highlighter) {
        highlighter = await getHighlighter({
            langs: [lang],
            theme: theme
        })
    }

    const tokens = highlighter.codeToThemedTokens(code, lang, theme, {
        includeExplanation: false
    })
    return renderToHtml(tokens, {bg: 'transparent'})
}