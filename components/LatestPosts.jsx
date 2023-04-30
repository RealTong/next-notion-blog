import { FaFeather } from 'react-icons/fa'
import Link from 'next/link'
import { useI18n } from '../pages/_app'

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
function LatestPosts({ latestPostList }) {
  const i18n = useI18n()
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
          <FaFeather size={'24'} />
        </Link>
      </div>
      <div>
        {latestPostList.map((post, index) => {
          return <Post key={index} date={post.date} link={post.link} title={post.title} />
        })}
      </div>
    </>
  )
}
export default LatestPosts
