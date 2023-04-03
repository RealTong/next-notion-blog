import Link from "next/link";

function Footer({align}){
    return(
        <>
            <p className={`mt-10 w-full text-${align}`}>
                Copyright <Link href="https://realtong.cn" className={"underline"}>Tong</Link>{` \u00A9 ${getYear()}`}.
                Design by <Link href="https://ddiu.io/" className={"hover:text-[#789388] underline"}>ddiu.io</Link>
            </p>
        </>
    )
}
function getYear() {
    return new Date().getFullYear();
}
export default Footer;