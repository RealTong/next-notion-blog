import {BiMenu, BiRss} from "react-icons/bi";
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";

const Links = [
    {
        name: "Home",
        href: "/"
    },
    {
        name: "Blog",
        href: "/blog"
    }
]

function Header() {
    const [menuClassName, setMenuClassName] = useState("hidden");

    function menuClick() {
        console.log("click")
        if (menuClassName === "hidden") {
            setMenuClassName("absolute top-8 right-12")
        } else {
            setMenuClassName("hidden")
        }
    }

    return (
        <div className={"flex flex-row w-full h-12 sticky top-0 bg-white/30 dark:bg-dark-900/50 backdrop-blur-lg z-10 justify-between text-2xl"}>
            <div className={""}>
                <Link href="/"><Image src="/avatar.jpg" alt="" width={42} height={42} className={"h-full rounded-full block dark:hidden"}/></Link>
                <Link href="/"><Image src="/avatar.png" alt="" width={42} height={42} className={"h-full rounded-full hidden dark:block"}/></Link>
            </div>

            <div className={"flex relative h-full"}>
                <button onClick={menuClick} className={"md:hidden"}>
                    <BiMenu/>
                </button>
                <div className={`flex flex-col ${menuClassName} md:block md:relative md:top-0 md:right-0`}>
                    {
                        Links.map((link,index) => {
                            return (
                                <Link href={link.href} key = {index}
                                   className={"text-1xl leading-[3] text-base text-left  border w-24 pl-2 bg-white dark:bg-[#212121] md:w-16 md:border-0 md:bg-transparent hover:text-gray-400"}>{link.name}
                                </Link>
                            )
                        })
                    }
                </div>
                <Link href="/feed"
                   target="_blank"
                   className={"p-2.5 hover:text-gray-400"}
                   rel={"noopener noreferrer"}>
                    <BiRss/>
                </Link>
            </div>
        </div>
    )
}

export default Header