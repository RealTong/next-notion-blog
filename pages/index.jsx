import Header from "../components/Header";
import Projects from "../components/Projects";
import LatestPosts from "../components/LatestPosts";
import Footer from "../components/Footer";
import {getPublishPosts} from "../components/notion/api";

export default function Index(props) {
    return (
        <div
            className={"flex flex-col font-mono justify-between min-w-0 w-full h-full mx-auto p-6 bg-[#FFF] dark:bg-[#212121] dark:text-gray-300"}>
            <div className={"mx-auto p-6"}>
                <Header/>
                <Projects/>
                <LatestPosts latestPostList={
                    props.latestPosts.results.map((post) => {
                      return {
                          title: post.properties.name.title[0].plain_text,
                          date: post.properties.date.date.start,
                          link: post.url,
                      }
                    })
                } />
                <Footer align={"left"}/>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const latestPosts = await getPublishPosts();
    return {
        props: {
            latestPosts
        }
    }
}