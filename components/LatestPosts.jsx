
const latestPostList=[
    {
        title: "Post 1Post 1Post 1Post 1Post 1Post 1",
        link: "https://google.com",
        date: "2021-08-01",
    },
    {
        title: "Post 2Post 2Post 2",
        link: "https://google.com",
        date: "2021-08-01",
    },
    {
        title: "Post 3",
        link: "https://google.com",
        date: "2021-08-01",
    },
    {
        title: "Post 4Post 4",
        link: "https://google.com",
        date: "2021-08-01",
    },
    {
        title: "Post 5Post 5Post 5Post 5",
        link: "https://google.com",
        date: "2021-08-01",
    }
]
function Post({title, link, date},key){
    return (
        <a href={link}
           target={"_blank"}
           key={key}
           className={"flex justify-between h-10 p-2 rounded-md transition-colors hover:bg-gray-100"}
        >
            <p>{title}</p>
            <p className={"op-40 font-normal"}>{date}</p>
        </a>
    )
}
function LatestPosts() {
    return(
        <>
            <p className={"my-4 text-3xl font-bold pb-4"}>Latest Posts</p>
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