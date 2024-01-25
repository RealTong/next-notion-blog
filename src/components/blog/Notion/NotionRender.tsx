import NotionText from "./NotionText";
import Heading1 from "./Heading1";
import Heading2 from "./Heading2";
import Heading3 from "./Heading3";
import Paragraph from "./Paragraph";
import BulletedListItem from "./BulletedListItem";
import ColumnList from "./ColumnList";
import NotionImage from "./NotionImage";
import NotionVideo from "./NotionVideo";
import {Fragment} from "react";
import NotionQuote from "./NotionQuote";
import NotionCallout from "./NotionCallout";
import NotionBookmark from "./NotionBookmark";
import NotionCode from "./NotionCode";

const NotionRender = ({block}: {
  block: any
}) => {
  const {type, id} = block
  const value = block[type]
  switch (block.type) {
    case 'heading_1':
      return <Heading1 value={value}/>
    case 'heading_2':
      return <Heading2 value={value}/>
    case 'heading_3':
      return <Heading3 value={value}/>
    case 'paragraph':
      return <Paragraph value={value}/>
    case 'bulleted_list':
      return <BulletedListItem value={value}/>
    case 'bulleted_list_item':
      return <BulletedListItem value={value}/>
    case 'column_list':
      // if (!block.has_children) return null
      if (!block.children) return null
      return <ColumnList block={block}/>
    case 'numbered_list_item':
      return <ol className="ml-5 my-1 list-decimal list-outside font-light">
        <li>
          <NotionText text={value.text}/>
          {value.children?.map((block: any) => (
            <Fragment key={block.id}>
              <NotionRender block={block}/>
            </Fragment>
          ))}
        </li>
      </ol>
    case 'toggle':
      return (
        <details className="bg-light-400 rounded-3xl pl-4 py-1 dark:bg-dark-400">
          <summary>
            <NotionText text={value.text}/>
          </summary>
          <div className="ml-16px">
            {value.children?.map((block: any) => (
              <Fragment key={block.id}>
                <NotionRender block={block}/>
              </Fragment>
            ))}
          </div>
        </details>
      )
    case 'child_page':
      return <p className="my-2">{value.title}</p>
    case 'image':
      return <NotionImage value={value}/>
    case 'video':
      return <NotionVideo value={value}/>
    case 'divider':
      return (
        <div className="py-4 flex align-center">
          <hr className="w-9/10 m-auto dark:border-true-gray-600"/>
        </div>
      )

    case 'quote':
      return (
        <NotionQuote value={value}/>
      )

    case 'callout':
      return (
        <NotionCallout value={value}></NotionCallout>
      )

    case 'bookmark':
      return <NotionBookmark value={value}/>
    case 'embed':
      return <iframe src={block.embed.url} className="w-full my-5 h-50"/>
    case 'code':
      return <NotionCode value={value}/>
    default:
      return <div>{type} Not support</div>
  }
}
export default NotionRender
