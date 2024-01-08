import type { Metadata } from 'next'
import { AuthorRealTong } from '../../utils/consts'
import Header from '../../components/blog/Header'
import '../globals.css'

export const metadata: Metadata = {
  title: "RealTong's Blog",
  description: "RealTong's Blog",
  keywords: ['RealTong', 'Blog', 'Notion', 'Next.js', 'TailwindCSS', 'NotionCMS'],
  authors: AuthorRealTong,
}

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  console.log('RootLayout', params)
  return (
    <html lang={params.lang}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
