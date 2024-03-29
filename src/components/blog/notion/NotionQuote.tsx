import {host} from "@/utils/consts";
import NotionText from "./NotionText";
import Link from "next/link";
import {unfurl} from "unfurl.js";

type Data = Awaited<ReturnType<typeof unfurl>>

const NotionQuote = async ({value}: {
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
      console.error('JSON Parse Error')
      config = ""
    }
    author = config.author
    link = config.link
  }

  // const previewFetcher = (url: string) => fetch(`/api/bookmark/${encodeURIComponent(url)}`).then(res => res.json())
  // const {data, error} = useSWRImmutable(link ?? null, previewFetcher)
  const ogData = await fetch(`${host}/api/bookmark/${encodeURIComponent(link ?? null)}`);
  const data = await ogData.json() as Data | null
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
    const {title, favicon, open_graph, oEmbed, twitter_card} = data
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
export default NotionQuote
