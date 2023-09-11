import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () =>{

  const navigate = useNavigate();

  function logout() { 
    if(sessionStorage.getItem('user')){
      sessionStorage.removeItem('user');
      navigate('/login');
    }
  }

    return(
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/login'}>
              react-laravel
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/login'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" onClick={logout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    );
}