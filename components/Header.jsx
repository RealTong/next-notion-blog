import {TbBrandBilibili, TbBrandFacebook, TbBrandFigma, TbBrandGithub, TbBrandInstagram} from "react-icons/tb";

function Header() {
    return (
        <>
            <h1>👋 Hello, I'm Tong.</h1>
            <div>
                <p>Student / Web Developer</p>
                <p>I like making interesting projects</p>
            </div>
            <div className={"flex justify-around"}>
                {
                    brandList.map((brand,index) => {
                        return Brand(brand.brandComponent, brand.brandName, index)
                    })
                }
            </div>
        </>
    )
}

const brandList = [
    {
        brandComponent: <TbBrandGithub/>,
        brandName: "Github"
    },
    {
        brandComponent: <TbBrandFacebook/>,
        brandName: "Facebook"
    },
    {
        brandComponent: <TbBrandInstagram/>,
        brandName: "Instagram"
    },
    {
        brandComponent: <TbBrandFigma/>,
        brandName: "Figma"
    },
    {
        brandComponent: <TbBrandBilibili/>,
        brandName: "Bilibili"
    }
]

function Brand(brandComponent, brandName,key) {
    return (
        <div key={key} className={"flex"}>
            {brandComponent}
            <p>{brandName}</p>
        </div>
    )
}

export default Header;