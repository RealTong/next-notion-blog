import {Client} from "@notionhq/client"

const notion = new Client({auth: process.env.NOTION_KEY})
const databaseId = process.env.NOTION_DATABASE_ID

export async function getPublishPosts() {
    try {
        return await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "published",
                checkbox: {
                    equals: true
                }
            },
            page_size: 5,
            sorts: [
                {
                    property: "date",
                    direction: "descending"
                }
            ]
        });
    } catch (error) {
        console.log("ERROR: " + error)
    }
}