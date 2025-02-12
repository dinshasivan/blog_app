"use client"; // Enable client-side rendering

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PersonCircle } from "react-bootstrap-icons"; // Import Bootstrap icon

const NavBar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user data from local storage or API
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Parse stored user data
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    setUser(null);
    router.push("/"); // Redirect to home after logout
  };

  const handleUserRedirect = () => {
    router.push("/user"); // Redirect to user profile page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Brand (Mobile) */}
        <Link href="/" className="navbar-brand d-lg-none fw-bold headerStyle">
          Tasty Tales
        </Link>

        {/* Toggle Button (Mobile View) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left-Side Links */}
          <ul className="navbar-nav me-auto text-uppercase fw-bold">
            <li className="nav-item">
              <Link href="/blogs" className="nav-link text-dark">Blogs</Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link text-dark">About</Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link text-dark">Contact</Link>
            </li>
          </ul>

          {/* Brand (Desktop) */}
          <Link href="/" className="navbar-brand d-none d-lg-block fw-semi-bol headerStyle fs-3">
            Tasty Tales
          </Link>

          {/* Right-Side User Auth Links */}
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link fw-bold" style={{ cursor: "pointer" }} onClick={handleUserRedirect}>
                    <PersonCircle size={24} className="text-primary me-2" />
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger fw-bold text-white px-3" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/register" className="nav-link fw-bold btn btn-outline-primary mx-1">Register</Link>
                </li>
                <li className="nav-item">
                  <Link href="/login" className="nav-link btn fw-bold btn-primary mx-1">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
