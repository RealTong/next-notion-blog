import {Fragment} from "react";
import NotionRender from "./NotionRender";

const ColumnList = ({block}: any) => {
  return (
    <div
      className={`grid my-2 gap-x-6`}
      style={{gridTemplateColumns: `repeat(${block.children.length}, minmax(0, 1fr))`}}
    >
      {block.children.map((column: any, index: any) => {
        const blocks = column.children ?? []
        return (
          <section key={index}>
            {blocks.map((block: any) => (
              <Fragment key={block.id}>
                <NotionRender block={block}/>
              </Fragment>
            ))}
          </section>
        )
      })}
    </div>
  )
}
export default ColumnList
