import {getPost} from "../models/post.server";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import invariant from "tiny-invariant";
import { marked } from "marked";

export default function PostSlug() {
    const {post,html} = useLoaderData();
    return (
        <main className="mx-auto max-w-4xl">
            <h1 className="my-6 border-b-2 text-center text-3xl">
                Some Post: {post.title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </main>
    );
}


export const loader = async ({params}) => {
    invariant(params.slug,`parsms.slug is required`);
    const post = await getPost(params.slug)
    const html = marked(post.markdown)

    return json({
        post,html
    })
}