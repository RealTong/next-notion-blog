import {host} from "@/utils/consts";
import Link from "next/link";
import {unfurl} from "unfurl.js";


type Data = Awaited<ReturnType<typeof unfurl>>

const NotionBookmark = async ({value}: {
  value: any
}) => {
  const {url} = value
  const encodeURL = encodeURIComponent(url)
  // const data = fetch(`${host}/api/bookmark/${encodeURL}`).then(res => res.json())
  // const data = fetch(`${host}/api/bookmark/${encodeURL}`)
  //   .then(res => {
  //     return res.json()
  //   })

  const ogResponse = await fetch(`${host}/api/bookmark/${encodeURL}`)
  const data = await ogResponse.json() as Data | null



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

  if (!data) {
    return (
      <Link href={url}>
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
      </Link>
    )
  }
  const {title, description, favicon, open_graph, oEmbed, twitter_card} = data
  // @ts-ignore
  const images = open_graph?.images ?? twitter_card?.images ?? oEmbed?.thumbnails ?? []
  return (
    <Link href={url}>
      <div
        className="my-4 flex text-true-gray-600 bg-light-300 rounded-2xl cursor-pointer h-30 transition duration-300 ease-in-out filter hover:brightness-90 dark:bg-dark-300 dark:text-true-gray-200">
        <div className="w-full flex">
          <div className="w-7/10 p-4 flex justify-between flex-col w-full overflow-hidden ">
            <div className="font-semibold mb-1 truncate">{title}</div>
            <div
              className="leading-4 line-clamp-2 text-sm text-true-gray-400 mb-2">{description ? description : open_graph?.description}</div>
            <div className="flex-1"></div>
            <div className="flex items-center space-x-2  text-sm text-true-gray-400">
              <img className="h-4 w-4 rounded" src={favicon?.replace('http://', 'https://')} alt="favicon"/>
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
              <img className="rounded-full h-10 w-10" src={favicon?.replace('http://', 'https://')} alt="favicon"/>
            </div>)}

          {/* </div> */}
        </div>
      </div>
    </Link>
  )
}

export default NotionBookmark
