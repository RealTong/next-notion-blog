import {indexGenerator, rnrSlugify} from '@9gustin/react-notion-render'
import NotionRender from "../../../components/blog/Notion/NotionRender";

const TableOfContents = ({blocks}) => {
  return (
    <>
      Table of contents:
      <ul>
        {
          indexGenerator(blocks).map(({id, plainText, type}) => (
            <li key={id}>
              <a href={`#${rnrSlugify(plainText)}`}>
                {plainText}
              </a>
            </li>
          ))
        }
      </ul>
    </>
  )
}
export default async function Page({params}: { params: { slug: string } }) {
  // const page = await getPageFromSlug(params.slug)
  // const blocks = await getBlocks(page?.id) as any;
  const fs = require('fs')
  // 从 blocks.json 读取数据
  const blocks = JSON.parse(fs.readFileSync('./blocks.json', 'utf8'))
  // console.log(blocks)
  // 如果 blocks 是空的，就不渲染 跳转到 404
  if (blocks.length === 0) {
    return (
      <div>404</div>
    )
  }
  return (
    <>
      {/*<TableOfContents blocks={blocks}/>*/}
      {/*<Render blocks={blocks} useStyles={true} emptyBlocks={true} classNames={true}/>*/}
      {
        blocks.map((block: any) => {
          return <NotionRender key={block.id} block={block}/>
        })
      }
    </>
  )
}
