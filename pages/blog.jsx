import {getPosts} from "../lib/notion";
import Post from "../components/blog/Post";
import Footer from "../components/Footer";
import Header from "../components/blog/Header";


function blog(props) {
    return (
        <div className={"w-screen h-screen overflow-y-scroll bg-[#FFF] dark:bg-[#212121] dark:text-gray-300"}>
            <Header/>
            <div className={"w-full px-3 max-w-5xl mx-auto"}>
                <p className={"text-4xl font-bold my-10 font-mono"}>Blog posts</p>
                {
                    props.latestPostTitle.map((post) => {
                        return (
                            <Post key={post.id}
                                  slug={post.properties.slug.rich_text[0].plain_text}
                                  title={post.properties.name.title[0].plain_text}
                                  preview={post.properties.preview.rich_text[0].plain_text}
                                  date={post.properties.date.date.start}
                                  author={post.properties.author.people[0].name}
                                  tag={post.properties.tag.select.name}
                            />
                        )
                    })
                }
                <Footer/>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const latestPostTitle = await getPosts();
    console.log("[blog.jsx] Last updated: " + new Date().toLocaleString())
    return {
        props: {
            latestPostTitle
        },
        revalidate: 60 * 60 // 1 hour
    }
}

export default blog;