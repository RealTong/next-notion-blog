import {getBlocks, getPage, getPosts} from "../../lib/notion";
import Copyright from "../../components/blog/Copyright";

function Post(props) {
    const host = "wst.sh"
    const page = props.page
    if (!page) return <div>loading...</div>
    return(
        <div className={""}>
            <p>Post: {page.id}</p>
            <div className={"h-screen border"}>Context</div>
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
    return {
        props: {
            page,
            blocks
        }
    }
}
export default Post