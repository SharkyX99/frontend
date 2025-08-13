"use client";

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #9a79f5ef 0%, #7cbcf8ff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        filter: 'blur(1px)'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '15%',
        width: '150px',
        height: '150px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '50%',
        filter: 'blur(2px)'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        width: '80px',
        height: '80px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '50%',
        filter: 'blur(1px)'
      }}></div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem 1rem'
      }}>
        <div style={{
          maxWidth: '900px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'center'
        }}>
          {/* Profile Section */}
          <div style={{
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{
              position: 'relative',
              display: 'inline-block',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '6px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                margin: '0 auto'
              }}>
                <img
                  src="/images/sliders/image.png"
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '330px',
                height: '330px',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                animation: 'pulse 3s infinite'
              }}></div>
            </div>

            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              Nuttanawat Manakit
            </h1>
            <h2 style={{
              fontSize: '1.2rem',
              opacity: 0.8,
              marginBottom: '1rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              (WA)
            </h2>
            <p style={{
              fontSize: '1.1rem',
              fontWeight: '500',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '0.5rem 1.5rem',
              borderRadius: '50px',
              display: 'inline-block',
              marginBottom: '2rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Full Stack Developer & UI/UX Designer
            </p>
          </div>

          {/* Info Section */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '3rem',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#4f46e5',
              marginBottom: '1.5rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              About Me!!!!!
            </h3>
            <p style={{
              color: '#374151',
              lineHeight: '1.8',
              fontSize: '1.1rem',
              marginBottom: '2rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              I am a software developer who loves creating digital experiences using React, Next.js and designing beautiful and easy-to-use UI/UX. I help solve problems and improve the efficiency of your projects.
            </p>

            {/* Skills */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '1rem',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                ทักษะหลัก
              </h4>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {['React', 'Next.js', 'UI/UX Design', 'JavaScript', 'TypeScript', 'Node.js'].map((skill, index) => (
                  <span key={index} style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '25px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Button */}
            <div style={{ textAlign: 'center' }}>
              <Link href="/contact">
                <div
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '50px',
                    border: 'none',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    textAlign: 'center',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
                  }}
                >
                  📞 ติดต่อฉัน
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: translateX(-50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateX(-50%) scale(1.05);
            opacity: 0.7;
          }
          100% {
            transform: translateX(-50%) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
