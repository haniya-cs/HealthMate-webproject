import React from 'react'
import '../pages/Navbar.css'
import {Link} from 'react-router-dom';
import logo from '../assets/make the uploaded lo.png'
const NavBar = () => {
  return (
    <div className="navbar">
       <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>

        <div className="hiddenLinks">
          <Link to="/"> Home </Link>
          <Link to="/about"> About </Link>
          <Link to="/bmi"> BMI </Link>
          <Link to="/nutrition"> Nutrition </Link>
            <Link to="/dietplan"> Dietplan </Link>
          <Link to="/contact"> Contact </Link>
          <Link to='/login'>Login</Link>
        </div>
      
      <div className="rightSide">
      <Link to="/"> Home </Link>
          <Link to="/about"> About </Link>
          <Link to="/bmi"> BMI </Link>
          <Link to="/nutrition"> Nutrition </Link>
            <Link to="/dietplan"> Dietplan </Link>
          <Link to="/contact"> Contact </Link>
       <div className='log'><Link to='/login'>Login</Link></div> 
      </div>
    </div>
  )
}

export default NavBar;
