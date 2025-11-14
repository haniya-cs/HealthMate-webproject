import '../styles/Navbar.css'
import {Link} from 'react-router-dom';
import logo from '../assets/make the uploaded lo.png'
import { useState } from 'react';
const NavBar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  return (
    <nav className="navbar">
       <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      
      <div className={`rightSide ${isOpen ? 'active' : ''}`}>
      <Link to="/" onClick={() => setIsOpen(false)}> Home </Link>
          <Link to="/about"onClick={() => setIsOpen(false)}> About </Link>
          <Link to="/bmi"onClick={() => setIsOpen(false)}> BMI </Link>
          <Link to="/nutrition"onClick={() => setIsOpen(false)}> Nutrition </Link>
            <Link to="/dietplan"onClick={() => setIsOpen(false)}> Dietplan </Link>
          <Link to="/contact"onClick={() => setIsOpen(false)}> Contact </Link>
          <div className='login-btn'onClick={() => setIsOpen(false)}><Link to='/login'>Login</Link></div> 
      </div>
      

        <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>


       
    </nav>
  )
}

export default NavBar;
