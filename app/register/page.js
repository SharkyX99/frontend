'use client';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { registerUser } from '../service/auth';

export default function RegisterUserPage() {
  const router = useRouter();

  // --- State Variables ---
  const [firstname, setFirstname] = useState('')
  const [fullname, setFullname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [address, setAddress] = useState('')
  const [sex, setSex] = useState('')
  const [birthday, setBirthday] = useState('')

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [swalLoaded, setSwalLoaded] = useState(false)

  // --- Utility: Check Swal Loaded ---
  useEffect(() => {
    const checkSwal = () => {
      if (typeof window !== 'undefined' && window.Swal) {
        setSwalLoaded(true)
      } else {
        setTimeout(checkSwal, 100)
      }
    }
    checkSwal()
  }, [])

  // --- Logic: Validation ---
  const validateForm = () => {
    const newErrors = {}

    if (!firstname.trim()) newErrors.firstname = 'กรุณาเลือกคำนำหน้าชื่อ'
    if (!fullname.trim()) newErrors.fullname = 'กรุณากรอกชื่อ'
    if (!lastname.trim()) newErrors.lastname = 'กรุณากรอกนามสกุล'
    if (!username.trim()) newErrors.username = 'กรุณากรอก Username'
    if (!password.trim()) newErrors.password = 'กรุณากรอกรหัสผ่าน'
    if (password.length < 6) newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
    if (password !== confirmPassword) newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน'
    if (!address.trim()) newErrors.address = 'กรุณากรอกที่อยู่'
    if (!sex) newErrors.sex = 'กรุณาเลือกเพศ'
    if (!birthday) newErrors.birthday = 'กรุณาเลือกวันเกิด'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // --- Logic: Reset Form ---
  const resetForm = () => {
    setFirstname('')
    setFullname('')
    setLastname('')
    setUsername('')
    setPassword('')
    setConfirmPassword('')
    setAddress('')
    setSex('')
    setBirthday('')
    setErrors({})
  }

  // --- Logic: Alerts ---
  const showSweetAlert = () => {
    if (swalLoaded && window.Swal) {
      window.Swal.fire({
        title: '🎉 ลงทะเบียนสำเร็จ!',
        text: `ยินดีต้อนรับ คุณ${firstname} ${fullname} ${lastname}`,
        icon: 'success',
        confirmButtonText: 'เข้าสู่ระบบ', // ปรับข้อความปุ่ม
        confirmButtonColor: '#667eea',
        background: '#ffffff',
        color: '#333333',
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        customClass: {
          title: 'swal-title',
          content: 'swal-content',
          confirmButton: 'swal-confirm-btn'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          resetForm()
          router.push('/login'); // เพิ่ม Logic: เมื่อสำเร็จให้ไปหน้า Login
        }
      })
    } else {
      alert('ลงทะเบียนสำเร็จ!')
      resetForm()
      router.push('/login');
    }
  }

  const showErrorAlert = (errorMessage = 'ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง') => {
    if (swalLoaded && window.Swal) {
      window.Swal.fire({
        title: '⚠️ เกิดข้อผิดพลาด!',
        text: errorMessage, // แสดง Error จริงจาก Backend ถ้ามี
        icon: 'error',
        confirmButtonText: 'ลองใหม่',
        confirmButtonColor: '#dc3545',
        background: '#ffffff',
        color: '#333333',
        showClass: { popup: 'animate__animated animate__shakeX' },
        customClass: { confirmButton: 'swal-confirm-btn' }
      })
    } else {
      alert(errorMessage)
    }
  }

  const showValidationAlert = () => {
    if (swalLoaded && window.Swal) {
      window.Swal.fire({
        title: '📝 ข้อมูลไม่ครบถ้วน',
        text: 'กรุณาตรวจสอบและกรอกข้อมูลให้ครบถ้วน',
        icon: 'warning',
        confirmButtonText: 'ตรวจสอบอีกครั้ง',
        confirmButtonColor: '#ffc107',
        background: '#ffffff',
        color: '#333333',
        customClass: {
          confirmButton: 'swal-confirm-btn'
        }
      })
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    }
  }

  // --- Logic: Handle Submit (จุดที่เปลี่ยนหลัก) ---
  const handleSubmit = async () => {
    // 1. ตรวจสอบข้อมูลก่อนส่ง
    if (!validateForm()) {
      showValidationAlert();
      return;
    }

    try {
      setSubmitting(true)

      // 2. เตรียมข้อมูล Payload ให้ตรงกับ Backend
      const payload = {
        firstname,
        fullname,
        lastname,
        username,
        password,
        address,
        sex,
        birthday,
        // เพิ่ม role หรือ field อื่นๆ ถ้า Backend ต้องการ
      }

      // 3. เรียก API จริงผ่าน Service
      const response = await registerUser(payload)

      // 4. ถ้าสำเร็จ (สมมติว่า registerUser จะ throw error ถ้าไม่สำเร็จ)
      showSweetAlert()

    } catch (err) {
      console.error("Registration Error:", err)

      // ดึง message จาก error response ถ้ามี (ตัวอย่าง structure ทั่วไป)
      const message = err.response?.data?.message || err.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ';
      showErrorAlert(message)

    } finally {
      setSubmitting(false)
    }
  }

  // --- UI Render (เหมือนเดิม 100%) ---
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
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        rel="stylesheet"
      />
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js"
      ></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.10.1/sweetalert2.all.min.js"
        onLoad={() => setSwalLoaded(true)}
      ></script>

      <div className="min-vh-100" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.3
        }}></div>

        <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-8">

              {/* Header */}
              <div className="text-center mb-5">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4 shadow-lg"
                  style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                    animation: 'float 3s ease-in-out infinite'
                  }}>
                  <i className="fas fa-user-plus fa-2x text-white"></i>
                </div>
                <h1 className="display-5 fw-bold text-white mb-3">
                  สมัครสมาชิก
                </h1>
                <p className="lead text-white-50 mb-0">
                  กรอกข้อมูลให้ครบถ้วนเพื่อเริ่มต้นการใช้งาน
                </p>
              </div>

              {/* Main Form Card */}
              <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="card-body p-0">

                  {/* Form Header */}
                  <div className="bg-gradient p-4 text-white"
                    style={{ background: 'linear-gradient(45deg, #667eea, #764ba2)' }}>
                    <div className="row align-items-center">
                      <div className="col">
                        <h4 className="mb-1">
                          <i className="fas fa-edit me-2"></i>
                          ข้อมูลการลงทะเบียน
                        </h4>
                        <small className="opacity-75">
                          กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <form>
                      {/* เปลี่ยน div เป็น form เพื่อความถูกต้องทาง semantics แต่ถ้าจะ keep div ก็ได้ */}
                      {/* แต่ใน UI React ปกติใช้ div ครอบ input ก็ทำงานได้ ถ้ายึดตามโค้ดเก่าใช้ div */}
                      <div>

                        {/* Personal Information Section */}
                        <div className="mb-5">
                          <div className="d-flex align-items-center mb-4 pb-2 border-bottom">
                            <div className="rounded-3 p-2 me-3" style={{ backgroundColor: '#e3f2fd' }}>
                              <i className="fas fa-user text-primary"></i>
                            </div>
                            <div>
                              <h5 className="mb-0 text-dark fw-semibold">ข้อมูลส่วนตัว</h5>
                              <small className="text-muted">กรอกข้อมูลพื้นฐานของคุณ</small>
                            </div>
                          </div>

                          <div className="row g-4">
                            <div className="col-md-4">
                              <label className="form-label fw-medium">
                                <i className="fas fa-crown me-1 text-warning"></i>
                                คำนำหน้าชื่อ <span className="text-danger">*</span>
                              </label>
                              <select
                                className={`form-select form-select-lg ${errors.firstname ? 'is-invalid' : ''}`}
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                style={{
                                  borderRadius: '12px',
                                  border: '2px solid #e9ecef',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <option value="">เลือกคำนำหน้า</option>
                                <option value="นาย">นาย</option>
                                <option value="นาง">นาง</option>
                                <option value="นางสาว">นางสาว</option>
                              </select>
                              {errors.firstname && (
                                <div className="invalid-feedback">
                                  <i className="fas fa-exclamation-circle me-1"></i>
                                  {errors.firstname}
                                </div>
                              )}
                            </div>

                            <div className="col-md-4">
                              <label className="form-label fw-medium">
                                <i className="fas fa-signature me-1 text-success"></i>
                                ชื่อ <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className={`form-control form-control-lg ${errors.fullname ? 'is-invalid' : ''}`}
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                placeholder="กรอกชื่อของคุณ"
                                style={{
                                  borderRadius: '12px',
                                  border: '2px solid #e9ecef',
                                  transition: 'all 0.3s ease'
                                }}
                              />
                              {errors.fullname && (
                                <div className="invalid-feedback">
                                  <i className="fas fa-exclamation-circle me-1"></i>
                                  {errors.fullname}
                                </div>
                              )}
                            </div>

                            <div className="col-md-4">
                              <label className="form-label fw-medium">
                                <i className="fas fa-signature me-1 text-info"></i>
                                นามสกุล <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className={`form-control form-control-lg ${errors.lastname ? 'is-invalid' : ''}`}
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                placeholder="กรอกนามสกุลของคุณ"
                                style={{
                                  borderRadius: '12px',
                                  border: '2px solid #e9ecef',
                                  transition: 'all 0.3s ease'
                                }}
                              />
                              {errors.lastname && (
                                <div className="invalid-feedback">
                                  <i className="fas fa-exclamation-circle me-1"></i>
                                  {errors.lastname}
                                </div>
                              )}
                            </div>

                            <div className="col-md-6">
                              <label className="form-label fw-medium">
                                <i className="fas fa-venus-mars me-1 text-purple"></i>
                                เพศ <span className="text-danger">*</span>
                              </label>
                              <select
                                className={`form-select form-select-lg ${errors.sex ? 'is-invalid' : ''}`}
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                                style={{
                                  borderRadius: '12px',
                                  border: '2px solid #e9ecef',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <option value="">เลือกเพศ</option>
                                <option value="ชาย">ชาย</option>
                                <option value="หญิง">หญิง</option>
                                <option value="อื่นๆ">อื่นๆ</option>
                              </select>
                              {errors.sex && (
                                <div className="invalid-feedback">
                                  <i className="fas fa-exclamation-circle me-1"></i>
                                  {errors.sex}
                                </div>
                              )}
                            </div>

                            <div className="col-md-6">
                              <label className="form-label fw-medium">
                                <i className="fas fa-birthday-cake me-1 text-pink"></i>
                                วันเกิด <span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
                                className={`form-control form-control-lg ${errors.birthday ? 'is-invalid' : ''}`}
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                style={{
                                  borderRadius: '12px',
                                  border: '2px solid #e9ecef',
                                  transition: 'all 0.3s ease'
                                }}
                              />
                              {errors.birthday && (
                                <div className="invalid-feedback">
                                  <i className="fas fa-exclamation-circle me-1"></i>
                                  {errors.birthday}
                                </div>
                              )}
                            </div>

                            <div className="col-12">
                              <label className="form-label fw-medium">
                                <i className="fas fa-map-marker-alt me-1 text-danger"></i>
                                ที่อยู่ <span className="text-danger">*</span>
                              </label>
                              <textarea
                                className={`form-control form-control-lg ${errors.address ? 'is-invalid' : ''}`}
                                rows={3}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="กรอกที่อยู่ของคุณ..."
                                style={{
                                  borderRadius: '12px',
                                  border: '2px solid #e9ecef',
                                  transition: 'all 0.3s ease',
                                  resize: 'none'
                                }}
                              ></textarea>
                              {errors.address && (
                                <div className="invalid-feedback">
                                  <i className="fas fa-exclamation-circle me-1"></i>
                                  {errors.address}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Account Information Section */}
                        <div className="mb-5">
                          <div className="d-flex align-items-center mb-4 pb-2 border-bottom">
                            <div className="rounded-3 p-2 me-3" style={{ backgroundColor: '#f3e5f5' }}>
                              <i className="fas fa-key text-purple"></i>
                            </div>
                            <div>
                              <h5 className="mb-0 text-dark fw-semibold">ข้อมูลบัญชีผู้ใช้</h5>
                              <small className="text-muted">ตั้งค่าข้อมูลสำหรับเข้าสู่ระบบ</small>
                            </div>
                          </div>

                          <div className="row g-4">
                            <div className="col-12">
                              <label className="form-label fw-medium">
                                <i className="fas fa-user-circle me-1 text-primary"></i>
                                Username <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className={`form-control form-control-lg ${errors.username ? 'is-invalid' : ''}`}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="กรอก Username ของคุณ"
                                style={{
                                  borderRadius: '12px',
                                  border: '2px solid #e9ecef',
                                  transition: 'all 0.3s ease'
                                }}
                              />
                              {errors.username && (
                                <div className="invalid-feedback">
                                  <i className="fas fa-exclamation-circle me-1"></i>
                                  {errors.username}
                                </div>
                              )}
                            </div>

                            <div className="col-md-6">
                              <label className="form-label fw-medium">
                                <i className="fas fa-lock me-1 text-warning"></i>
                                รหัสผ่าน <span className="text-danger">*</span>
                              </label>
                              <input
                                type="password"
                                className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="กรอกรหัสผ่าน"
                                style={{
                                  borderRadius: '12px',
                                  border: '2px solid #e9ecef',
                                  transition: 'all 0.3s ease'
                                }}
                              />
                              {errors.password && (
                                <div className="invalid-feedback">
                                  <i className="fas fa-exclamation-circle me-1"></i>
                                  {errors.password}
                                </div>
                              )}
                            </div>

                            <div className="col-md-6">
                              <label className="form-label fw-medium">
                                <i className="fas fa-shield-alt me-1 text-success"></i>
                                ยืนยันรหัสผ่าน <span className="text-danger">*</span>
                              </label>
                              <input
                                type="password"
                                className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="ยืนยันรหัสผ่าน"
                                style={{
                                  borderRadius: '12px',
                                  border: '2px solid #e9ecef',
                                  transition: 'all 0.3s ease'
                                }}
                              />
                              {errors.confirmPassword && (
                                <div className="invalid-feedback">
                                  <i className="fas fa-exclamation-circle me-1"></i>
                                  {errors.confirmPassword}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="d-grid gap-3">
                          <button
                            type="button"
                            disabled={submitting}
                            onClick={handleSubmit}
                            className="btn btn-lg fw-bold py-3 position-relative overflow-hidden"
                            style={{
                              background: 'linear-gradient(45deg, #667eea, #764ba2)',
                              border: 'none',
                              borderRadius: '15px',
                              color: 'white',
                              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                              transition: 'all 0.3s ease',
                              transform: submitting ? 'scale(0.98)' : 'scale(1)'
                            }}
                            onMouseOver={(e) => {
                              if (!submitting) {
                                e.target.style.transform = 'translateY(-2px)'
                                e.target.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)'
                              }
                            }}
                            onMouseOut={(e) => {
                              if (!submitting) {
                                e.target.style.transform = 'translateY(0)'
                                e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)'
                              }
                            }}
                          >
                            {submitting ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                <i className="fas fa-clock me-2"></i>
                                กำลังลงทะเบียน...
                              </>
                            ) : (
                              <>
                                <i className="fas fa-user-plus me-2"></i>
                                สมัครสมาชิก
                                <i className="fas fa-arrow-right ms-2"></i>
                              </>
                            )}
                          </button>

                          <div className="text-center">
                            <small className="text-muted">
                              มีบัญชีแล้ว?
                              <a href="/login" className="text-decoration-none fw-medium ms-1" style={{ color: '#667eea' }}>
                                <i className="fas fa-sign-in-alt me-1"></i>
                                เข้าสู่ระบบ
                              </a>
                            </small>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            .text-purple { color: #6f42c1 !important; }
            .text-pink { color: #e83e8c !important; }
            .form-control:focus, .form-select:focus {
              border-color: #667eea !important;
              box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.25) !important;
            }
            .form-control:hover, .form-select:hover {
              border-color: #667eea !important;
            }
            
            /* Custom SweetAlert2 Styles */
            .swal-title {
              font-size: 1.8rem !important;
              font-weight: 700 !important;
            }
            .swal-content {
              font-size: 1.1rem !important;
            }
            .swal-confirm-btn {
              background: linear-gradient(45deg, #667eea, #764ba2) !important;
              border: none !important;
              border-radius: 12px !important;
              padding: 12px 24px !important;
              font-weight: 600 !important;
              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3) !important;
              transition: all 0.3s ease !important;
            }
            .swal-confirm-btn:hover {
              transform: translateY(-2px) !important;
              box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4) !important;
            }
            
            /* Custom SweetAlert2 popup styles */
            .swal2-popup {
              border-radius: 20px !important;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15) !important;
            }
            .swal2-icon {
              border-width: 5px !important;
            }
            .swal2-success-circular-line-left,
            .swal2-success-circular-line-right {
              background-color: #667eea !important;
            }
            .swal2-success-fix {
              background-color: #667eea !important;
            }
          `
        }} />
      </div>
    </>
  )
}