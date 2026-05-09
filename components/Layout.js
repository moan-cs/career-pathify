import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children, navbarType = 'default' }) {
  return (
    <div className="site-wrapper">
      <Navbar type={navbarType} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}