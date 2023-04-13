import '../styles/globals.css'
import { createContext, useContext, useMemo } from 'react'
import zh_CN from '../locales/zh-CN'
import zh_TW from '../locales/zh-TW'
import en_US from '../locales/en-US'
import { useRouter } from 'next/router'

const I18nContext = createContext()

export function useI18n() {
  return useContext(I18nContext)
}

export default function App({ Component, pageProps }) {
  const isBrowser = typeof window !== 'undefined'
  if (isBrowser) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const html = document.querySelector('html')
      if (e.matches) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    })
  }
  const { locale } = useRouter()
  const i18n = useMemo(() => {
    switch (locale) {
      case 'zh-CN':
        return zh_CN
      case 'zh-TW':
        return zh_TW
      default:
        return en_US
    }
  }, [locale])
  return (
    <I18nContext.Provider value={i18n}>
      <Component {...pageProps} />
    </I18nContext.Provider>
  )
}
