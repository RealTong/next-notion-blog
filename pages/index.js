import Header from "../components/Header";
import Projects from "../components/Projects";
import LatestPosts from "../components/LatestPosts";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div className={"flex flex-col justify-between max-w-screen-md min-w-0 h-full mx-auto p-6 bg-[#FFF]"}>
            <Header/>
            <Projects/>
            <LatestPosts/>
            <Footer/>
        </div>
    )
}
