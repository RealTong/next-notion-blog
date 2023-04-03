import Link from "next/link";
import {CgDarkMode} from "react-icons/cg";

function Footer() {
    const toggleTheme = () => {
        const html = document.querySelector("html");
        html.classList.toggle("dark");
    }
    return (
        <div className={"flex mt-10"}>
            <p className={`w-full text-left`}>
                Copyright <Link href="https://realtong.cn" className={"underline"}>Tong</Link>{` \u00A9 ${getYear()}`}.
                Design by <Link href="https://ddiu.io/" className={"hover:text-[#789388] underline"}>ddiu.io</Link>
            </p>
            <button className={"text-2xl"} onClick={toggleTheme}>
                <CgDarkMode/>
            </button>
        </div>
    )
}

function getYear() {
    return new Date().getFullYear();
}

export default Footer;