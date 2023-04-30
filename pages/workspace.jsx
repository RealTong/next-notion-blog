import Product from "../components/Product";
import Layout from "./Layout";

const products = [
    {
        "name": "THUNDEROBOT 911",
        "type": "Notebook",
        "img": "thunderobot-911.png"
    },
    {
        "name": "KTC H34S18",
        "type": "Monitor",
        "img": "ktc.png"
    },
    {
        "name": "iPad Pro 11\" 2021",
        "type": "Notebook",
        "img": "ipad_pro_11_3rd.jpg"
    },
    {
        "name": "Google Pixel 4 XL",
        "type": "Phone",
        "img": "pixel4xl.png"
    },
    {
        "name": "Logitech Master 3s",
        "type": "Mouse",
        "img": "mx-master-3s.webp"
    },
    {
        "name": "Logitech MX Keys",
        "type": "Keyboard",
        "img": "mx-keys.webp"
    },
    {
        "name": "Airpods 2",
        "type": "Earphone",
        "img": "airpods2.png"
    },
    {
        "name": "Chrome Cast with Google TV",
        "type": "streaming",
        "img": "chromecast.png"
    },
    {
        "name": "Yubikey 5C NFC",
        "type": "Security",
        "img": "yubikey5c.png"
    },
    {
        "name": "Yubikey 5 NFC",
        "type": "Security",
        "img": "yubikey5.png"
    },
    {
        "name": "IDEA",
        "type": "Software",
        "img": "idea.svg"
    },
    {
        "name": "webstorm",
        "type": "Software",
        "img": "webstorm.svg"
    },
    {
        "name": "datagrip",
        "type": "Software",
        "img": "datagrip.svg"
    }
]

function Workspace() {
    return (
        <Layout>
            {/*<div className={"flex flex-row flex-wrap max-w-4xl mx-auto justify-center items-center last:hidden"}>*/}
            <div className={"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-items-center"}>
                {
                    products.map((item, index) => {
                        return <Product {...item} key={index}/>
                    })
                }
            </div>
        </Layout>
    )

}

export default Workspace;