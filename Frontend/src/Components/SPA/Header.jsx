import Navbar from './Navbar'
import './Header.css'

const Header = () => {
  return (

    <div className='container'>
      <Navbar />
      <div className="header-content">
        <h3>spa <span>&</span> beauty salon</h3>
        <p>refrsh and revitalize yourself with the best spa & beauty salon.</p>
      </div>
    </div>
  )
}

export default Header
