import { BiMenu, BiRss } from 'react-icons/bi'
import { useState } from 'react'
import Link from 'next/link'

const Links = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Blog',
    href: '/blog',
  },
  {
    name: <BiRss className={'inline text-[22px]'} />,
    href: '/feed',
  },
]

function Header() {
  const [menuClassName, setMenuClassName] = useState('hidden')

  function menuClick() {
    if (menuClassName === 'hidden') {
      setMenuClassName('absolute top-8 right-6')
    } else {
      setMenuClassName('hidden')
    }
  }

  return (
    <div
      className={
        'sticky top-0 z-10 flex h-12 w-full flex-row justify-between bg-white/30 pl-3 text-2xl backdrop-blur-lg dark:bg-gray-900/30 dark:text-gray-300 2xl:mx-auto 2xl:max-w-5xl'
      }
    >
      <div>
        <Link href="/">
          <img src="/avatar.jpg" alt="" className={'block h-full rounded-full dark:hidden'} />
        </Link>
        <Link href="/">
          <img src="/avatar.png" alt="" className={'hidden h-full rounded-full dark:block'} />
        </Link>
      </div>

      <div className={'relative flex h-full md:w-1/4'}>
        <button onClick={menuClick} className={'md:hidden'}>
          <BiMenu />
        </button>
        <div className={`flex flex-col ${menuClassName} md:flex md:w-full md:flex-row md:items-center md:justify-between`}>
          {Links.map((link, index) => {
            return (
              <Link
                href={link.href}
                key={index}
                className={
                  'flex h-10 w-24 items-center border bg-white pl-2 text-left text-base hover:text-gray-400 dark:bg-[#212121] md:w-16 md:border-0 md:bg-transparent md:dark:bg-transparent'
                }
              >
                {link.name}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Header
