import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link className="btn btn-primary mx-1" to="/login" role="button">
                  Login
                </Link>
                <Link className="btn btn-primary mx-1" to="/signup" role="button">
                  Signup
                </Link>
              </form>
            ) : (
              <form className="d-flex">
                <Link to="/profile"><i className="fa-solid fa-user-large fa-2xl mx-3 mt-3" style={{color: '#f0f2f5'}}></i></Link>
                <button onClick={handleLogout} className="btn btn-primary">
                  Logout
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
