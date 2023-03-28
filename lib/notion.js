import {Client} from "@notionhq/client"

const notion = new Client({auth: process.env.NOTION_KEY})
const databaseId = process.env.NOTION_DATABASE_ID

async function getPosts(slug) {
    const filterParam = {
        and: [{
            property: "published",
            checkbox: {
                equals: true
            }
        }]
    }
    if (slug) {
        filterParam.and.push({
            property: "slug",
            rich_text: {
                equals: slug
            }
        })
    }
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: filterParam,
        sorts: [
            {
                property: "date",
                direction: "descending"
            }
        ]
    });
    return response.results;
}

async function getPage(pageId) {
    return await notion.pages.retrieve({
        page_id: pageId
    });
}

async function getBlocks(pageId) {
    const response = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 50,
    });
    return response.results;
}

export {getPosts, getPage, getBlocks}