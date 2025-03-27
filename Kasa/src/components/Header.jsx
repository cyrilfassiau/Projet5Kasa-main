import { NavLink } from "react-router";
export default function Header() {


    return (
      
        <header>
          <div className='logo'>
            <img src="./src/assets/LOGO.png "/>
            </div>
          <nav className='nav-items'>
          <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'nav active' : 'nav')}
              
            >
              Accueil
            </NavLink>
            <NavLink
              to="/apropos"
              className={({ isActive }) => (isActive ? 'nav active' : 'nav')}
              
            >
              A propos
            </NavLink>
            
          </nav>
        </header>

      
    )
  }