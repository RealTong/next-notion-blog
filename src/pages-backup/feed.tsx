import { Feed } from 'feed'
import { getPosts } from '../lib/notion'
import { PostListProps } from '../utils/types'

const feed = new Feed({
  title: "RealTong's Blog",
  description: 'This is my blog!',
  id: 'http://www.realtong.cn/',
  link: 'http://www.realtong.cn/',
  language: 'zh', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: 'http://www.realtong.cn/logo192.jpg',
  favicon: 'http://www.realtong.cn/favicon.ico',
  copyright: 'CC BY-NC-SA 4.0 \u00A9, RealTong',
  updated: new Date(2013, 6, 14), // optional, default = today
  generator: 'awesome', // optional, default = 'Feed for Node.js'
  author: {
    name: 'RealTong',
    email: 'i@realtong.cn',
    link: 'https://www.realtong.cn/',
  },
})

function generateRSS(posts: PostListProps) {
  posts.forEach((post: any) => {
    feed.addItem({
      title: post.properties.name.title[0].plain_text,
      id: post.id,
      link: `https://www.realtong.cn/blog/${post.properties.slug.rich_text[0].plain_text}`,
      description: post.properties.preview.rich_text[0].plain_text,
      date: new Date(post.properties.date.date.start),
    })
  })
  return feed.rss2()
}

export default function FeedPage() {
  return <div></div>
}

export async function getServerSideProps({ res }) {
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=60 * 10, stale-while-revalidate')
  const posts = await getPosts()
  const feed = generateRSS(posts)
  res.setHeader('Content-Type', 'text/xml')
  res.write(feed)
  res.end().toLocaleString()
  return {
    props: {},
    // 这是SSR 每次请求都会在服务端重新调用
  }
}
