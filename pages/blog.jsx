import { getPosts } from '../lib/notion'
import Post from '../components/blog/Post'
import { FaFeather } from 'react-icons/fa'
import Layout from "./Layout";

function Blog(props) {
  return (
      <Layout>
        <p className={'my-10 flex font-mono text-4xl font-bold'}>
          <FaFeather />
          &nbsp;Blog posts
        </p>
        {props.latestPostTitle.map((post) => {
          return (
              <Post
                  key={post.id}
                  slug={post.properties.slug.rich_text[0].plain_text}
                  title={post.properties.name.title[0].plain_text}
                  preview={post.properties.preview.rich_text[0].plain_text}
                  date={post.properties.date.date.start}
                  author={post.properties.author.people[0].name}
                  tag={post.properties.tag.select.name}
              />
          )
        })}
      </Layout>
  )
}

export async function getStaticProps() {
  const latestPostTitle = await getPosts()
  return {
    props: {
      latestPostTitle,
    },
    revalidate: 60 * 10, // 10min
  }
}

export default Blog
