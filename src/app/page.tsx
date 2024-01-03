import Info from '../components/Info'
import Activity from '../components/Activity'
import Projects from '../components/Projects'
import LatestPosts from '../components/LatestPosts'
import Footer from '../components/Footer'

export default function Page() {
  return (
    <div className={'flex flex-col max-w-5xl m-auto p-6'}>
      <Info />
      <Activity />
      <Projects />
      <LatestPosts />
      <Footer />
    </div>
  )
}
