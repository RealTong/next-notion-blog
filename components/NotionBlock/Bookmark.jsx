import { FiLink, FiLink2 } from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'

const Bookmark = ({ value }) => {
  const { url } = value
  const { data, error } = useSWR(url, previewFetcher)

  if (error)
    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="dark:bg-dark-400 hover:bg-light-200 dark:hover:bg-dark-700 relative flex h-28 cursor-pointer items-end overflow-hidden rounded border border-gray-400/50 bg-gray-200 p-2 text-gray-600 dark:text-gray-400"
      >
        <div>
          <FiLink size={16} className="mr-2 inline" />
          <span className="truncate">{url}</span>
        </div>

        <span className="absolute top-0 right-0 truncate font-mono text-6xl font-black tracking-widest opacity-10">
          <FiLink2 className="mr-2 inline" />
          <span>{url}</span>
        </span>
      </Link>
    )

  if (!data)
    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:bg-light-200 dark:hover:bg-dark-700 grid h-28 cursor-pointer grid-cols-3 overflow-hidden rounded border border-gray-400/50 text-gray-600 dark:text-gray-400"
      >
        <div className="col-span-3 flex flex-col space-y-3 p-2 sm:col-span-2">
          <div className="dark:bg-dark-400 h-5 animate-pulse rounded bg-gray-200" />
          <div className="dark:bg-dark-400 flex-1 animate-pulse rounded bg-gray-200" />
          <div className="truncate text-sm opacity-70">
            <FiLink size={16} className="mr-2 inline" />
            <span>{url}</span>
          </div>
        </div>
        <div className="dark:bg-dark-400 hidden h-28 animate-pulse overflow-hidden bg-gray-200 sm:block" />
      </Link>
    )

  const { title, description, favicon, open_graph } = data
  const images = open_graph?.images ?? []

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="primary-text hover:bg-light-200 dark:hover:bg-dark-700 grid h-28 cursor-pointer grid-cols-3 justify-between overflow-hidden rounded border border-gray-400/50 no-underline"
    >
      <div className="col-span-3 flex flex-shrink flex-col overflow-hidden p-2 sm:col-span-2">
        <div className="mb-1 h-6 truncate text-sm font-bold leading-6">{title}</div>
        <div className="mb-1 h-10 overflow-hidden text-ellipsis text-sm leading-5 opacity-80">{description}</div>
        <div className="flex h-6 items-center space-x-2 overflow-hidden truncate text-sm opacity-70">
          {favicon ? <Image src={favicon} className="h-4 w-4" alt="favicon" /> : <FiLink size={17} />}
          <span className="translate-y-0.5 transform overflow-hidden truncate leading-6">{url}</span>
        </div>
      </div>
      {images && images.length > 0 && (
        <div className="hidden overflow-hidden rounded border-l border-gray-400/50 sm:block">
          <Image src={images[0].url} alt={title} className="m-0 h-28 w-full rounded border-gray-400/50 object-cover object-center" />
        </div>
      )}
    </Link>
  )
}

export default Bookmark
