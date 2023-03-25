function Post({slug, title, preview, date, author, tag}) {
    return (
        <div
            className={"block border my-6 hover:shadow-md transition-shadow"}>
            <a href={`/blog/${slug}`} className={"block text-1xl font-bold p-4"}>
                {title}
            </a>
            <div className={"flex flex-col border-t p-4 text-md bg-gray-50 dark:bg-stone-900 dark:text-gray-300"}>
                <p>{preview}</p>
                <p className={"text-[14px] text-gray-400 mt-1"}>{date} · {author} · {tag}</p>
            </div>
        </div>
    )
}

export default Post;