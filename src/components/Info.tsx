import Link from 'next/link'
import { getDictionary } from '../locale/dictionaries'
import { BrandProps } from '../utils/types'

const brandList: BrandProps[] = [
  {
    brandIcon: 'i-simple-icons-gmail',
    brandName: 'Email',
    link: 'mailto:i@realtong.cn',
    css: 'hover:bg-[#34A853]',
  },
  {
    brandIcon: 'i-simple-icons-github',
    brandName: 'Github',
    link: 'https://github.com/RealTong',
    css: 'hover:bg-[#000000]',
  },
  {
    brandIcon: 'i-simple-icons-figma',
    brandName: 'Figma',
    link: 'https://www.figma.com/@wulanren',
    css: 'hover:bg-[#F24E1E]',
  },
  {
    brandIcon: 'i-simple-icons-x',
    brandName: 'Twitter X',
    link: 'https://x.com/RealTong_run',
    css: 'hover:bg-[#000000]',
  },
  {
    brandIcon: 'i-simple-icons-instagram',
    brandName: 'Instagram',
    link: 'https://www.instagram.com/realtong_run/',
    css: 'hover:bg-[#d6249f]',
  },
  {
    brandIcon: 'i-simple-icons-discord',
    brandName: 'Discord',
    link: 'https://discord.gg/SF9TqBnNSJ',
    css: 'hover:bg-[#7289DA]',
  },
  {
    brandIcon: 'i-simple-icons-bilibili',
    brandName: 'Bilibili',
    link: 'https://space.bilibili.com/195743150',
    css: 'hover:bg-[#FB7299]',
  },
]

export default async function Info() {
  const i18n = await getDictionary('en-US')
  return (
    <div className={'mt-20'}>
      <div className={'text-5xl font-bold'}>
        <p>👋</p>
        <p>{i18n.index.info.hello},</p>
        <p>{i18n.index.info.description}</p>
      </div>
      <div className={'mt-6 flex flex-col justify-between'}>
        <p>{i18n.index.info.identity}</p>
        <p>{i18n.index.info.hobby}</p>
        <p>{i18n.index.info.dream}</p>
      </div>
      <div className={'mt-2 flex h-full max-w-full flex-row flex-nowrap justify-start sm:flex-wrap'}>
        {brandList.map(({ link, brandName, brandIcon, css }, index) => {
          return (
            <Link
              key={index}
              href={link}
              target={'_blank'}
              className={`decoration-none relative mr-2 mb-2 flex flex-row flex-nowrap rounded-md bg-gray-50 p-2 leading-[1rem] transition-colors hover:text-white dark:bg-gray-50/10 ${css}`}
            >
              <p className={`${brandIcon}`}></p>
              <span className={`ml-1 hidden md:block`}>{brandName}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
