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
      <Link to="/"> Home </Link>
          <Link to="/about"> About </Link>
          <Link to="/bmi"> BMI </Link>
          <Link to="/nutrition"> Nutrition </Link>
            <Link to="/dietplan"> Dietplan </Link>
          <Link to="/contact"> Contact </Link>
          <div className='login-btn'><Link to='/login'>Login</Link></div> 
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
