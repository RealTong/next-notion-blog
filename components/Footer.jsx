function Footer(props){
    return(
        <>
            <p className={`mt-10 w-full text-${props.align}`}>
                Copyright <a href="https://realtong.cn" className={"underline"}>Tong</a>{` \u00A9 ${getYear()}`}.
                Design by <a href="https://ddiu.io/" className={"hover:text-[#789388] underline"}>ddiu.io</a>
            </p>
        </>
    )
}
function getYear() {
    return new Date().getFullYear();
}
export default Footer;