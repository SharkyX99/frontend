'use client'
import { useState, useEffect } from 'react'
import { useAuth } from "../context/AuthContext"
import Link from 'next/link'
import Image from 'next/image'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { user, isAdmin } = useAuth()

  // ตรวจสอบการ scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setScrolled(scrollTop > 50)
      
      // ตรวจสอบ section ที่กำลัง active
      const sections = ['home', 'about', 'service', 'contact']
      sections.forEach(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/about', label: 'About', icon: '👤' },
    { href: '/service', label: 'Service', icon: '🛠️' },
    { href: '/contact', label: 'Contact', icon: '📞' }
  ]

  return (
    <>
      {/* Custom Styles */}
      <style jsx>{`
        .glass-nav {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
        }

        .glass-nav.scrolled {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }

        .nav-link {
          position: relative;
          transition: all 0.3s ease;
          color: rgba(0, 0, 0, 0.8);
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-link:hover {
          color: #007bff;
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 123, 255, 0.2);
        }

        .nav-link.active {
          background: rgba(0, 123, 255, 0.1);
          color: #007bff;
          box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #007bff, #0056b3);
          transition: width 0.3s ease;
        }

        .nav-link.active::after {
          width: 80%;
        }

        .brand-logo {
          background: linear-gradient(135deg, #007bff, #0056b3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
          font-size: 1.5rem;
          text-shadow: 0 2px 10px rgba(0, 123, 255, 0.3);
        }

        .mobile-menu {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hamburger {
          width: 30px;
          height: 20px;
          position: relative;
          transform: rotate(0deg);
          transition: .5s ease-in-out;
          cursor: pointer;
        }

        .hamburger span {
          display: block;
          position: absolute;
          height: 3px;
          width: 100%;
          background: #007bff;
          border-radius: 9px;
          opacity: 1;
          left: 0;
          transform: rotate(0deg);
          transition: .25s ease-in-out;
        }

        .hamburger span:nth-child(1) {
          top: 0px;
        }

        .hamburger span:nth-child(2),
        .hamburger span:nth-child(3) {
          top: 8px;
        }

        .hamburger span:nth-child(4) {
          top: 16px;
        }

        .hamburger.open span:nth-child(1) {
          top: 8px;
          width: 0%;
          left: 50%;
        }

        .hamburger.open span:nth-child(2) {
          transform: rotate(45deg);
        }

        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg);
        }

        .hamburger.open span:nth-child(4) {
          top: 8px;
          width: 0%;
          left: 50%;
        }

        .auth-btn {
          background: linear-gradient(135deg, #007bff, #0056b3);
          border: none;
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 25px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
        }

        .auth-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
          color: white;
        }

        .admin-btn {
          background: linear-gradient(135deg, #28a745, #20c997);
          color: white;
        }

        .admin-btn:hover {
          box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
        }
      `}</style>

      <nav className={`navbar navbar-expand-lg fixed-top glass-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          {/* Brand */}
          <Link href="/" className="navbar-brand brand-logo">
            Thuchy
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler border-0 p-0"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className={`hamburger ${isOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mx-auto">
              {navLinks.map((link) => (
                <li key={link.href} className="nav-item mx-2">
                  <Link 
                    href={link.href} 
                    className={`nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                  >
                    <span className="me-1">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
              
              {user && isAdmin && (
                <li className="nav-item mx-2">
                  <Link href="/admin" className="nav-link admin-btn">
                    <span className="me-1">⚙️</span>
                    Admin
                  </Link>
                </li>
              )}
            </ul>

            {/* Auth Buttons */}
            <div className="d-flex gap-2">
              {!user ? (
                <>
                  <Link href="/login" className="auth-btn">
                    <span className="me-1">🔑</span>
                    Login
                  </Link>
                  <Link href="/register" className="auth-btn">
                    <span className="me-1">📝</span>
                    Register
                  </Link>
                </>
              ) : (
                <div className="dropdown">
                  <button
                    className="auth-btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <span className="me-1">👤</span>
                    {user.name || 'User'}
                  </button>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" href="/profile">Profile</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={() => {}}>Logout</button></li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="mobile-menu position-absolute top-100 start-0 end-0 mt-2 mx-3 p-3">
              <div className="d-flex flex-column gap-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className={`nav-link text-center ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="me-2">{link.icon}</span>
                    {link.label}
                  </Link>
                ))}
                
                {user && isAdmin && (
                  <Link 
                    href="/admin" 
                    className="nav-link admin-btn text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="me-2">⚙️</span>
                    Admin
                  </Link>
                )}
                
                <hr className="my-2" />
                
                {!user ? (
                  <div className="d-flex gap-2">
                    <Link href="/login" className="auth-btn flex-fill text-center" onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                    <Link href="/register" className="auth-btn flex-fill text-center" onClick={() => setIsOpen(false)}>
                      Register
                    </Link>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-2">
                    <span className="text-center text-muted">Hello, {user.name}</span>
                    <Link href="/profile" className="auth-btn text-center" onClick={() => setIsOpen(false)}>
                      Profile
                    </Link>
                    <button className="auth-btn" onClick={() => setIsOpen(false)}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}