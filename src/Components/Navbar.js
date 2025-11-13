import '../styles/Navbar.css'
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
      
      <div className="rightSide">
      <Link to="/"> Home </Link>
          <Link to="/about"> About </Link>
          <Link to="/bmi"> BMI </Link>
          <Link to="/nutrition"> Nutrition </Link>
            <Link to="/dietplan"> Dietplan </Link>
          <Link to="/contact"> Contact </Link>
      </div>
      <div className='login-btn'><Link to='/login'>Login</Link></div> 
    </div>
  )
}

export default NavBar;
