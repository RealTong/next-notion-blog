function Footer(){
    return(
        <>
            <h1 className={"mt-10"}>Copyright <a href="https://realtong.cn" className={"underline"}>Tong</a> {`\u00A9 ${getYear()}`}. Design by <a href="https://ddiu.io/" className={"hover:text-[#789388] underline"}>ddiu.io</a> </h1>
        </>
    )
}
function getYear() {
    return new Date().getFullYear();
}
export default Footer;