import {BsArrowUpRight} from "react-icons/bs";

function Post({title, link, date},key){
    return (
        <a href={link}
           target={"_blank"}
           key={key}
           className={"flex justify-between h-10 p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-neutral-600"}
        >
            <p className={"truncate w-2/3"}>{title}</p>
            <p className={"font-normal"}>{date}</p>
        </a>
    )
}
function LatestPosts({latestPostList}) {
    return(
        <>
            <div className={"flex justify-between my-4 text-3xl font-bold pb-4"}>
                <p>Latest Posts</p>
                <a href="/blog" className={"text-neutral-800 hover:text-neutral-600 transition-colors"}><BsArrowUpRight size={24}/></a>
            </div>
            <div>
                {
                    latestPostList.map((post, index) => {
                        return (
                            <Post
                                date={post.date}
                                link={post.link}
                                title={post.title}
                                key={index}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}
export default LatestPosts;