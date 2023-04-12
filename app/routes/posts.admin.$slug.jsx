import {
    Form,
    useActionData,
    useCatch,
    useLoaderData,
    useParams,
    useTransition,
} from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import  { ActionFunction, LoaderFunction } from "@remix-run/node";
import  { Post } from "../models/post.server";
import {
    createPost,
    deletePost,
    getPost,
} from "../models/post.server";
import invariant from "tiny-invariant";

export const loader = async ({ request, params }) => {
    console.log("Loader: ",params)
    invariant(params.slug, "slug is required");
    if (params.slug === "new") {
        return json({});
    }
    const post = await getPost(params.slug);
    if (!post) {
        throw new Response("Not Found", { status: 404 });
    }
    return json({ post });
};

export const action = async ({ request, params }) => {
    invariant(params.slug, "slug is required");
    const formData = await request.formData();
    const intent = formData.get("intent");

    if (intent === "delete") {
        await deletePost(params.slug);
        return redirect("/posts/admin");
    }

    const title = formData.get("title");
    const slug = formData.get("slug");
    const markdown = formData.get("markdown");

    const errors = {
        title: title ? null : "Title is required",
        slug: slug ? null : "Slug is required",
        markdown: markdown ? null : "Markdown is required",
    };
    const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
    if (hasErrors) {
        return json(errors);
    }

    invariant(typeof title === "string", "title must be a string");
    invariant(typeof slug === "string", "slug must be a string");
    invariant(typeof markdown === "string", "markdown must be a string");

    if (params.slug === "new") {
        await createPost({ title, slug, markdown });
    }

    return redirect("/posts/admin");
};

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function NewPostRoute() {
    const data = useLoaderData();
    const errors = useActionData();

    // useEffect(() => {
    //   blah();
    // });

    const transition = useTransition();
    const isCreating = transition.submission?.formData.get("intent") === "create";
    const isUpdating = transition.submission?.formData.get("intent") === "update";
    const isDeleting = transition.submission?.formData.get("intent") === "delete";
    const isNewPost = !data.post;

    return (
        <Form method="post" key={data.post?.slug ?? "new"}>
            <p>
                <label>
                    Post Title:{" "}
                    {errors?.title ? (
                        <em className="text-red-600">{errors.title}</em>
                    ) : null}
                    <input
                        type="text"
                        name="title"
                        className={inputClassName}
                        defaultValue={data.post?.title}
                    />
                </label>
            </p>
            <p>
                <label>
                    Post Slug:{" "}
                    {errors?.slug ? (
                        <em className="text-red-600">{errors.slug}</em>
                    ) : null}
                    <input
                        type="text"
                        name="slug"
                        className={inputClassName}
                        defaultValue={data.post?.slug}
                    />
                </label>
            </p>
            <p>
                <label htmlFor="markdown">
                    Markdown:{" "}
                    {errors?.markdown ? (
                        <em className="text-red-600">{errors.markdown}</em>
                    ) : null}
                </label>
                <textarea
                    id="markdown"
                    rows={20}
                    name="markdown"
                    className={`${inputClassName} font-mono`}
                    defaultValue={data.post?.markdown}
                />
            </p>
            <div className="flex justify-end gap-4">
                {isNewPost ? null : (
                    <button
                        type="submit"
                        name="intent"
                        value="delete"
                        className="rounded bg-red-500 py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400 disabled:bg-red-300"
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                )}
                <button
                    type="submit"
                    name="intent"
                    value={isNewPost ? "create" : "update"}
                    className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
                    disabled={isCreating || isUpdating}
                >
                    {isNewPost ? (isCreating ? "Creating..." : "Create Post") : null}
                    {isNewPost ? null : isUpdating ? "Updating..." : "Update"}
                </button>
            </div>
        </Form>
    );
}