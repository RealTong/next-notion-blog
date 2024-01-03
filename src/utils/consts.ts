import { Author } from 'next/dist/lib/metadata/types/metadata-types'

export const AuthorRealTong: Author = {
  name: 'RealTong',
  url: 'https://github.com/RealTong',
}
export const locales = ['en-US', 'zh-CN', 'zh-TW']
export const GitHubUsername = process.env.GITHUB_USERNAME || 'RealTong'
