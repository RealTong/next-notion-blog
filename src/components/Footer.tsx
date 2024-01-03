import Link from 'next/link'
import { locales } from '../utils/consts'
import { getDictionary } from '../locale/dictionaries'

async function Footer() {
  const i18n = await getDictionary('en-US')

  const toggleTheme = () => {
    const html = document.querySelector('html')
    if (!html) return
    html.classList.toggle('dark')
  }
  return (
    <footer className={'mx-auto mt-10 flex w-full max-w-5xl'}>
      <p className={`w-full text-left`}>
        {i18n.footer.copyright}{' '}
        <Link href="https://realtong.cn" className="underline">
          Tong
        </Link>
        {` \u00A9 ${new Date().getFullYear()}`}. {i18n.footer.design_by}{' '}
        <Link href="https://ddiu.io/" className="underline hover:text-[#789388]">
          ddiu.io
        </Link>
      </p>
      <div className={'flex w-full flex-row-reverse'}>
        <select
          defaultValue={'en-US'}
          className={'focus:shadow-outline block cursor-pointer appearance-none rounded bg-transparent px-4 leading-tight focus:outline-none'}
        >
          {locales.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <button className={'rounded border-gray-300 p-2 text-2xl leading-tight'} aria-label={'主题切换器'}>
        {/*<CgDarkMode />*/}
      </button>
    </footer>
  )
}

export default Footer
