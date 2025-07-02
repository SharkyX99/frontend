"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function Navigation() {  // เปลี่ยนจาก navigation() เป็น Navigation()
  const [isOpen, setIsOpen] = useState(false);
  // ... rest of the code

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">
          <Image src="/images/sliders/logo.jpg" alt="Logo" width={40} height={40} />
        </Link>

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

        <div className={`navbar-collapse collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about/page.js" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/services/page.js" className="nav-link">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact/page.js" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
