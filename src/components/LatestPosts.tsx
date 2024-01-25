import Link from 'next/link'
import { getDictionary } from '../locale/dictionaries'
import { getLatestPostList } from '@/lib/notion'

function Post({ title, link, date }, key) {
  return (
    <Link
      href={`/blog/${link}`}
      target={'_self'}
      key={key}
      className={'flex justify-between rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-neutral-600'}
    >
      <p className={'weiKaiFont md:w-2/3 md:truncate'}>{title}</p>
      <p className={'hidden font-normal md:block'}>{date}</p>
    </Link>
  )
}

async function LatestPosts() {
  const i18n = await getDictionary('en-US')
  const latestPostList = await getLatestPostList(10)
  return (
    <>
      <div className={'my-4 flex w-full justify-between pb-4 text-3xl font-bold'}>
        <p>{i18n.index.latestPosts.title}</p>
        <Link
          href="/blog"
          target={'_self'}
          aria-label={'blog'}
          className={'text-neutral-800 transition-colors hover:text-neutral-600 dark:text-gray-300'}
        >
          {/*<FaFeather size={'24'} />*/}
        </Link>
      </div>
      <div>
        {latestPostList.map((post: any, index) => {
          const title = post.properties.name.title[0].plain_text
          const date = post.properties.date.date.start
          const link = post.properties.slug.rich_text[0].plain_text
          return <Post key={index} date={date} link={link} title={title} />
        })}
      </div>
    </>
  )
}

export default LatestPosts
