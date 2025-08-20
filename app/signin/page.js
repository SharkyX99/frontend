'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('http://itdev.cmtc.ac.th:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await res.json()

      if (data.token) {
        localStorage.setItem('token', data.token)
        router.push('/admin/users')
      } else {
        setError(data.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
      }
    } catch (err) {
      console.error(err)
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ')
    } finally {
      setIsLoading(false)
    }
  }

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
                    <div className="alert alert-danger border-0 rounded-3 mb-4">
                      <i className="fas fa-exclamation-circle me-2"></i>
                      {error}
                    </div>
                  )}

                  <div>
                    {/* Username */}
                    <div className="mb-4">
                      <label className="form-label fw-medium text-dark">
                        <i className="fas fa-user me-2 text-primary"></i>
                        ชื่อผู้ใช้
                      </label>
                      <input 
                        type="text" 
                        className="form-control form-control-lg border-2 rounded-3" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="กรอกชื่อผู้ใช้"
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                      <label className="form-label fw-medium text-dark">
                        <i className="fas fa-lock me-2 text-warning"></i>
                        รหัสผ่าน
                      </label>
                      <div className="position-relative">
                        <input 
                          type={showPassword ? 'text' : 'password'}
                          className="form-control form-control-lg border-2 rounded-3" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="กรอกรหัสผ่าน"
                          required
                        />
                        <button 
                          type="button"
                          className="btn position-absolute border-0 bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
                        >
                          <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-muted`}></i>
                        </button>
                      </div>
                    </div>

                    {/* Login Button */}
                    <div className="d-grid mb-3">
                      <button 
                        type="button" 
                        disabled={isLoading}
                        onClick={handleSubmit}
                        className="btn btn-lg fw-bold py-3 rounded-3"
                        style={{
                          background: 'linear-gradient(45deg, #667eea, #764ba2)',
                          border: 'none',
                          color: 'white'
                        }}
                      >
                        {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4">
                <small className="text-white-50">
                  <i className="fas fa-shield-alt me-1"></i>
                  ข้อมูลของคุณได้รับการปกป้องอย่างปลอดภัย
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Styles */}
        <style jsx>{`
          @keyframes float { 0%,100%{transform:translateY(0)}33%{transform:translateY(-30px)}66%{transform:translateY(15px)} }
          @keyframes pulse {0%{transform:scale(1)}100%{transform:scale(1.05)}}
        `}</style>
      </div>
    </>
  )
}
