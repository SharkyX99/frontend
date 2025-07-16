"use client";

import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f8ff 0%, #ffffff 50%, #f5f0ff 100%)",
      }}
    >
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 1rem",
        }}
      >
        {/* Header Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "4rem",
          }}
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "1rem",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Nuttanawat Manakit
            </h1>
            <div
              style={{
                position: "absolute",
                bottom: "-8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "96px",
                height: "4px",
                background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                borderRadius: "2px",
              }}
            ></div>
          </div>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#6b7280",
              marginTop: "2rem",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Let's connect and stay in touch
          </p>
        </div>

        {/* Contact Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginBottom: "4rem",
          }}
        >
          {/* Phone Card */}
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              padding: "2rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #f3f4f6",
              transition: "all 0.3s ease",
              textAlign: "center",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 25px -3px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div
              style={{
                background: "#dbeafe",
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                fontSize: "1.5rem",
              }}
            >
              📞
            </div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "0.5rem",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Phone
            </h3>
            <p
              style={{
                color: "#6b7280",
                marginBottom: "1rem",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Call me anytime
            </p>
            <a
              href="tel:095-630-6933"
              style={{
                fontSize: "1.125rem",
                fontWeight: "500",
                color: "#2563eb",
                textDecoration: "none",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              095-630-6933
            </a>
          </div>

          {/* Facebook Card */}
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              padding: "2rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #f3f4f6",
              transition: "all 0.3s ease",
              textAlign: "center",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 25px -3px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div
              style={{
                background: "#3b5998",
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                color: "white",
                fontSize: "2rem",
              }}
            >
              <FaFacebookF />
            </div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "0.5rem",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Facebook
            </h3>
            <p
              style={{
                color: "#6b7280",
                marginBottom: "1rem",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Connect with me
            </p>
            <a
              href="https://www.facebook.com/?locale=th_TH"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "1.125rem",
                fontWeight: "500",
                color: "#2563eb",
                textDecoration: "none",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Thuchy Nmk
            </a>
          </div>

          {/* Instagram Card */}
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              padding: "2rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #f3f4f6",
              transition: "all 0.3s ease",
              textAlign: "center",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 25px -3px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div
              style={{
                background:
                  "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                color: "white",
                fontSize: "2rem",
              }}
            >
              <FaInstagram />
            </div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "0.5rem",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Instagram
            </h3>
            <p
              style={{
                color: "#6b7280",
                marginBottom: "1rem",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Follow my journey
            </p>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "1.125rem",
                fontWeight: "500",
                color: "#7c3aed",
                textDecoration: "none",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Thuchy Nmk
            </a>
          </div>
        </div>

        {/* Additional Contact Options */}
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "2rem",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Other Ways to Reach Me
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#f3f4f6",
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e7eb")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#f3f4f6")}
            >
              <span>📧</span>
              <span style={{ color: "#374151" }}>Email</span>
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#f3f4f6",
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e7eb")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#f3f4f6")}
            >
              <span>📍</span>
              <span style={{ color: "#374151" }}>Location</span>
            </button>
          </div>
        </div>

        {/* Footer Message */}
        <div style={{ marginTop: "4rem", textAlign: "center" }}>
          <div
            style={{
              background: "linear-gradient(90deg, #f0f8ff, #f5f0ff)",
              borderRadius: "1rem",
              padding: "2rem",
              border: "1px solid #f3f4f6",
            }}
          >
            <p
              style={{
                color: "#374151",
                fontSize: "1.125rem",
                lineHeight: "1.6",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              I'm always excited to connect with new people and explore
              opportunities. <br />
              Feel free to reach out through any of the channels above!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
