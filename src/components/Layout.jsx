import Header from './blog/Header'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div className={'debug flex h-screen w-screen flex-col justify-between overflow-y-scroll bg-[#FFF] dark:bg-[#212121] dark:text-gray-300 '}>
      <Header />
      <div className={'mx-auto w-full max-w-5xl items-center px-3 lg:px-0'}>{children}</div>
      <Footer />
    </div>
  )
}
export default Layout
