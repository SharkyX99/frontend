"use client";

export default function AboutPage() {
  const services = [
    {
      title: "Web Development",
      description: "สร้างเว็บไซต์ที่ทันสมัยและตอบสนองได้ดีบนทุกอุปกรณ์",
      icon: "💻",
      features: ["Responsive Design", "Modern UI/UX", "Fast Loading", "SEO Optimized"],
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      title: "Digital Marketing",
      description: "เพิ่มยอดขายและการเข้าถึงผ่านช่องทางดิจิทัล",
      icon: "📈",
      features: ["Social Media", "SEO/SEM", "Content Marketing", "Analytics"],
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
    },
    {
      title: "IT Consulting",
      description: "ให้คำปรึกษาด้านเทคโนโลยีสารสนเทศแก่องค์กร",
      icon: "🔧",
      features: ["System Analysis", "Tech Strategy", "Process Optimization", "Training"],
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f8ff 0%, #ffffff 50%, #f5f0ff 100%)",
      }}
    >
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            My Services
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#6b7280",
              marginTop: "1.5rem",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            ให้บริการแบบมืออาชีพ ครอบคลุมตั้งแต่เว็บไซต์ แอป ไปจนถึงการตลาดดิจิทัล
          </p>
        </div>

        {/* Service Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                border: "1px solid #f3f4f6",
                transition: "all 0.3s ease",
                cursor: "default",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)";
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "#f0f4ff",
                  fontSize: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                {service.icon}
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "0.5rem",
                }}
              >
                {service.title}
              </h3>
              <p style={{ color: "#6b7280", marginBottom: "1rem" }}>{service.description}</p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "#4b5563",
                  fontSize: "0.95rem",
                  textAlign: "left",
                  maxWidth: "220px",
                  marginInline: "auto",
                }}
              >
                {service.features.map((feature, i) => (
                  <li key={i} style={{ marginBottom: "0.5rem" }}>
                    ✅ {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
