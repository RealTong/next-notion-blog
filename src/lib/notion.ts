import { Client } from '@notionhq/client'
import {
  GetPageResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { PostListProps } from '../utils/types'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const databaseId = process.env.NOTION_DATABASE_ID

async function getLatestPostList(count = 10): Promise<PostListProps> {
  if (!databaseId) throw new Error('Database id is not defined')
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'published',
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: 'date',
        direction: 'descending',
      },
    ],
    page_size: count,
  })
  return response.results
}

async function getPosts(slug?: string): Promise<PostListProps> {
  const filterParam: any = {
    and: [
      {
        property: 'published',
        checkbox: {
          equals: true,
        },
      },
    ],
  }
  if (slug) {
    filterParam.and.push({
      property: 'slug',
      rich_text: {
        equals: slug,
      },
    })
  }
  if (!databaseId) throw new Error('Database id is not defined')
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: filterParam,
    sorts: [
      {
        property: 'date',
        direction: 'descending',
      },
    ],
  })
  return response.results
}

async function getPage(pageId: string): Promise<GetPageResponse> {
  return await notion.pages.retrieve({
    page_id: pageId,
  })
}

async function getBlocks(pageId: string): Promise<ListBlockChildrenResponse['results']> {
  let blocks: ListBlockChildrenResponse['results'] = []
  while (true) {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 20,
    })
    blocks = blocks.concat(response.results)
    if (!response.has_more) break
  }
  return blocks
}

export { getLatestPostList, getPosts, getPage, getBlocks }
