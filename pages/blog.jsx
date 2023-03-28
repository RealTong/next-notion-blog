import {getPosts} from "../lib/notion";
import Post from "../components/blog/Post";
import Footer from "../components/Footer";
import Header from "../components/blog/Header";


function blog(props) {
    return (
        <div className={"bg-[#FFF] dark:bg-[#212121] dark:text-gray-300"}>
            <div className={"flex flex-col justify-between max-w-3xl w-screen mx-auto px-6 py-3"}>
                <Header/>
                <p className={"text-4xl font-bold my-10 font-mono"}>Blog posts</p>
                <div className={"h-full"}>
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
                </div>
                <Footer align={"center"}/>
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