"use client";
import Link from "next/link"; // ⚡️ ห้ามลืม import Link

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          
          <div className="col-md-4">
            <h5 className="mb-3">MyWebsite</h5>
            <p className="small text-secondary">
              เว็บไซต์ของเรารวบรวมบทความ ข่าวสาร และข้อมูลดี ๆ เพื่อคุณ.
            </p>
          </div>

          <div className="col-md-4">
            <h5 className="mb-3">ลิงก์</h5>
            <ul className="list-unstyled">
              <li><Link href="/" className="text-light text-decoration-none">หน้าหลัก</Link></li>
              <li><Link href="/about" className="text-light text-decoration-none">เกี่ยวกับเรา</Link></li>
              <li><Link href="/services" className="text-light text-decoration-none">บริการ</Link></li>
              <li><Link href="/contact" className="text-light text-decoration-none">ติดต่อ</Link></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5 className="mb-3">ติดตามเรา</h5>
            <div className="d-flex gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-light"
              >
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-light"
              >
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-light"
              >
                <i className="bi bi-instagram fs-4"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center">
          <small className="text-secondary">
            © {new Date().getFullYear()} MyWebsite. All Rights Reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}
