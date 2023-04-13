import Link from 'next/link'

function Post({ slug, title, preview, date, author, tag }) {
  return (
    <div className={'weiKaiFont my-6 block border transition-shadow hover:shadow-md'}>
      <Link href={`/blog/${slug}`} target={'_self'} className={'text-1xl block p-4 font-bold'}>
        {title}
      </Link>
      <div className={'text-md flex flex-col border-t bg-gray-50 p-4 dark:bg-stone-900 dark:text-gray-300'}>
        <p>{preview}</p>
        <p className={'mt-1 text-[14px] text-gray-400'}>
          {date} · {author} · {tag}
        </p>
      </div>
    </div>
  )
}

export default Post
