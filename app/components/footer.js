"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5  position-relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      
      <div className="container position-relative">
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-section">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
                     style={{width: '40px', height: '40px'}}>
                  <i className="bi bi-globe2 text-white fs-5"></i>
                </div>
                <h5 className="mb-0 fw-bold text-primary">MyWebsite</h5>
              </div>
              <p className="text-light mb-4 opacity-75">
                เว็บไซต์ของเรารวบรวมบทความ ข่าวสาร และข้อมูลดี ๆ เพื่อคุณ
                สร้างสรรค์เนื้อหาคุณภาพเพื่อการเรียนรู้และพัฒนา
              </p>
              <div className="d-flex align-items-center text-light opacity-75">
                <i className="bi bi-envelope me-2"></i>
                <small>nuttanawat6933@gmail.com</small>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-3 col-6">
            <div className="footer-section">
              <h6 className="mb-3 fw-bold text-white border-bottom border-primary pb-2 d-inline-block">
                เมนูหลัก
              </h6>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <Link href="/" className="text-light text-decoration-none d-flex align-items-center footer-link">
                    <i className="bi bi-house me-2 small"></i>
                    หน้าหลัก
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/about" className="text-light text-decoration-none d-flex align-items-center footer-link">
                    <i className="bi bi-info-circle me-2 small"></i>
                    เกี่ยวกับเรา
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/services" className="text-light text-decoration-none d-flex align-items-center footer-link">
                    <i className="bi bi-gear me-2 small"></i>
                    บริการ
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/contact" className="text-light text-decoration-none d-flex align-items-center footer-link">
                    <i className="bi bi-telephone me-2 small"></i>
                    ติดต่อ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          

          {/* Social Media & Newsletter */}
          <div className="col-lg-4 col-md-12">
            <div className="footer-section">
              <h6 className="mb-3 fw-bold text-white border-bottom border-primary pb-2 d-inline-block">
                ติดตามเรา
              </h6>
              
              {/* Social Media */}
              <div className="d-flex gap-2 mb-4">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-light btn-sm rounded-circle social-btn"
                  style={{width: '45px', height: '45px'}}
                  aria-label="Facebook"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-light btn-sm rounded-circle social-btn"
                  style={{width: '45px', height: '45px'}}
                  aria-label="Twitter"
                >
                  <i className="bi bi-twitter"></i>
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-light btn-sm rounded-circle social-btn"
                  style={{width: '45px', height: '45px'}}
                  aria-label="Instagram"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-light btn-sm rounded-circle social-btn"
                  style={{width: '45px', height: '45px'}}
                  aria-label="YouTube"
                >
                  <i className="bi bi-youtube"></i>
                </a>
                <a
                  href="https://line.me"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-success btn-sm rounded-circle social-btn"
                  style={{width: '45px', height: '45px'}}
                  aria-label="LINE"
                >
                  <i className="bi bi-line"></i>
                </a>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-dark bg-opacity-50 p-3 rounded">
                <h6 className="small mb-2 text-primary">📧 รับข่าวสารล่าสุด</h6>
                <p className="small text-light opacity-75 mb-3">
                  สมัครรับจดหมายข่าวเพื่อรับข้อมูลและโปรโมชั่นพิเศษ
                </p>
                <div className="input-group input-group-sm">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="อีเมลของคุณ"
                    aria-label="Email subscription"
                  />
                  <button className="btn btn-primary" type="button">
                    <i className="bi bi-send"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="border-top border-secondary position-relative">
              <div className="position-absolute top-50 start-50 translate-middle">
                <div className="bg-dark px-3">
                  <i className="bi bi-heart-fill text-danger"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-4">
          <div className="col-lg-6">
            <div className="d-flex align-items-center text-light opacity-75">
              <i className="bi bi-c-circle me-2"></i>
              <small>
                © {new Date().getFullYear()} <strong className="text-primary">MyWebsite</strong>. 
                สงวนสิทธิ์ทุกประการ
              </small>
            </div>
          </div>
          <div className="col-lg-6 text-lg-end mt-2 mt-lg-0">
            <small className="text-light opacity-75">
              Made with <i className="bi bi-heart-fill text-danger small"></i> in Thailand
            </small>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .footer-link {
          transition: all 0.3s ease;
          opacity: 0.8;
        }
        .footer-link:hover {
          opacity: 1;
          color: #0d6efd !important;
          transform: translateX(5px);
        }
        .social-btn {
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .social-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        .footer-section {
          height: 100%;
        }
      `}</style>
    </footer>
  );
}