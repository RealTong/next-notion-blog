import {BsArrowUpRight} from "react-icons/bs";
import Link from "next/link";
import {useI18n} from "../pages/_app";

function Post({title, link, date},key){
    return (
        <Link href={`/blog/${link}`}
           target={"_self"}
           key={key}
           className={"flex justify-between p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-neutral-600"}
        >
            <p className={"md:truncate md:w-2/3 weiKaiFont"}>{title}</p>
            <p className={"font-normal hidden md:block"}>{date}</p>
        </Link>
    )
}
function LatestPosts({latestPostList}) {
    const i18n = useI18n()
    return(
        <>
            <div className={"flex justify-between my-4 text-3xl font-bold pb-4 w-full"}>
                <p>{i18n.index.latestPosts.title}</p>
                <Link href="/blog" target={"_self"} aria-label={"blog"} className={"text-neutral-800 hover:text-neutral-600 transition-colors dark:text-gray-300"}>
                    <BsArrowUpRight size={24}/>
                </Link>
            </div>
            <div>
                {
                    latestPostList.map((post, index) => {
                        return (
                            <Post key={index}
                                date={post.date}
                                link={post.link}
                                title={post.title}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}
export default LatestPosts;