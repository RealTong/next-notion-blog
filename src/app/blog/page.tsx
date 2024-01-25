import {getPosts} from '../../lib/notion'
import Link from 'next/link'

export default async function Page() {
  const posts = await getPosts()
  return (
    <div className={'mx-auto'}>
      {posts.map((post) => {
        if ('properties' in post) {
          const { date, author, slug, preview, name } = post.properties
          const postPage: {
            title?: string
            slug?: string
            preview?: string
            author?: string
            date?: string
          } = {}
          if (name.type === 'title') {
            postPage['title'] = name.title[0].plain_text
          }
          if (slug.type === 'rich_text') {
            postPage['slug'] = slug.rich_text[0].plain_text
          }
          if (preview.type === 'rich_text') {
            postPage['preview'] = preview.rich_text[0].plain_text
          }
          if (author.type === 'people') {
            postPage['author'] = author.people[0].person.name
          }
          if (date.type === 'date') {
            postPage['date'] = date.date?.start
          }

          return (
            <div className="border-b py-4 gap-2 flex flex-col" key={post.id}>
              <div className="text-gray-500 text-base">{postPage.date}</div>
              <div className="text-gray-900 font-bold text-2xl">{postPage.title}</div>
              {/* <div className="flex flex-row gap-2">
                <div className="text-[#4572E1]">DIY</div>
                <div className="text-[#4572E1]">Notion</div>
              </div> */}
              <div className="text-gray-500">{postPage.preview}</div>
              <Link href={`/blog/${postPage.slug? postPage.slug:''}`} className='flex flex-row items-center gap-1 cursor-pointer'>
                <p className=''>Read more</p>
                <div className='i-bi-arrow-right'></div>
              </Link>
            </div>
          )
        }
      })}
    </div>
  )
}
