'use client'

import Link from 'next/link'
import {CgDarkMode} from 'react-icons/cg'
import {ChangeEvent, useEffect, useState} from "react";
import {locales} from "../utils/consts";

async function getI18n(lang: string) {
  const data = await import(`../locale/dictionaries/${lang}.json`);
  return data;
}
function Footer() {
  // const i18n = await getDictionary('en-US')
  const [i18n,setI18n] = useState()
  useEffect(() => {
    const loadLocaleData = async (locale) => {
      const data = await import(`../locale/dictionaries/en-US.json`);
      setI18n(data);
    };

    loadLocaleData(navigator.language); // 确保你的 locales 文件名和 navigator.language 格式一致，或者做适当的转换
  }, []);

  function handleLanguageChange(e: ChangeEvent<HTMLSelectElement>) {
    const lang = e.target.value
    // router.push(pathname, {locale: lang})
  }

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
        {` \u00A9 ${getYear()}`}. {i18n.footer.design_by}{' '}
        <Link href="https://ddiu.io/" className="underline hover:text-[#789388]">
          ddiu.io
        </Link>
      </p>
      <div className={'flex w-full flex-row-reverse'}>
        <select
          value={'en-US'}
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
      <button className={'rounded border-gray-300 p-2 text-2xl leading-tight'} onClick={toggleTheme}
              aria-label={'主题切换器'}>
        <CgDarkMode/>
      </button>
    </footer>
  )
}

function getYear() {
  return new Date().getFullYear()
}

export default Footer
