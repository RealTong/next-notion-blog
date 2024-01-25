import {Client} from '@notionhq/client'
import {
  GetPageResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints'
import {PostListProps} from '@/utils/types'

const notion = new Client({auth: process.env.NOTION_API_KEY})
const databaseId = process.env.NOTION_DATABASE_ID

function getRandomInt(minimum, maximum) {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * 获取最新的文章列表
 * @param count
 */
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

/**
 * 获取所有文章列表
 * @param slug
 */
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
    page_size: 100,
  })
  return response.results
}

async function getPageFromSlug(slug: string): Promise<GetPageResponse> {
  if (!databaseId) throw new Error('Database id is not defined')
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'slug',
      rich_text: {
        equals: slug,
      },
    },
  })
  if (response?.results?.length) {
    return await notion.pages.retrieve({
      page_id: response.results[0].id,
    })
  }
  return new Promise((resolve, reject) => {
    reject('Page not found')
  })
}

async function getBlocks(blockID: string): Promise<ListBlockChildrenResponse['results']> {
  const blockId = blockID.replaceAll('-', '');

  const { results } = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });

  // Fetches all child blocks recursively
  // be mindful of rate limits if you have large amounts of nested blocks
  // See https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = results.map(async (block) => {
    if ('has_children' in block && block.has_children) {
      const children = await getBlocks(block.id);
      return { ...block, children };
    }
    return block;
  });

  return Promise.all(childBlocks).then((blocks) => blocks.reduce((acc, curr) => {
    if ('type' in curr && curr.type === 'bulleted_list_item') {
      // @ts-ignore
      if (acc[acc.length - 1]?.type === 'bulleted_list') {
        // @ts-ignore
        acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
      } else {
        // @ts-ignore
        acc.push({
          id: getRandomInt(10 ** 99, 10 ** 100).toString(),
          type: 'bulleted_list',
          bulleted_list: {children: [curr]},
        });
      }
      // @ts-ignore
    } else if (curr.type === 'numbered_list_item') {
      // @ts-ignore
      if (acc[acc.length - 1]?.type === 'numbered_list') {
        // @ts-ignore
        acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
      } else {
        // @ts-ignore
        acc.push({
          id: getRandomInt(10 ** 99, 10 ** 100).toString(),
          type: 'numbered_list',
          numbered_list: {children: [curr]},
        });
      }
    } else {
      // @ts-ignore
      acc.push(curr);
    }
    return acc;
  }, []));
}

export {getLatestPostList, getPosts, getPageFromSlug, getBlocks}
