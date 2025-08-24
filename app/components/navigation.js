'use client'
import { useState, useEffect } from 'react'
import { useAuth } from "../context/AuthContext"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { user, isAdmin, setUser } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const blackTextPages = ['/contact']

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setScrolled(scrollTop > 50)

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

  // ✅ ฟังก์ชันออกจากระบบ
  const handleSignOut = () => {
    localStorage.removeItem("token")
    setUser(null)
    router.push("/login")
  }

  const navLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/about', label: 'About', icon: '👤' },
    { href: '/service', label: 'Service', icon: '🛠️' },
    { href: '/contact', label: 'Contact', icon: '📞' }
  ]

  const getLinkColor = () => {
    if (scrolled) return '#000'
    if (blackTextPages.includes(pathname)) return '#000'
    if (pathname === '/') return '#fff'
    return '#000'
  }

  return (
    <>
      <style jsx>{`
        .glass-nav {
          position: fixed;   /* ✅ sticky */
          top: 0;
          left: 0;
          width: 100%;
          z-index: 999;
          background: rgba(255, 255, 255, 0.15); /* ใสแบบแก้ว */
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .glass-nav.scrolled {
          background: rgba(255, 255, 255, 0.9); /* เข้มขึ้นตอน scroll */
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }

        .nav-link {
          position: relative;
          transition: all 0.3s ease;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-link:hover {
          transform: translateY(-2px);
        }

        .nav-link.active {
          box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
        }

        .brand-logo {
          font-weight: 800;
          font-size: 1.5rem;
          text-shadow: 0 2px 10px rgba(0, 123, 255, 0.3);
        }

        .glass-btn {
          padding: 0.6rem 1.5rem;
          border-radius: 30px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          border: none;
        }

        .mobile-menu {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hamburger span {
          display: block;
          height: 3px;
          width: 30px;
          margin: 5px 0;
          background: currentColor;
          border-radius: 3px;
          transition: 0.3s;
        }

        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(6px, -6px); }
      `}</style>

      <nav className={`navbar navbar-expand-lg glass-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          {/* Brand */}
          <Link href="/" className="navbar-brand brand-logo" style={{ color: getLinkColor() }}>
            Thuchy
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler border-0 p-0"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className={`hamburger ${isOpen ? 'open' : ''}`} style={{ color: getLinkColor() }}>
              <span></span><span></span><span></span>
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
                    style={{ color: getLinkColor(), transition: 'color 0.3s' }}
                  >
                    <span className="btn-icon">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              ))}

              {user && isAdmin && (
                <li className="nav-item mx-2">
                  <Link href="/admin" className="nav-link" style={{ color: getLinkColor() }}>
                    ⚙️ Admin
                  </Link>
                </li>
              )}
            </ul>

            {/* Auth Buttons */}
            <div className="d-flex align-items-center gap-3">
              {!user ? (
                <>
                  <Link href="/login" className="glass-btn" style={{ color: getLinkColor() }}>
                    🔑 Login
                  </Link>
                  <Link href="/register" className="glass-btn" style={{ color: getLinkColor() }}>
                    📝 Register
                  </Link>
                </>
              ) : (
                <div className="dropdown">
                  <button
                    className="glass-btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: getLinkColor() }}
                  >
                    👋 {user.name || 'ผู้ใช้งาน'}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" href="/profile">
                        👤 ข้อมูลส่วนตัว
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleSignOut}>
                        🚪 ออกจากระบบ
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="mobile-menu position-absolute top-100 start-0 end-0 mt-2 mx-3 p-3">
              <div className="d-flex flex-column gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="nav-link"
                    style={{ color: '#000' }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                {user && isAdmin && (
                  <Link
                    href="/admin"
                    className="nav-link text-center"
                    style={{ color: '#000' }}
                    onClick={() => setIsOpen(false)}
                  >
                    ⚙️ Admin
                  </Link>
                )}
                {user && (
                  <button
                    className="glass-btn text-center"
                    onClick={() => { handleSignOut(); setIsOpen(false) }}
                  >
                    🚪 ออกจากระบบ
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
