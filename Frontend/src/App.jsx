import Contact from "./Pages/Contact"
import Appointment from "./Pages/Appointment"
import Home from "./Components/SPA/Home"
import {Route, Routes} from "react-router-dom"

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/appointment" element={<Appointment/>}/>
      </Routes>


    </div>
  )
}

export default App

