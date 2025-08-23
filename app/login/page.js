'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // สมมติ login แล้วเก็บ role ไว้ด้วย

    if (!token) {
      router.push('/login');  // ✅ เปลี่ยนให้ไปหน้า login
      return;
    }

    if (role !== 'admin') {
      router.push('/'); // หรือ redirect ไปหน้าอื่นที่ไม่ใช่ admin
      return;
    }

    // ...getUsers() ตามเดิม...
  }, []);

  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
      />
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js"
      ></script>

      <div className="min-vh-100 d-flex align-items-center justify-content-center position-relative"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          overflow: 'hidden'
        }}>

        {/* Animated Background Elements */}
        <div className="position-absolute w-100 h-100" style={{ zIndex: 0 }}>
          <div className="floating-shape position-absolute"
            style={{
              width: '200px',
              height: '200px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              top: '10%',
              left: '10%',
              animation: 'float 6s ease-in-out infinite'
            }}></div>
          <div className="floating-shape position-absolute"
            style={{
              width: '150px',
              height: '150px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              top: '70%',
              right: '10%',
              animation: 'float 8s ease-in-out infinite reverse'
            }}></div>
          <div className="floating-shape position-absolute"
            style={{
              width: '100px',
              height: '100px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              top: '20%',
              right: '20%',
              animation: 'float 7s ease-in-out infinite'
            }}></div>
        </div>

        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5 col-xl-4">

              {/* Login Card */}
              <div className="card shadow-lg border-0 rounded-4 overflow-hidden"
                style={{
                  backdropFilter: 'blur(10px)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
                }}>

                {/* Card Header */}
                <div className="card-header bg-transparent border-0 text-center py-4">
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 shadow-lg"
                    style={{
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      animation: 'pulse 2s ease-in-out infinite alternate'
                    }}>
                    <i className="fas fa-lock fa-2x text-white"></i>
                  </div>
                  <h3 className="mb-0 fw-bold" style={{ color: '#2d3748' }}>
                    เข้าสู่ระบบ
                  </h3>
                  <p className="text-muted mb-0 mt-2">
                    ยินดีต้อนรับกลับมา
                  </p>
                </div>

                {/* Card Body */}
                <div className="card-body px-4 pb-4">

                  {/* Error Alert */}
                  {error && (
                    <div className="alert alert-danger border-0 rounded-3 mb-4"
                      style={{
                        background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                        color: 'white',
                        animation: 'slideInDown 0.3s ease'
                      }}>
                      <i className="fas fa-exclamation-circle me-2"></i>
                      {error}
                    </div>
                  )}

                  <div>

                    {/* Username Field */}
                    <div className="mb-4">
                      <label htmlFor="username" className="form-label fw-medium text-dark">
                        <i className="fas fa-user me-2 text-primary"></i>
                        ชื่อผู้ใช้
                      </label>
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control form-control-lg border-2 rounded-3"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="กรอกชื่อผู้ใช้"
                          required
                          style={{
                            paddingLeft: '50px',
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#667eea'
                            e.target.style.boxShadow = '0 0 0 0.25rem rgba(102, 126, 234, 0.25)'
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e9ecef'
                            e.target.style.boxShadow = 'none'
                          }}
                        />
                        <i className="fas fa-user position-absolute text-muted"
                          style={{
                            left: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)'
                          }}></i>
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                      <label htmlFor="password" className="form-label fw-medium text-dark">
                        <i className="fas fa-lock me-2 text-warning"></i>
                        รหัสผ่าน
                      </label>
                      <div className="position-relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="form-control form-control-lg border-2 rounded-3"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="กรอกรหัสผ่าน"
                          required
                          style={{
                            paddingLeft: '50px',
                            paddingRight: '50px',
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#667eea'
                            e.target.style.boxShadow = '0 0 0 0.25rem rgba(102, 126, 234, 0.25)'
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e9ecef'
                            e.target.style.boxShadow = 'none'
                          }}
                        />
                        <i className="fas fa-lock position-absolute text-muted"
                          style={{
                            left: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)'
                          }}></i>
                        <button
                          type="button"
                          className="btn position-absolute border-0 bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 10
                          }}
                        >
                          <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-muted`}></i>
                        </button>
                      </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="rememberMe" />
                        <label className="form-check-label text-muted" htmlFor="rememberMe">
                          จดจำการเข้าสู่ระบบ
                        </label>
                      </div>
                      <a href="#" className="text-decoration-none" style={{ color: '#667eea' }}>
                        <small>ลืมรหัสผ่าน?</small>
                      </a>
                    </div>

                    {/* Login Button */}
                    <div className="d-grid mb-3">
                      <button
                        type="button"
                        disabled={isLoading}

                        className="btn btn-lg fw-bold py-3 rounded-3 position-relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(45deg, #667eea, #764ba2)',
                          border: 'none',
                          color: 'white',
                          boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                          transition: 'all 0.3s ease',
                          transform: isLoading ? 'scale(0.98)' : 'scale(1)'
                        }}
                        onMouseOver={(e) => {
                          if (!isLoading) {
                            e.target.style.transform = 'translateY(-2px)'
                            e.target.style.boxShadow = '0 12px 30px rgba(102, 126, 234, 0.4)'
                          }
                        }}
                        onMouseOut={(e) => {
                          if (!isLoading) {
                            e.target.style.transform = 'translateY(0)'
                            e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)'
                          }
                        }}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            <i className="fas fa-circle-notch fa-spin me-2"></i>
                            กำลังเข้าสู่ระบบ...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-sign-in-alt me-2"></i>
                            เข้าสู่ระบบ
                            <i className="fas fa-arrow-right ms-2"></i>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Demo Credentials */}
                    {/* ปุ่ม Login Admin แทนข้อมูลทดสอบ */}
                    {/* Demo Credentials */}
                    <div className="d-grid mt-3">
                      <button
                        type="button"
                        className="btn btn-outline-info fw-bold py-3 rounded-3"
                        style={{
                          border: '2px solid #17a2b8',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => {
                          router.push('/signin');   // ✅ กดแล้วไปหน้า signin
                        }}
                      >
                        <i className="fas fa-user-shield me-2"></i>
                        Login Admin
                      </button>
                    </div>


                    {/* Register Link */}
                    <div className="text-center mt-4">
                      <small className="text-muted">
                        ยังไม่มีบัญชี?
                        <a href="/register" className="text-decoration-none fw-medium ms-1" style={{ color: '#667eea' }}>
                          <i className="fas fa-user-plus me-1"></i>
                          สมัครสมาชิก
                        </a>
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center mt-4">
                <small className="text-white-50">
                  <i className="fas fa-shield-alt me-1"></i>
                  ข้อมูลของคุณได้รับการปกป้องอย่างปลอดภัย
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes float {
              0%, 100% { 
                transform: translateY(0px) rotate(0deg); 
              }
              33% { 
                transform: translateY(-30px) rotate(5deg); 
              }
              66% { 
                transform: translateY(15px) rotate(-5deg); 
              }
            }
            
            @keyframes pulse {
              0% { 
                transform: scale(1); 
              }
              100% { 
                transform: scale(1.05); 
              }
            }
            
            @keyframes slideInDown {
              from {
                transform: translateY(-100%);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
            
            .floating-shape {
              backdrop-filter: blur(10px);
            }
            
            .form-control:focus {
              transform: translateY(-1px);
            }
            
            .card {
              transition: transform 0.3s ease;
            }
            
            .card:hover {
              transform: translateY(-5px);
            }
            
            .btn:active {
              transform: scale(0.95) !important;
            }
            
            /* Glassmorphism effect */
            .card::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
              border-radius: inherit;
              pointer-events: none;
            }
            
            /* Custom scrollbar */
            ::-webkit-scrollbar {
              width: 8px;
            }
            
            ::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 4px;
            }
            
            ::-webkit-scrollbar-thumb {
              background: linear-gradient(45deg, #667eea, #764ba2);
              border-radius: 4px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(45deg, #764ba2, #667eea);
            }
          `
        }} />
      </div>
    </>
  )
}