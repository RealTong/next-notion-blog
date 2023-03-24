function Footer(){
    return(
        <>
            <h1>Copyright Tong {`\u00A9 ${getYear()}`} </h1>
        </>
    )
}
function getYear() {
    return new Date().getFullYear();
}
export default Footer;