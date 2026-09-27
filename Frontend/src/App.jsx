import Contact from "./Pages/Contact"
import Appointment from "./Pages/Appointment"
import Home from "./Components/SPA/Home"
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import { Route, Routes } from "react-router-dom"

const App = () => {

  const currentYear = () => {
    return new Date().getFullYear();
  };

  return (

    <div>

      <Routes>
        <Route path="/" element={<Home currentYear={currentYear()}/>} />
        <Route path="/contact" element={<Contact currentYear={currentYear()}/>} />
        <Route path="/appointment" element={<Appointment currentYear={currentYear()}/>} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/login" element={<Login />} />
      </Routes>

    </div>
  )
  
}

export default App

