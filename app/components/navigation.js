'use client'

import { useState } from 'react'
import { useAuth } from "../context/AuthContext"
import Link from 'next/link'
import Image from 'next/image'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAdmin } = useAuth() // ดึง user ด้วย

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
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link href="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link href="/about" className="nav-link">About</Link></li>
            <li className="nav-item"><Link href="/service" className="nav-link">Service</Link></li>
            <li className="nav-item"><Link href="/contact" className="nav-link">Contact</Link></li>

            {user && isAdmin && (
              <li className="nav-item">
                <Link href="/admin/users" className="nav-link btn btn-warning ms-3 px-3 py-1">
                  Admin
                </Link>
              </li>
            )}

            {!user && (
              <>
                <li className="nav-item">
                  <Link href="/login" className="nav-link btn btn-outline-light ms-3 px-3 py-1">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/register" className="nav-link btn btn-outline-success ms-2 px-3 py-1">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
