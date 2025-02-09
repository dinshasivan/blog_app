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
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link href="/" className="navbar-brand mx-auto d-lg-none headerStyle">
            Tasty Tales
          </Link>

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
            <ul className="navbar-nav ms-auto navFont">
              <li className="nav-item">
                <Link href="/blogs" className="nav-link margin-y">Blogs</Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" className="nav-link">Contact</Link>
              </li>
            </ul>

            <Link href="/" className="navbar-brand mx-auto d-none d-lg-block headerStyle">
              Tasty Tales
            </Link>

            <ul className="navbar-nav ms-auto">
              {user ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link navFont fw-bold" style={{ cursor: "pointer" }} onClick={handleUserRedirect}>
                      <PersonCircle size={24} className="me-2" />
                    </span>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link navFont btn btn-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link href="/register" className="nav-link navFont">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/login" className="nav-link navFont">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
