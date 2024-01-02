import 'server-only'

export type Locale = 'zh-CN' | 'zh-TW' | 'en-US'

const dictionaries = {
  'zh-CN': () => import('./dictionaries/zh-CN.json').then((module) => module.default),
  'zh-TW': () => import('./dictionaries/zh-TW.json').then((module) => module.default),
  'en-US': () => import('./dictionaries/en-US.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
