import Link from 'next/link'
import { CgDarkMode } from 'react-icons/cg'
import { useI18n } from '../pages/_app'
import { useRouter } from 'next/router'

function Footer() {
  const router = useRouter()
  const { locale, locales } = router
  const i18n = useI18n()

  function handleLanguageChange(e) {
    const lang = e.target.value
    router.push(router.asPath, router.asPath, { locale: lang })
  }

  const toggleTheme = () => {
    const html = document.querySelector('html')
    html.classList.toggle('dark')
  }
  return (
    <footer className={'mt-10 flex'}>
      <p className={`w-full text-left`}>
        {i18n.footer.copyright}{' '}
        <Link href="https://realtong.cn" className="underline">
          Tong
        </Link>
        {` \u00A9 ${getYear()}`}. {i18n.footer.design_by}{' '}
        <Link href="https://ddiu.io/" className="underline hover:text-[#789388]">
          ddiu.io
        </Link>
      </p>
      <div className={'flex w-full flex-row-reverse'}>
        <select
          value={locale}
          onChange={handleLanguageChange}
          className={'focus:shadow-outline block cursor-pointer appearance-none rounded bg-transparent px-4 leading-tight focus:outline-none'}
        >
          {locales.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <button className={'rounded border-gray-300 p-2 text-2xl leading-tight'} onClick={toggleTheme} aria-label={'主题切换器'}>
        <CgDarkMode />
      </button>
    </footer>
  )
}

function getYear() {
  return new Date().getFullYear()
}

export default Footer
