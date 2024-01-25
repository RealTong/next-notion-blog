import Link from 'next/link'
import {LinkProps} from '@/utils/types'

const Links: LinkProps[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Blog',
    href: '/blog',
  },
  {
    name: 'Workspace',
    href: '/workspace',
  },
]
const Buttons: any[] = [
  {
    name: 'RSS',
    href: '/feed',
    icon: 'i-bi-rss-fill'
  },
  {
    name: 'Dark Mode',
    href: '/dark',
    icon: 'i-bi-moon-fill'
  },
]

function Header() {
  return (
    <header className={'flex items-center justify-between py-10'}>
      <div></div>
      <div className={'flex items-center space-x-4 leading-5 sm:space-x-6'}>
        {Links.map((link, index) => {
          return (
            <Link href={link.href} key={index}>
              <div className='text-[#808080] hover:text-black hidden font-medium text-gray-900 dark:text-gray-100 sm:block'>{
                link.icon ? <div className={link.icon}></div> : link.name
              }</div>
            </Link>
          )
        })}
        {
          Buttons.map((button, index) => {
            return (
              <button className='flex flex-row items-center gap-1 cursor-pointer'
                      key={index}>
                <div className={button.icon}></div>
              </button>
            )
          })
        }
      </div>
    </header>
  )
}

export default Header
