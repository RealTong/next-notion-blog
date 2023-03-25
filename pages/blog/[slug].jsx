import {useRouter} from 'next/router'
import Copyright from "../../components/blog/Copyright";
import {useEffect, useState} from "react";

const Post = (props) => {
    const router = useRouter()
    const {slug} = router.query
    console.log("slug: ", slug)
    if (!props.page) return <div>loading...</div>
    return (
        <div>
            <p>Post: {slug}</p>
            <Copyright
                link={"https://www.baidu.com"}
                page={props.page}
            />
        </div>
    )
}

export default Post