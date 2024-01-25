import type {Metadata} from 'next'
import {AuthorRealTong} from '@/utils/consts'
import Header from '@/components/blog/Header'
import '../globals.css'

export const metadata: Metadata = {
  title: "RealTong's Blog",
  description: "RealTong's Blog",
  keywords: ['RealTong', 'Blog', 'Notion', 'Next.js', 'TailwindCSS', 'NotionCMS'],
  authors: AuthorRealTong,
}

export default function RootLayout({children, params}: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <html lang={params.lang}>
    <body>
    <div className={'mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0'}>
      <div>
        <Header/>
        <div className={'space-y-2 pb-8 pt-6 md:space-y-5'}>
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">Latest</h1>
          <div className={'text-lg leading-7 text-gray-500 dark:text-gray-400'}>人生是部RPG，感谢各位NPC</div>
          <hr/>
        </div>
        {children}
      </div>
    </div>
    </body>
    </html>
  )
}
