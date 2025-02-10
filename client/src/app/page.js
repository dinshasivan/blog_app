import About from '@/pages/About'
import Blog from '@/pages/Blog'
import Contact from '@/pages/Contact'
import Footer from '@/pages/Footer'
import NavBar from '@/pages/Header'
import Hero from '@/pages/Hero'


const page = () => {

 
  return (
    <>
      <div><NavBar /></div>
      <Hero/>
      <Blog/>
      <About/>
      <Contact/>
      <Footer/>
    </>

  )
}



export default page