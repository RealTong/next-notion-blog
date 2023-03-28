import {getBlocks, getPage, getPosts} from "../../lib/notion";
import Copyright from "../../components/blog/Copyright";
import NotionRenderer from "../../components/blog/NotionRenderer";
import probeImageSize from "../../lib/imaging";

function Post(props) {
    const host = "wst.sh"
    const page = props.page
    if (!page) return <div>loading...</div>
    return(
        <div className={""}>
            <p>Post: {page.id}</p>
            {
                props.blocks.map((block, index)=>{
                    console.log(block)
                    return <NotionRenderer key={index} block={block}/>
                })
            }
            <Copyright
                link={`https://${host}/blog/${page.properties.slug.rich_text[0].text.content}`}
                page={page}
            />
        </div>
    )
}
export const getStaticPaths = async () => {
    const db = await getPosts();
    return {
        paths: db.map((p) => ({
            params: { slug: p.properties.slug.rich_text[0].text.content },
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
            const { type } = block
            const value = block[type]
            const src =
                value.type === 'external' ? value.external.url : value.file.url

            const { width, height } = await probeImageSize(src)
            value['dim'] = { width, height }
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