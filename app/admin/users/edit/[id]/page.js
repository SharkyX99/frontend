'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function EditUserPage({ params }) {
  const { id } = params
  const router = useRouter()

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

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

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true)
        const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`)
        if (!res.ok) throw new Error('Failed to fetch user data')
        const data = await res.json()
        setItems(data)
        const user = data[0] || {}

        setFirstname(user.firstname || '')
        setFullname(user.fullname || '')
        setLastname(user.lastname || '')
        setUsername(user.username || '')
        setPassword(user.password || '')
        setConfirmPassword(user.password || '')
        setAddress(user.address || '')
        setSex(user.sex || '')
        setBirthday(user.birthday || '')
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถโหลดข้อมูลผู้ใช้ได้',
          confirmButtonText: 'กลับไปหน้าหลัก'
        }).then(() => {
          router.push('/admin/users')
        })
      }
    }

    if (id) {
      getUser()
    }
  }, [id, router])

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setSubmitting(true)
      const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          id,
          firstname,
          fullname,
          lastname,
          username,
          password,
          address,
          sex,
          birthday,
        }),
      })

      const result = await res.json()

      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'สำเร็จ!',
          text: 'อัปเดตข้อมูลผู้ใช้เรียบร้อยแล้ว',
          showConfirmButton: false,
          timer: 2000
        })
        router.push('/admin/users')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: result.message || 'ไม่สามารถอัปเดตข้อมูลได้',
        })
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    Swal.fire({
      title: 'ยืนยันการยกเลิก?',
      text: 'ข้อมูลที่แก้ไขจะไม่ถูกบันทึก',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ยกเลิก',
      cancelButtonText: 'อยู่ต่อ'
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/admin/users')
      }
    })
  }

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{backgroundColor: '#f8f9fa'}}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="text-muted">กำลังโหลดข้อมูล...</h5>
        </div>
      </div>
    )
  }

  return (
    <div className="min-vh-100" style={{backgroundColor: '#f8f9fa'}}>
      {/* Header */}
      <div className="bg-gradient-primary text-white py-4 mb-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb text-white-50 mb-2">
                  <li className="breadcrumb-item">
                    <a href="/admin/users" className="text-white-50 text-decoration-none">
                      <i className="fas fa-users me-1"></i>
                      จัดการผู้ใช้
                    </a>
                  </li>
                  <li className="breadcrumb-item active text-white" aria-current="page">
                    แก้ไขข้อมูล
                  </li>
                </ol>
              </nav>
              <h1 className="mb-0">
                <i className="fas fa-user-edit me-3"></i>
                แก้ไขข้อมูลผู้ใช้
              </h1>
              <p className="mb-0 opacity-75">อัปเดตข้อมูลส่วนตัวของผู้ใช้</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Main Card */}
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-white border-bottom py-4">
                <div className="row align-items-center">
                  <div className="col">
                    <h5 className="mb-0 fw-bold text-primary">
                      <i className="fas fa-info-circle me-2"></i>
                      ข้อมูลส่วนตัว
                    </h5>
                    <small className="text-muted">กรอกข้อมูลให้ครบถ้วนและถูกต้อง</small>
                  </div>
                  <div className="col-auto">
                    <span className="badge bg-primary-subtle text-primary px-3 py-2">
                      User ID: {id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Personal Information Section */}
                    <div className="col-12 mb-4">
                      <h6 className="text-primary border-bottom pb-2 mb-3">
                        <i className="fas fa-user me-2"></i>
                        ข้อมูลส่วนตัว
                      </h6>
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-user-tag me-1"></i>
                        คำนำหน้าชื่อ <span className="text-danger">*</span>
                      </label>
                      <select
                        className={`form-select ${errors.firstname ? 'is-invalid' : ''}`}
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                      >
                        <option value="">เลือกคำนำหน้า</option>
                        <option value="นาย">นาย</option>
                        <option value="นาง">นาง</option>
                        <option value="นางสาว">นางสาว</option>
                      </select>
                      {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-user me-1"></i>
                        ชื่อ <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        placeholder="กรอกชื่อ"
                        required
                      />
                      {errors.fullname && <div className="invalid-feedback">{errors.fullname}</div>}
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-user me-1"></i>
                        นามสกุล <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="กรอกนามสกุล"
                        required
                      />
                      {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-venus-mars me-1"></i>
                        เพศ <span className="text-danger">*</span>
                      </label>
                      <select
                        className={`form-select ${errors.sex ? 'is-invalid' : ''}`}
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                        required
                      >
                        <option value="">เลือกเพศ</option>
                        <option value="ชาย">ชาย</option>
                        <option value="หญิง">หญิง</option>
                        <option value="อื่นๆ">อื่นๆ</option>
                      </select>
                      {errors.sex && <div className="invalid-feedback">{errors.sex}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-birthday-cake me-1"></i>
                        วันเกิด <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className={`form-control ${errors.birthday ? 'is-invalid' : ''}`}
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                      />
                      {errors.birthday && <div className="invalid-feedback">{errors.birthday}</div>}
                    </div>

                    <div className="col-12 mb-4">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-map-marker-alt me-1"></i>
                        ที่อยู่ <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="กรอกที่อยู่ปัจจุบัน"
                        required
                      />
                      {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>

                    {/* Account Information Section */}
                    <div className="col-12 mb-4">
                      <h6 className="text-primary border-bottom pb-2 mb-3">
                        <i className="fas fa-key me-2"></i>
                        ข้อมูลบัญชีผู้ใช้
                      </h6>
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-user-circle me-1"></i>
                        Username <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="กรอก Username"
                        required
                      />
                      {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-lock me-1"></i>
                        รหัสผ่าน <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="กรอกรหัสผ่าน"
                        required
                      />
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                      <div className="form-text">รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร</div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-lock me-1"></i>
                        ยืนยันรหัสผ่าน <span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="กรอกรหัสผ่านอีกครั้ง"
                        required
                      />
                      {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>
                  </div>
                </form>
              </div>

              <div className="card-footer bg-light border-top py-4">
                <div className="row">
                  <div className="col-md-6">
                    <button 
                      type="button"
                      className="btn btn-outline-secondary btn-lg w-100"
                      onClick={handleCancel}
                      disabled={submitting}
                    >
                      <i className="fas fa-times me-2"></i>
                      ยกเลิก
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button 
                      type="submit"
                      className="btn btn-primary btn-lg w-100"
                      onClick={handleSubmit}
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          กำลังบันทึก...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i>
                          บันทึกข้อมูล
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}