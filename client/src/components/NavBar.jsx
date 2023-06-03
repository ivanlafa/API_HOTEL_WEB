import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand' to='/'>Inicio</NavLink>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto'>
          {(localStorage.getItem("auth_token") !== null ? <>
                <li className='nav-item'>
                  <NavLink
                    className='nav-link'
                    to='/reservas'>
                      Reservas
                  </NavLink>
                </li>

                <li className='nav-item'>
                  <NavLink className='nav-link' to='/habitaciones'>Habitaciones</NavLink>
                </li>

                <li className='nav-item'>
                <NavLink className='nav-link' onClick={() => {
                  localStorage.removeItem('auth_token');
                  window.location.replace("/");
                  }}>Salir</NavLink>
                </li>
              </>:null)

        }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
