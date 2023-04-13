import { Client } from '@notionhq/client'

const notion = new Client({ auth: import.meta.env.NOTION_API_KEY })
const databaseId = import.meta.env.NOTION_DATABASE_ID

async function getLatestPostList(count) {
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

async function getPosts(slug) {
  const filterParam = {
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

async function getPage(pageId) {
  return await notion.pages.retrieve({
    page_id: pageId,
  })
}

async function getBlocks(pageId) {
  let cursor
  let blocks = []
  while (true) {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 20,
    })
    cursor = response.next_cursor
    blocks = blocks.concat(response.results)
    if (!response.has_more) break
  }
  return blocks
}

export { getLatestPostList, getPosts, getPage, getBlocks }
