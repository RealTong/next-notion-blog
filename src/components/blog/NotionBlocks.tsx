import {Colors} from "./NotionBlockColors";
import {Fragment} from "react";
import Image from "next/image";
import Link from "next/link";
import {host} from "../../utils/consts";
import {unfurl} from "unfurl.js";

interface IText {
  type: string
  text: {
    content: string
    link?: {
      url: string
    }
  }
  annotations: {
    bold: boolean
    code: boolean
    color: string
    italic: boolean
    strikethrough: boolean
    underline: boolean
  }
  plain_text: string
  href?: string
}

const previewFetcher = (url: string) => fetch(`/api/bookmark/${encodeURIComponent(url)}`).then(res => res.json())

export const getMediaCtx = (value: any) => {
  const src = value.type === 'external' ? value.external.url : value.file.url
  const expire = value.type === 'file' ? value.file.expiry_time : null
  const caption = value.caption ? value.caption : []

  return {src, caption, expire}
}

const NotionText = ({text, inheritColor}: {
  text: any,
  inheritColor?: boolean
}) => {
  if (!text) return null
  return text.map((value, index: number) => {
    const {
      annotations: {bold, code, color, italic, strikethrough, underline},
      text,
    } = value

    const className = [
      bold ? 'font-semibold' : '',
      code ? `font-mono text-sm px-1 bg-light-600 rounded-md px-2 py-0.5 ${Colors["purple"]?.text.normal} dark:bg-dark-600` : '',
      italic ? 'italic' : '',
      strikethrough ? 'line-through' : '',
      underline ? 'underline' : '',
      Colors[color]?.text.normal ?? '',
      color.endsWith('background') ? Colors[color.replace('_background', '')]?.bg.normal : ''
    ]

    return (
      <span key={index}
            className={`${text.content.indexOf('\n') > -1 ? 'whitespace-pre-line' : ''} ${className.join('') !== '' ? className.join(' ') : ''}`}
      >
                {text.link ? (
                  <a
                    className={`transition-all duration-200 ease-in-out bg-bottom bg-no-repeat bg-no-underline-size hover:bg-underline-size  bg-underline ${inheritColor ? "inherit font-semibold" : text.content.startsWith('@') ? Colors["blue"]?.text.normal : Colors["orange"]?.text.normal}`}
                    // after="content-↗"
                    href={text.link.url} target="_blank" rel="noopener noreferrer">
                    {text.content}
                  </a>
                ) : (
                  text.content
                )}
            </span>
    )
  })
}


const Heading1 = ({value}: any) => {
  return (
    <h1 className={'mt-12 mb-5 text-2xl font-bold leading-7 snap-mt-20'}>
      <NotionText text={value.rich_text}/>
    </h1>
  )

}

const Heading2 = ({value}: any) => {
  return (
    <h2 className={'mt-5 mb-4 text-xl font-bold leading-7 snap-mt-16'}>
      <NotionText text={value.rich_text}/>
    </h2>
  )
}

const Heading3 = ({value}: any) => {
  return (
    <h3 className={'mt-4 mb-3 text-lg font-bold leading-7 snap-mt-16'}>
      <NotionText text={value.rich_text}/>
    </h3>
  )
}

const Paragraph = ({value}: any) => {
  return (
    <p className="my-4 font-light leading-7">
      <NotionText text={value.rich_text}/>
    </p>
  )
}

const BulletedListItem = ({value}: any) => {
  return (
    <ul className="ml-5 my-2 list-disc list-outside font-light">
      <li>
        <NotionText text={value.rich_text}/>
        {value.children?.map((block: any) => (
          <Fragment key={block.id}><NotionBlockRender block={block}/></Fragment>
        ))}
      </li>
    </ul>
  )
}
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
                <NotionBlockRender block={block}/>
              </Fragment>
            ))}
          </section>
        )
      })}
    </div>
  )
}
const NotionImage = ({value}: any) => {
  let {src: imageSrc, caption: imageCaption, expire} = getMediaCtx(value)

  // Temporary solution for nested images in column_list

  // if (typeof (value.size === undefined)) {
  //     value.size = { width:0, height:0}
  // }

  // const {
  //   size: { width, height },
  // } = value
  const width = value.width || 256
  const height = value.height || 256

  // const [loaded, setLoaded] = useState(false);
  // const handleLoad = (event: any) => {
  //     event.persist();
  //     if (event.target.srcset) {
  //         setLoaded(true);
  //     }
  // };

  imageSrc = imageSrc.split('?')[0]

  return (
    <figure className="mx-auto my-6 max-w-11/12 rounded-2xl" data-aos="fade-up" data-aos-duration="800">
      <div
        className={`${expire === null ? "flex justify-center" : ""} transition-all duration-800 ease-in-out rounded-2xl overflow-hidden relative w-full h-full`}
        // style={{
        //     opacity: loaded ? 1 : 0,
        //     transition: "opacity 1.1s cubic-bezier(0.4, 0, 0.25, 1) 0ms, background 400ms cubic-bezier(0.4, 0, 0.25, 1) 0ms",
        // }}
      >
        {width && height ? (
          expire === null ?
            value.blur ?
              <Image className="rounded-2xl overflow-hidden" src={imageSrc} alt={imageCaption} width={width}
                     height={height}
                     placeholder="blur"
                     blurDataURL={value.blur}
                // onLoad={handleLoad}
              /> : <Image className="rounded-2xl overflow-hidden" src={imageSrc} alt={imageCaption} width={width}
                          height={height}/> :
            <img className="rounded-2xl overflow-hidden" src={imageSrc} alt={imageCaption} width={width}
                 height={height}/>
        ) : (
          <img className="rounded-2xl overflow-hidden" src={imageSrc} alt={imageCaption}/>
        )}
      </div>
      {imageCaption.length !== 0 && (
        <figcaption>
          <div className="my-2 text-sm text-center opacity-50 dark:opacity-70">
            {<NotionText text={imageCaption}/>}
          </div>
        </figcaption>
      )}
    </figure>
  )
}

const NotionVideo = ({value}: {
  value: any
}) => {
  const {src: videoSrc, caption: videoCaption} = getMediaCtx(value)

  return (
    <div className="my-6 overflow-hidden" data-aos="fade-up" data-aos-duration="800">
      <video className="rounded-2xl" src={videoSrc + '#t=0.01'} controls/>
      {videoCaption.length !== 0 && (
        <p className="my-2 text-center opacity-80">{<NotionText text={videoCaption}/>} </p>)}
    </div>
  )
}
const NotionQuote = ({value}: {
  value: any
}) => {

  let config = value.rich_text[0]
  // Dirty custom, Notion quote format: italic-> {"author":"xxx",link:"xxx"}xxxx
  let author, link
  if (/\{([^)]+)\}/.test(config.text.content)) {

    // Escape stupid Notion smart quotes and apostrophes (https://twitter.com/NotionHQ/status/1475513053617823744)
    try {
      config = JSON.parse(config.text.content.replaceAll(/“|”|’|‘|'/ig, '"'))
    } catch (error) {
      config = ""
    }
    author = config.author
    link = config.link
  }

  // const previewFetcher = (url: string) => fetch(`/api/bookmark/${encodeURIComponent(url)}`).then(res => res.json())
  // const {data, error} = useSWRImmutable(link ?? null, previewFetcher)
  const data = {
    title: "", description: "", favicon: "", open_graph: {
      images: [{url: ""}]
    }, oEmbed: {
      thumbnails: [{url: ""}]
    }, twitter_card: {
      images: [{url: ""}]
    }
  }
  const error = {}

  if (!link || error) {
    return (
      <div className="py-4 my-4 flex rounded-2xl
            text-true-gray-500 justify-center md:w-9/10 mx-auto dark:text-true-gray-400 before:content-['❞'] before:w-10 before:text-4xl before:font-bold before:leading-8">
        <div className="leading-1">
          <blockquote
            className="text-xl font-bold leading-7 text-true-gray-900 after:content-['❞'] after:text-true-gray-500 after:dark:text-true-gray-400 dark:text-true-gray-50">
            <NotionText text={author ? value.rich_text.slice(1) : value.rich_text}/>
          </blockquote>

          {author && <div className="font-light leading-4">
            {author}
          </div>}
        </div>
      </div>
    )
  } else {
    if (!data)
      return (
        <div
          className="bg-light-300 my-4 flex rounded-2xl text-true-gray-500 justify-center flex-col dark:bg-dark-300 dark:text-true-gray-400 before:content-['❝'] before:w-10 before:text-4xl before:font-bold before:p-3 before:pb-0">
          <div className="leading-1">
            <blockquote
              className="pt-0 p-3 text-xl font-bold leading-7 text-true-gray-900 dark:text-true-gray-50 after:content-['❞'] after:text-true-gray-500 after:dark:text-true-gray-400">
              <NotionText text={(author || link) ? value.text.slice(1) : value.text}/>
            </blockquote>
          </div>
          {(author || link) &&
              <div
                  className="rounded-b-2xl p-3 bg-light-600 font-light leading-4 flex justify-between dark:bg-dark-600">
                  <div className="flex flex-col justify-between">
                      <div
                          className="rounded-lg bg-light-800 text-sm line-clamp-1 truncate font-semibold w-50 h-5 animate-pulse dark:bg-dark-800"/>
                      <div
                          className="text-true-gray-400 text-0.8em line-clamp-1 truncate font-normal pb-0.5">{author}</div>
                  </div>
                  <div className="rounded-lg animate-pulse bg-light-800 h-12 w-12 dark:bg-dark-800"/>
              </div>}
        </div>
      )
    const {title, description, favicon, open_graph, oEmbed, twitter_card} = data
    const images = open_graph?.images ?? twitter_card?.images ?? oEmbed?.thumbnails ?? []

    return (
      <div className="bg-light-300 my-4 flex rounded-2xl
            text-true-gray-500 justify-center flex-col dark:bg-dark-300 dark:text-true-gray-400 before:content-['❞'] before:w-10 before:text-4xl before:font-bold before:p-3 before:pb-0">
        <div className="leading-1">
          <blockquote
            className="pt-0 p-3 text-xl font-bold leading-7 text-true-gray-900 dark:text-true-gray-50 after:content-['_❞'] after:text-true-gray-500 after:dark:text-true-gray-400">
            <NotionText text={(author || link) ? value.text.slice(1) : value.text}/>
          </blockquote>
        </div>
        {(author || link) &&
            <div
                className="rounded-b-2xl p-3 bg-light-600 font-light leading-4 hover:(filter brightness-90) transition duration-300 ease-in-out dark:bg-dark-600">
                <Link href={link}>
                    <div className="flex justify-between">
                        <div className="flex flex-col justify-between <sm:max-w-8/10 pr-1">
                            <div
                                className="text-true-gray-600 text-sm line-clamp-2 leading-4 mb-1 font-semibold dark:text-true-gray-200">{title}</div>
                            <div
                                className="text-true-gray-400 text-0.8em truncate font-normal pb-0.5 ">{author && author + ' | '}{new URL(link).hostname}↗
                            </div>
                        </div>
                      {images && images.length > 0 && (
                        <div className=" rounded-lg overflow-hidden">
                          <img src={images[0].url} alt={title} className="object-cover h-12 w-12"/>
                        </div>
                      ) || (
                        <div className="flex justify-center items-center overflow-hidden rounded-xl bg-light-400">
                          <img className="rounded-lg h-10 w-10" src={favicon} alt="favicon"/>
                        </div>)}
                    </div>
                </Link>
            </div>
        }
      </div>
    )
  }
}

const NotionCallout = ({value}: {
  value: any
}) => {
  // read first bg color of text as callout background color
  let calloutBackgroundColor = value.color

  let calloutTextBgColor = value.rich_text[0].annotations.color

  calloutTextBgColor = calloutTextBgColor.endsWith('_background') ? calloutTextBgColor.replace('_background', '') : 'gray'

  calloutBackgroundColor = calloutBackgroundColor.endsWith('_background') ? calloutBackgroundColor.replace('_background', '') : 'gray'


  const icon = value.icon.emoji

  function iconTransformer(icon: any) {
    switch (icon) {
      case 'ℹ️':
        return <span className={'i-bi-info'}></span>
      // return <Info size={20} />
      case '⚠️':
        return <span className={'i-bi-alarm'}></span>
      case '🔔':
        return <span className={'i-bi-bell'}></span>
      // return <AlertTriangle size={20} />
      default:
        return <span className={'i-bi-info'}></span>
    }
  }

  return (
    <p
      className={`flex p-5 my-4 space-x-3 rounded-2xl ${Colors[calloutBackgroundColor].bg.normal} ${Colors[calloutBackgroundColor].text.normal}`}>
            <span className="flex items-center">
                {iconTransformer(icon)}
            </span>
      <span>
                <NotionText text={value.text} inheritColor={true}/>
            </span>
    </p>
  )

}
type Data = Awaited<ReturnType<typeof unfurl>>
const NotionBookmark = ({value}: {
  value: any
}) => {
  let ogData:null|Data = null
  const {url} = value
  const encodeURL = encodeURIComponent(url)
  // const data = fetch(`${host}/api/bookmark/${encodeURL}`).then(res => res.json())
  const data = fetch(`${host}/api/bookmark/${encodeURL}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`获取 OG 失败`);
        // return null
      }
      return res.json()
    }).then(data => {
      if (data) {
        console.log("1a",ogData)
        ogData = data as Data;
        console.log("2a",ogData)
      } else {
        ogData = null;
      }
    })
    .catch(error => {
      // Handle network errors or thrown errors
      console.error('Fetch error:', error.message);
      ogData = null
    });


  // if (data)
  //   return (
  //     <a
  //       href={url}
  //       target="_blank"
  //       rel="noopener noreferrer"
  //       className="flex items-center p-2 space-x-2 transition-colors duration-300 ease-in-out border-none text-true-gray-600 rounded-2xl bg-true-gray-100 hover:bg-true-gray-200 my-4 dark:bg-true-gray-900 dark:text-true-gray-300 dark:hover:bg-true-gray-800">
  //       <span className={'i-bi-link'}></span>
  //       <span className="overflow-hidden truncate">{url}</span>
  //     </a>
  //   )

  console.log(ogData)
  if (!ogData) {
    return (
      <Link legacyBehavior href={url}>
        <a target="_blank" rel="noopener noreferrer">
          <div
            className="my-4 flex text-true-gray-600 bg-light-300 rounded-2xl cursor-pointer h-30 filter group-hover:brightness-90 transition duration-300 ease-in-out dark:bg-dark-300 dark:text-true-gray-300">
            <div className="w-full  animate-pulse flex">
              <div className="w-7/10 p-4 flex justify-between flex-col w-full overflow-hidden ">
                <div className="rounded-lg bg-true-gray-200 h-5 w-2/5 mb-1 dark:bg-true-gray-800"/>
                <div className="rounded-md bg-true-gray-200 h-4 w-3/5 mb-2 dark:bg-true-gray-800"/>
                <div className="flex-1"></div>
                <div className="flex items-center space-x-2  text-sm opacity-70">
                  <span className={'i-bi-link'}></span>
                  <span className="truncate">{url}</span>
                </div>
              </div>
              <div className=" rounded-r-2xl bg-light-500 h-full w-3/10 dark:bg-dark-500"/>
            </div>
          </div>
        </a>
      </Link>
    )
  }
  const {title, description, favicon, open_graph, oEmbed, twitter_card} = ogData
  // @ts-ignore
  const images = open_graph?.images ?? twitter_card?.images ?? oEmbed?.thumbnails ?? []

  return (

    <Link legacyBehavior href={url}>
      <a  target="_blank" rel="noopener noreferrer">
        <div
          className="my-4 flex text-true-gray-600 bg-light-300 rounded-2xl cursor-pointer h-30 transition duration-300 ease-in-out filter hover:brightness-90 dark:bg-dark-300 dark:text-true-gray-200">
          <div className="w-full flex">
            <div className="w-7/10 p-4 flex justify-between flex-col w-full overflow-hidden ">
              <div className="font-semibold mb-1 truncate">{title}</div>
              <div
                className="leading-4 line-clamp-2 text-sm text-true-gray-400 mb-2">{description ? description : open_graph?.description}</div>
              <div className="flex-1"></div>
              <div className="flex items-center space-x-2  text-sm text-true-gray-400">
                <img className="h-4 w-4 rounded" src={favicon.replace('http://', 'https://')} alt="favicon"/>
                {/* <FontAwesomeIcon icon={LinkIcon} /> */}
                <span className="truncate">{url}</span>
              </div>
            </div>
            {/* <div className="w-2/10 flex items-center overflow-hidden"> */}
            {images && images.length > 0 && (
              <div className=" rounded-r-2xl h-full w-3/10 overflow-hidden">
                <img src={images[0].url.replace('http://', 'https://')} alt={title}
                     className="object-cover h-full w-full"/>
              </div>
            ) || (
              <div
                className="flex justify-center items-center h-full w-3/10 overflow-hidden rounded-r-2xl bg-light-400 dark:bg-dark-400">
                <img className="rounded-full h-10 w-10" src={favicon.replace('http://', 'https://')} alt="favicon"/>

              </div>)}

            {/* </div> */}
          </div>
        </div>
      </a>
    </Link>
  )
}
const NotionBlockRender = ({block}: {
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
              <NotionBlockRender block={block}/>
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
                <NotionBlockRender block={block}/>
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
    default:
      return <div>{type} Not support</div>
  }

}
export default NotionBlockRender
