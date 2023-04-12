import {Link, useLoaderData} from "@remix-run/react";
import {json} from "@remix-run/node";
import {getPosts} from "../models/post.server";

export default function PostsIndex() {
    const {posts} = useLoaderData();
    console.log("posts: ", posts)
    return (
        <div className={"flex flex-col items-center mx-auto w-screen h-screen justify-between"}>
            <p className={"text-red-700"}>Posts Page</p>
            <ul>
                {
                    posts.map((post) => {
                        return (
                            <li key={post.slug}>
                                <Link to={post.slug}>
                                    {post.slug}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
            <Link to="admin" className="text-red-600 underline">
                Admin
            </Link>
        </div>
    )
}

export const loader = async () => {
    return json({
        posts:await getPosts()
    })
}