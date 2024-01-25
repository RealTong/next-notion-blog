import {QueryDatabaseResponse} from '@notionhq/client/build/src/api-endpoints'

export type PostListProps = QueryDatabaseResponse['results']

export interface ProductProps {
  name: string
  type: string
  img: string
}

export interface ProjectProps {
  icon: string
  name: string
  description: string
  link: string
}

export interface BlogPostProps {
  slug: string
  title: string
  preview: string
  date: string
  author: string
  tag: string
}

export interface LinkProps {
  name: string
  href: string
  icon?: string
}

export interface BrandProps {
  brandIcon: string
  brandName: string
  link: string
  css: string
}
