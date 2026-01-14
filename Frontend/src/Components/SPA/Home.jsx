import Header from "./Header"
import Body from "./Body"
import Testimonials from "./Testimonials"
import Footer from "./Footer_Component"
import { useEffect } from "react"


const Home = ({ currentYear }) => {


  useEffect(() => {
    
    fetch("http://localhost:5001/api/appointment")
      .then(async res => {
        if (res.status === 429) {
          const data = await res.json();
          alert(data.message || "Rate limit exceeded");
          return;
        }
        return res.json();
      })
      .catch(err => console.error(err));
  }, []); 

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
