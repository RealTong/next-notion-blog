import Text from './NotionBlock/Text'
import NotionImage, { getMediaCtx } from './NotionBlock/Image'
import Bookmark from './NotionBlock/Bookmark'
import { Fragment } from 'react'

function NotionRenderer({ block }) {
  switch (block.type) {
    case 'paragraph':
      return <Text text={block.paragraph.rich_text} />
    case 'heading_1':
      return <div className={'text-1xl font-bold'}>{block.heading_1.rich_text[0].plain_text}</div>
    case 'heading_2':
      return <div className={'text-2xl font-bold'}>{block.heading_2.rich_text[0].plain_text}</div>
    case 'heading_3':
      return <div className={'text-3xl font-bold'}>{block.heading_3.rich_text[0].plain_text}</div>
    case 'quote':
      return (
        <p className="rounded border-l-4 border-sky-300/40 bg-gray-50 p-4 dark:bg-gray-800/100">
          <Text text={block.quote.rich_text} />
        </p>
      )
    case 'code':
      return (
        <div
          className={'max-h-fit w-full overflow-auto bg-gray-900 p-4 text-sm selection:bg-gray-600'}
          dangerouslySetInnerHTML={{ __html: block.code.dom }}
        />
      )
    case 'bookmark':
      return <Bookmark value={value} />
    case 'bulleted_list_item':
      return (
        <ul>
          <li>
            <Text text={block.bulleted_list_item.rich_text} />
          </li>
        </ul>
      )
    case 'numbered_list_item':
      return (
        <ol>
          <li>
            <Text text={block.numbered_list_item.rich_text} />
            {block.numbered_list_item.children?.map((block) => (
              <Fragment key={block.id}>{NotionRenderer(block)}</Fragment>
            ))}
          </li>
        </ol>
      )
    case 'to_do':
      return (
        <div>
          <label htmlFor={block.id}>
            <input type="checkbox" id={id} defaultChecked={block.to_do.checked} /> <Text text={block.to_do.rich_text} />
          </label>
        </div>
      )
    case 'toggle':
      return (
        <details>
          <summary>
            <Text text={block.toggle.rich_text} />
          </summary>
          {block.toggle.children?.map((block) => (
            <Fragment key={block.id}>{NotionRenderer(block)}</Fragment>
          ))}
        </details>
      )
    case 'image':
      return <NotionImage value={block.image} />
    case 'video':
      const { src: videoSrc, caption: videoCaption } = getMediaCtx(block.video)
      return (
        <figure>
          <video src={videoSrc} loop muted autoPlay playsInline />
          <figcaption className="text-center">{videoCaption}</figcaption>
        </figure>
      )
    default:
      return <p className={"bg-rose-100 p-2 w-full rounded-lg"}>❌ Unsupported block 「{block.type}」❌</p>
  }
}

export default NotionRenderer
