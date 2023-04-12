import {BiMenu, BiRss} from "react-icons/bi";
import {useState} from "react";
import Link from "next/link";

const Links = [
    {
        name: "Home",
        href: "/"
    },
    {
        name: "Blog",
        href: "/blog"
    },
    {
        name: <BiRss className={"text-[22px] inline"}/>,
        href: "/feed"
    }
]

function Header() {
    const [menuClassName, setMenuClassName] = useState("hidden");

    function menuClick() {
        console.log("click")
        if (menuClassName === "hidden") {
            setMenuClassName("absolute top-8 right-6")
        } else {
            setMenuClassName("hidden")
        }
    }

    return (
        <div
            className={"flex flex-row backdrop-blur-lg justify-between text-2xl pl-3 w-screen 2xl:max-w-5xl 2xl:mx-auto h-12 sticky top-0 z-10 bg-white/30"}
        >
            <div>
                <Link href="/">
                    <img src="/avatar.jpg" alt="" className={"h-full rounded-full block dark:hidden"}/>
                </Link>
                <Link href="/">
                    <img src="/avatar.png" alt="" className={"h-full rounded-full hidden dark:block"}/>
                </Link>
            </div>

            <div className={"flex relative h-full md:w-1/4"}>
                <button onClick={menuClick} className={"md:hidden"}>
                    <BiMenu/>
                </button>
                <div className={`flex flex-col ${menuClassName} md:flex md:flex-row md:justify-between md:w-full md:items-center`}>
                    {
                        Links.map((link, index) => {
                            return (
                                <Link href={link.href} key = {index}
                                   className={"flex items-center text-base pl-2 text-left border md:border-0 w-24 h-10 bg-white dark:bg-[#212121] md:dark:bg-transparent md:w-16 md:bg-transparent hover:text-gray-400"}>{link.name}
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Header