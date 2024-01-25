import NotionRender from "../../../components/blog/Notion/NotionRender";
import {getBlocks, getPageFromSlug} from "../../../lib/notion";

export default async function Page({params}: { params: { slug: string } }) {
  const page = await getPageFromSlug(params.slug)
  const blocks = await getBlocks(page?.id) as any;
  // dev 从 blocks.json 读取数据
  // const fs = require('fs')
  // const blocks = JSON.parse(fs.readFileSync('./blocks.json', 'utf8'))
  // 如果 blocks 是空的，就不渲染 跳转到 404
  if (blocks.length === 0) {
    return (
      <div>404</div>
    )
  }
  return (
    <>
      {
        blocks.map((block: any) => {
          return <NotionRender key={block.id} block={block}/>
        })
      }
    </>
  )
}
