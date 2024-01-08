import { getPosts } from '../../lib/notion'
import post from '../../components/blog/Post'

export default async function Page() {
  const posts = await getPosts()
  return (
    <div className={'flex flex-col max-w-3xl m-auto'}>
      {posts.map((post) => {
        console.log(post)
        if ('properties' in post) {
          const { date, author, slug, preview, name } = post.properties
          return (
            <div className="border-b py-4" key={post.id}>
              <div className="text-gray-500 text-base">January 8, 2023</div>
              <div className="text-gray-900 font-bold text-2xl">RealTong's Changelog for 2023</div>
              <div className="flex flex-row gap-2">
                <div className="text-[#4572E1]">DIY</div>
                <div className="text-[#4572E1]">Notion</div>
              </div>
              <div className="text-gray-500">这是一个简介</div>
            </div>
          )
        }
      })}
    </div>
  )
}
