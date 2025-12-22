import Contact from "./Pages/Contact"
import Appointment from "./Pages/Appointment"
import Home from "./Components/SPA/Home"
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
      </Routes>


    </div>
  )
}

export default App

