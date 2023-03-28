import {BiMenu, BiRss} from "react-icons/bi";
import {useState} from "react";

const Link = [
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
        <div className={"flex flex-row justify-between w-full h-12 text-2xl"}>
            <div className={""}>
                <a href="/"><img src="/avatar.jpg" alt="" className={"h-full rounded-full block dark:hidden"}/></a>
                <a href="/"><img src="/avatar.png" alt="" className={"h-full rounded-full hidden dark:block"}/></a>
            </div>

            <div className={"flex relative h-full"}>
                <button onClick={menuClick} className={"md:hidden"}>
                    <BiMenu/>
                </button>
                <div className={`flex flex-col ${menuClassName} md:block md:relative md:top-0 md:right-0`}>
                    {
                        Link.map((link,index) => {
                            return (
                                <a href={link.href} key = {index}
                                   className={"text-1xl leading-[3] text-base text-left text-gray-500 border w-24 pl-2 bg-white dark:bg-[#212121] md:w-16 md:border-0 hover:text-gray-400"}>{link.name}
                                </a>
                            )
                        })
                    }
                </div>
                <a href="/"
                   target="_blank"
                   className={"p-2.5 hover:text-gray-400"}
                   rel={"noopener noreferrer"}>
                    <BiRss/>
                </a>
            </div>
        </div>
    )
}

export default Header