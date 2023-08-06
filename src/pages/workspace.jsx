import Product from '../components/Product'
import Layout from '../components/Layout'

const products = [
  {
    name: 'MacBook Pro 14" 2021',
    type: 'Notebook',
    img: 'macbookpro.png',
  },
  {
    name: 'THUNDEROBOT 911',
    type: 'Notebook',
    img: 'thunderobot-911.png',
  },
  {
    name: 'KTC H34S18',
    type: 'Monitor',
    img: 'ktc.png',
  },
  {
    name: 'iPad Pro 11" 2021',
    type: 'Notebook',
    img: 'ipad_pro_11_3rd.png',
  },
  {
    name: 'Google Pixel 4 XL',
    type: 'Phone',
    img: 'pixel4xl.png',
  },
  {
    name: 'Apple TV 4K 2022',
    type: 'TV Stick',
    img: 'appletv7.png',
  },
  {
    name: 'Logitech Master 3s',
    type: 'Mouse',
    img: 'mx-master-3s.webp',
  },
  {
    name: 'Logitech MX Keys',
    type: 'Keyboard',
    img: 'mx-keys.webp',
  },
  {
    name: 'Magic Trackpad',
    type: 'Trackpad',
    img: 'magic-trackpad.png',
  },
  {
    name: 'Airpods 2',
    type: 'Earphone',
    img: 'airpods2.png',
  },
  {
    name: 'Chrome Cast with Google TV',
    type: 'TV Stick',
    img: 'chromecast.png',
  },
  {
    name: 'MiJia ScreenBar',
    type: 'Monitor Light',
    img: 'mijia-screenbar.png',
  },
  {
    name: 'Yubikey 5C NFC',
    type: 'Security',
    img: 'yubikey5c.png',
  },
  {
    name: 'Yubikey 5 NFC',
    type: 'Security',
    img: 'yubikey5.png',
  },
  {
    name: 'Jetbrains All Products',
    type: 'Software',
    img: 'jetbrains.png',
  },
  {
    name: 'Reloading BK1',
    type: 'Shoe',
    img: 'reloading-bk1.png',
  },
]

function Workspace() {
  return (
    <Layout>
      {/*<div className={"flex flex-row flex-wrap max-w-4xl mx-auto justify-center items-center last:hidden"}>*/}
      <div className={'grid grid-cols-2 items-center justify-between justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'}>
        {products.map((item, index) => {
          return <Product {...item} key={index} />
        })}
      </div>
    </Layout>
  )
}

export default Workspace
