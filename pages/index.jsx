import Script from 'next/script'
import Head from "next/head";
import Header from "../components/Header";
import Projects from "../components/Projects";
import LatestPosts from "../components/LatestPosts";
import Footer from "../components/Footer";
import {getPosts} from "../lib/notion";
import Activity from "../components/Activity";

export default function Index(props) {
    return (
        <>
            <Head>
                <title>RealTong</title>
                <meta name="description" content="RealTong's Site"/>
                <meta name="keywords" content="RealTong, Blog, Notion, Next.js, TailwindCSS, NotionCMS"/>
                <meta name="author" content="RealTong"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="theme-color" content="#000000"/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
                <meta name="apple-mobile-web-app-title" content="RealTong"/>
                <meta name="msapplication-TileImage" content="/logo192.jpg"/>
                <meta name="msapplication-TileColor" content="#000000"/>
                <meta name="twitter:card" content="summary"/>
                <meta name="twitter:url" content="https://realtong.cn/"/>
                <meta name="twitter:title" content="RealTong"/>
                <meta name="twitter:description" content="RealTong's Site"/>
                <meta name="twitter:image" content="https://realtong.cn/logo192.png"/>
                <meta name="twitter:creator" content="@RealTong_run"/>
                <meta property="og:type" content="website"/>
                <meta property="og:title" content="RealTong"/>
                <meta property="og:description" content="RealTong's Blog"/>
                <meta property="og:site_name" content="RealTong"/>
                <meta property="og:url" content="https://realtong.cn/"/>
                <meta property="og:image" content="https://realtong.cn/logo192.png"/>
            </Head>
            <div>
                <Script async defer data-website-id="745797e5-e399-4b37-8ee5-155c8bf97a58" src="https://umami.realtong.cn/umami.js"></Script>
            </div>
            <div
                className={"flex flex-col font-mono justify-between min-w-0 w-full h-full p-6 bg-[#FFF] dark:bg-[#212121] dark:text-gray-300"}>
                <div className={"mx-auto p-6"}>
                    <Header/>
                    <Activity/>
                    <Projects/>
                    <LatestPosts latestPostList={
                        props.latestPosts.map((post) => {
                            return {
                                title: post.properties.name.title[0].plain_text,
                                date: post.properties.date.date.start,
                                link: post.properties.slug.rich_text[0].plain_text,
                            }
                        })
                    }/>
                    <Footer/>
                </div>
            </div>
        </>
)
}

export async function getStaticProps() {
    const latestPosts = await getPosts();
    return {
        props: {
            latestPosts
        }
    }
}