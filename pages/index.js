import Header from "../components/Header";
import Projects from "../components/Projects";
import LatestPosts from "../components/LatestPosts";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div className={"h-full bg-[#FFFFFF]"}>
            <Header/>
            <Projects/>
            <LatestPosts/>
            <Footer/>
        </div>
    )
}
