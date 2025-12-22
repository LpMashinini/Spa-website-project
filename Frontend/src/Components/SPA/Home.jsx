import Header from "./Header"
import Body from "./Body"
import Testimonials from "./Testimonials"
import Footer from "./Footer_Component"

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
