"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow">
      <div className="container-fluid">
        {/* Logo */}
        <Link href="/" className="navbar-brand">
          <Image src="/images/sliders/logo.jpg" alt="Logo" width={40} height={40} />
        </Link>

        {/* Toggle Button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Home */}
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>

            {/* About */}
            <li className="nav-item">
              <Link href="/about" className="nav-link">
                About
              </Link>
            </li>

            {/* Service */}
            <li className="nav-item">
              <Link href="/service" className="nav-link">
                Service
              </Link>
            </li>

            {/* Contact */}
            <li className="nav-item">
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
            </li>

            {/* Login Button */}
            <li className="nav-item">
              <Link href="/login" className="nav-link btn btn-outline-light ms-3 px-3 py-1">
                Login
              </Link>
            </li>

            {/* Register Button */}
            <li className="nav-item">
              <Link href="/register" className="nav-link btn btn-outline-success ms-2 px-3 py-1">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
