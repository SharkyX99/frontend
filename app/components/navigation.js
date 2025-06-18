'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">🌟 My Website</div>
      <button 
        className="menu-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
      <ul className={`menu ${isOpen ? 'menu-open' : ''}`}>
        <li><Link href="/">หน้าแรก</Link></li>
        <li><Link href="/about">เกี่ยวกับ</Link></li>
        <li><Link href="/contact">ติดต่อ</Link></li>
      </ul>

      <style jsx>{`
        nav.navbar {
          padding: 1rem 2rem;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          background: linear-gradient(135deg, #fdfdfd, #f7f7f7);
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .logo {
          font-weight: bold;
          font-size: 1.8rem;
          color: #333;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .logo:hover {
          transform: scale(1.12);
        }

        .menu {
          display: flex;
          gap: 2.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .menu li a {
          font-size: 1.1rem;
          color: #333;
          text-decoration: none;
          position: relative;
          transition: color 0.3s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-block;
          padding: 5px 0;
        }

        .menu li a::after {
          content: "";
          position: absolute;
          width: 0%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #0070f3;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 2px;
        }

        .menu li a:hover {
          color: #0070f3;
          transform: scale(1.1);
        }

        .menu li a:hover::after {
          width: 100%;
        }

        .menu-toggle {
          display: none;
          font-size: 2rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #333;
        }

        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }
          .menu {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 60px;
            right: 1rem;
            background: white;
            border: 1px solid #eee;
            padding: 1rem 2rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            z-index: 999;
            animation: slideDown 0.3s ease-out;
          }
          .menu-open {
            display: flex;
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>
    </nav>
  );
}
