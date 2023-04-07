import {getPosts} from "../lib/notion";
import Post from "../components/blog/Post";
import Footer from "../components/Footer";
import Header from "../components/blog/Header";


function blog(props) {
    return (
        <div className={"bg-[#FFF] dark:bg-[#212121] dark:text-gray-300"}>
            <div className={"flex flex-col h-full justify-between w-screen pb-3"}>
                <Header/>
                <div className={"w-full px-3 max-w-5xl mx-auto"}>
                    <p className={"text-4xl font-bold my-10 font-mono"}>Blog posts</p>
                    {
                        props.latestPostTitle.map((post,index) => {
                            return (
                                <Post key={index}
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
        </div>
    )
}

export async function getStaticProps() {
    const latestPostTitle = await getPosts();
    return {
        props: {
            latestPostTitle
        }
    }
}

export default blog;