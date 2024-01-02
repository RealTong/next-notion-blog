import {TbBrandBilibili, TbBrandDiscord, TbBrandFigma, TbBrandGithub, TbBrandInstagram} from 'react-icons/tb'
import {BsTwitterX} from "react-icons/bs";
import {HiOutlineMail} from 'react-icons/hi'
import Link from 'next/link'
import {getDictionary} from "../locale/dictionaries";

const brandList = [
  {
    brandIcon: <HiOutlineMail/>,
    brandName: 'Email',
    link: 'mailto:i@realtong.cn',
    css: 'hover:bg-[#34A853]',
  },
  {
    brandIcon: <TbBrandGithub/>,
    brandName: 'Github',
    link: 'https://github.com/RealTong',
    css: 'hover:bg-[#000000]',
  },
  {
    brandIcon: <TbBrandFigma/>,
    brandName: 'Figma',
    link: 'https://www.figma.com/@wulanren',
    css: 'hover:bg-[#F24E1E]',
  },
  {
    brandIcon: <BsTwitterX/>,
    brandName: 'Twitter X',
    link: 'https://x.com/RealTong_run',
    css: 'hover:bg-[#000000]',
  },
  {
    brandIcon: <TbBrandInstagram/>,
    brandName: 'Instagram',
    link: 'https://www.instagram.com/realtong_run/',
    css: 'hover:bg-[#d6249f]',
  },
  {
    brandIcon: <TbBrandDiscord/>,
    brandName: 'Discord',
    link: 'https://discord.gg/SF9TqBnNSJ',
    css: 'hover:bg-[#7289DA]',
  },
  {
    brandIcon: <TbBrandBilibili/>,
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
        {brandList.map((brand, index) => {
          return (
            <Link
              key={index}
              href={brand.link}
              target={'_blank'}
              className={`decoration-none relative mr-2 mb-2 flex flex-row flex-nowrap rounded-md bg-gray-50 p-2 leading-[1rem] transition-colors hover:text-white dark:bg-gray-50/10 ${brand.css}`}
            >
              {brand.brandIcon}
              <span className={'ml-1 hidden md:block'}>{brand.brandName}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
