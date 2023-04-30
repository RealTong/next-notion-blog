import Header from "../components/blog/Header";
import Footer from "../components/Footer";

function Layout({children}) {
    return (
        <div className={'debug h-screen w-screen overflow-y-scroll bg-[#FFF] dark:bg-[#212121] dark:text-gray-300 flex flex-col justify-between '}>
            <Header />
            <div className={'mx-auto w-full max-w-5xl px-3 items-center'}>
                {
                    children
                }
            </div>
            <Footer />
        </div>
    )
}
export default Layout;