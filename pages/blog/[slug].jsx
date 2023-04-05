import {getBlocks, getPage, getPosts} from "../../lib/notion";
import Copyright from "../../components/blog/Copyright";
import NotionRenderer from "../../components/blog/NotionRenderer";
import probeImageSize from "../../lib/imaging";
import Header from "../../components/blog/Header";
import Footer from "../../components/Footer";
import {highlight} from "../../lib/shiki";

function Post(props) {
    const host = "wst.sh"
    const page = props.page
    if (!page) return <div>loading...</div>
    return (
        <div className={"mx-auto p-6 w-full md:max-w-3xl"}>
            <Header/>
            <main className={"mt-3 border p-3"}>
                <div className={""}>
                    <h1 className={"text-3xl font-bold"}>{page.properties.name.title[0].plain_text}</h1>
                </div>
                <div>
                    {
                        props.blocks.map((block, index) => {
                            return (
                                <>
                                    <br key={index}/>
                                    <NotionRenderer key={index} block={block}/>
                                </>
                            )
                        })
                    }
                    <Copyright
                        link={`https://${host}/blog/${page.properties.slug.rich_text[0].text.content}`}
                        page={page}
                    />
                </div>
                <div
                    className={"flex flex-col justify-between min-w-0 w-full h-full p-6 bg-[#FFF] dark:bg-[#212121] dark:text-gray-300"}>
                </div>
                <Footer/>
            </main>
        </div>
    )
}

export const getStaticPaths = async () => {
    const db = await getPosts();
    return {
        paths: db.map((p) => ({
            params: {slug: p.properties.slug.rich_text[0].text.content},
        })),
        fallback: 'blocking',
    }
}

export async function getStaticProps({params}) {
    const slug = params.slug
    const database = await getPosts(slug)
    const post = database[0]
    const page = await getPage(post.id)
    const blocks = await getBlocks(post.id)
    // 探测图片尺寸
    await Promise.all(
        blocks.filter(block => block.type === 'image').map(async (block) => {
            const {type} = block
            const value = block[type]
            const src =
                value.type === 'external' ? value.external.url : value.file.url

            const {width, height} = await probeImageSize(src)
            value['dim'] = {width, height}
            block[type] = value
        })
    )
    // 渲染Code block
    await Promise.all(
        blocks.filter(block => block.type === 'code').map(async (block) => {
            const {type} = block
            const value = block[type]
            value['dom'] = await highlight(
                value.rich_text[0].plain_text,
                'github-dark',
                value.language,
            )
            block[type] = value
        })
    )
    return {
        props: {
            page,
            blocks
        }
    }
}

export default Post