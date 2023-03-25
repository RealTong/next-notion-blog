import {getPublishPosts} from "../../components/notion/api";
import Post from "../../components/blog/Post";
import Footer from "../../components/Footer";



function index(props) {
    return (
        <div className={"bg-[#FFF] dark:bg-[#212121] dark:text-gray-300"}>
            <div className={"flex flex-col justify-between max-w-3xl w-screen h-screen  mx-auto p-6"}>
                <p className={"text-4xl font-bold"}>Blog posts</p>
                <div className={"h-full"}>
                    {
                        props.latestPostTitle.results.map((post) => {
                            return (
                                <Post
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
    const latestPostTitle = await getPublishPosts();
    console.log("LATEST",JSON.stringify(latestPostTitle))
    return {
        props: {
            latestPostTitle
        }
    }
}
export default index;