import Header from "./Header"
import Body from "./Body"
import Testimonials from "./Testimonials"
import Footer from "./Footer_Component"
import { useEffect } from "react"


const Home = ({ currentYear }) => {

  return (

    <div>
      <Header />
      <Body />
      <Testimonials />
      <Footer currentYear={currentYear} />
    </div>
  )

}

export default Home
