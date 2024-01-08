import Link from 'next/link'
import { LinkProps } from '../../utils/types'

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
  {
    name: 'RSS',
    href: '/feed',
    icon: 'i-bi-rss'
  },
]

function Header() {
  return (
    <div className={'w-full h-14 items-center flex flex-row gap-4 justify-end'}>
      {Links.map((link, index) => {
        return (
          <Link href={link.href} key={index}>
            <div className='text-[#808080] hover:text-black'>{
              link.icon ? <div className={link.icon}></div> : link.name
            }</div>
          </Link>
        )
      })}
    </div>
  )
}

export default Header
