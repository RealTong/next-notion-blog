import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { ReactElement } from 'react'

export type PostListProps = QueryDatabaseResponse['results']

export interface IndexPageProps {
  latestPosts: PostListProps
}

export interface BlogPageProps {
  latestPosts: PostListProps
}

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
  name: string | ReactElement
  href: string
}

export interface BrandProps {
  brandIcon: string
  brandName: string
  link: string
  css: string
}
