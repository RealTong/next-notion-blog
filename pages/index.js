import Header from "../components/Header";
import Projects from "../components/Projects";
import LatestPosts from "../components/LatestPosts";
import Footer from "../components/Footer";

export default function Home() {
    return (
        // px-6 py-[8vh] max-w-[76ch] mx-auto xl:text-lg dark:prose-invert
        <div className={"flex flex-col justify-between w-5/6 h-full mx-auto p-6 bg-[#FFF]"}>
            <Header/>
            <Projects/>
            <LatestPosts/>
            <Footer/>
        </div>
    )
}
