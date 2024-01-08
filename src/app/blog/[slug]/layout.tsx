import type {Metadata} from 'next'
import {AuthorRealTong} from '../../../utils/consts'
import '../globals.css'
import {makeConsoleLogger} from "@notionhq/client/build/src/logging";

export const metadata: Metadata = {
  title: "RealTong's Blog",
  description: "RealTong's Blog",
  keywords: ['RealTong', 'Blog', 'Notion', 'Next.js', 'TailwindCSS', 'NotionCMS'],
  authors: AuthorRealTong,
}

export default function RootLayout({children, params}: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <html lang={params.lang}>
    <body>{children}</body>
    </html>
  )
}
