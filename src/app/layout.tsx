import type {Metadata} from 'next'
import {AuthorRealTong} from "../utils/consts";
import './globals.css'

export const metadata: Metadata = {
  title: "RealTong's Home",
  description: "RealTong's Site",
  keywords: ['RealTong', 'Blog', 'Notion', 'Next.js', 'TailwindCSS', 'NotionCMS'],
  authors: AuthorRealTong,
}

export default function RootLayout({children, params}: { children: React.ReactNode, params: { lang: string } }) {
  return (
    <html lang={params.lang}>
    <body>{children}</body>
    </html>
  )
}
