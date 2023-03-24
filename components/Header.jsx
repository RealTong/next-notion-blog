import {
    TbBrandBilibili,
    TbBrandFigma,
    TbBrandGithub,
    TbBrandInstagram,
    TbBrandTwitter
} from "react-icons/tb";

const brandList = [
    {
        brandIcon: <TbBrandGithub/>,
        brandName: "Github",
        link: "https://github.com/RealTong",
        css: "hover:bg-[#000000]"
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
        brandIcon: <TbBrandFigma/>,
        brandName: "Figma",
        link: "https://www.figma.com/@wulanren",
        css: "hover:bg-[#F24E1E]"
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
        <div className={"w-full mt-20"}>
            <div className={"text-5xl font-bold"}>
                <span>👋</span>
                <span className={"block"}>Hello,</span>
                <span className={"block"}>I'm Tong.</span>
            </div>
            <div className={"flex flex-col justify-between mt-6 h-14"}>
                <div>
                    <span>🎒 Student / 💻Web Developer</span>
                </div>
                <div>
                    <span>
                        I like making interesting projects.
                    </span>
                </div>
            </div>
            <div className={"flex flex-row w-full flex-nowrap justify-between mt-2"}>
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
           className={`decoration-none block flex flex-row flex-nowrap justify-between p-2 my-2 rounded-md bg-gray-50 leading-[1rem] transition-colors  hover:text-white ${css}`}>
            {brandIcon}
            <span>{brandName}</span>
        </a>
    )
}

export default Header;