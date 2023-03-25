import {
    TbBrandBilibili,
    TbBrandFigma,
    TbBrandGithub,
    TbBrandInstagram,
    TbBrandTwitter
} from "react-icons/tb";
import {HiOutlineMail} from "react-icons/hi";

const brandList = [
    {
        brandIcon: <HiOutlineMail/>,
        brandName: "Email",
        link: "mailto:i@realtong.cn",
        css: "hover:bg-[#34A853]"
    },
    {
        brandIcon: <TbBrandGithub/>,
        brandName: "Github",
        link: "https://github.com/RealTong",
        css: "hover:bg-[#000000]"
    },
    {
        brandIcon: <TbBrandFigma/>,
        brandName: "Figma",
        link: "https://www.figma.com/@wulanren",
        css: "hover:bg-[#F24E1E]"
    },
    {
        brandIcon: <TbBrandTwitter/>,
        brandName: "Twitter",
        link: "https://twitter.com/RealTong_run",
        css: "hover:bg-[#1DA1F2]"
    },
    {
        brandIcon: <TbBrandInstagram/>,
        brandName: "Instagram",
        link: "https://www.instagram.com/realtong_run/",
        css: "hover:bg-[#d6249f]"
    },
    {
        brandIcon: <TbBrandBilibili/>,
        brandName: "Bilibili",
        link: "https://space.bilibili.com/195743150",
        css: "hover:bg-[#FB7299]"
    }
]

function Header() {
    return (
        <div className={"mt-20"}>
            <div className={"text-5xl font-bold"}>
                <p>👋</p>
                <p>Hello,</p>
                <p>I'm Tong.</p>
            </div>
            <div className={"flex flex-col justify-between mt-6 h-14 max-h-14"}>
                    <p>🎒 Student / 💻Web Developer</p>
                    <p>I like making interesting projects.</p>
            </div>
            <div className={"flex flex-row max-w-full flex-nowrap sm:flex-wrap justify-start mt-2"}>
                {
                    brandList.map((brand, index) => {
                        return Brand(brand, index)
                    })
                }
            </div>
        </div>
    )
}

function Brand({brandIcon, brandName, link, css}, key) {
    return (
        <a key={key}
           href={link}
           target={"_blank"}
           className={`decoration-none block flex flex-row flex-nowrap p-2 mr-2 rounded-md bg-gray-50 leading-[1rem] transition-colors dark:bg-gray-50/10 hover:text-white ${css}`}>
            {brandIcon}
            <span className={"ml-1 hidden md:block"}>{brandName}</span>
        </a>
    )
}

export default Header;