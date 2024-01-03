import Info from "../components/Info";
import Activity from "../components/Activity";
import Projects from "../components/Projects";
import LatestPosts from "../components/LatestPosts";
import Footer from "../components/Footer";
import ContributionGraph from "../components/ContributionGraph";

export default function Page() {

  return (
    <div className={'m-auto p-6'}>
      <Info/>
      <Activity/>
      <Projects/>
      <Footer/>
    </div>
  )
}
