'use client';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Page() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null); // Track which item is being deleted

  

  useEffect(() => {
    async function getUsers() {
      try {
        setError(null);
        const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    }

    getUsers();
    const interval = setInterval(getUsers, 5000); // Auto-refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);
  
  const handleDelete = async (id, name) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: 'ยืนยันการลบ',
        html: `คุณแน่ใจหรือไม่ที่จะลบผู้ใช้<br><strong class="text-danger">${name}</strong>?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: '<i class="fas fa-trash me-1"></i> ลบ',
        cancelButtonText: '<i class="fas fa-times me-1"></i> ยกเลิก',
        reverseButtons: true,
        focusCancel: true,
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-secondary'
        },
        buttonsStyling: false
      });

      if (result.isConfirmed) {
        setDeleting(id); // Set loading state for this specific item
        
        // Perform delete request
        const response = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const responseData = await response.json();

        if (response.ok) {
          // Remove item from state immediately for better UX
          setItems(prevItems => prevItems.filter(item => item.id !== id));
          
          // Show success message
          await Swal.fire({
            icon: 'success',
            title: 'ลบสำเร็จ!',
            text: `ลบข้อมูล ${name} เรียบร้อยแล้ว`,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
          });
        } else {
          throw new Error(responseData.message || 'Failed to delete user');
        }
      }
    } catch (error) {
      console.error('Delete error:', error);
      
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: error.message || 'ไม่สามารถลบข้อมูลได้',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#dc3545'
      });
    } finally {
      setDeleting(null); // Reset loading state
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" style={{width: '3rem', height: '3rem'}}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="text-muted">Loading users...</h5>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center" role="alert">
          <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
          <h4>Error Loading Data</h4>
          <p>{error}</p>
          <button 
            className="btn btn-outline-danger"
            onClick={() => window.location.reload()}
          >
            <i className="fas fa-sync-alt me-1"></i>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{backgroundColor: '#f8f9fa'}}>
      {/* Header Section */}
      <div className="bg-primary text-white py-4 mb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <h1 className="mb-1">
                <i className="fas fa-users me-3"></i>
                User Management
              </h1>
              <p className="mb-0 opacity-75">Manage your system users</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Stats Card */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="text-primary mb-2">
                  <i className="fas fa-users fa-2x"></i>
                </div>
                <h3 className="fw-bold mb-1">{items.length}</h3>
                <p className="text-muted mb-0">Total Users</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="text-success mb-2">
                  <i className="fas fa-user-check fa-2x"></i>
                </div>
                <h3 className="fw-bold mb-1">{items.filter(item => item.status === 'active').length || items.length}</h3>
                <p className="text-muted mb-0">Active Users</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="text-info mb-2">
                  <i className="fas fa-clock fa-2x"></i>
                </div>
                <h3 className="fw-bold mb-1">
                  <span className="badge bg-info">Live</span>
                </h3>
                <p className="text-muted mb-0">Auto Refresh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-bottom-0 py-3">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h5 className="mb-0 fw-bold">
                  <i className="fas fa-list me-2 text-primary"></i>
                  Users List
                </h5>
              </div>
              <div className="col-md-6 text-md-end">
                <div className="d-flex justify-content-md-end align-items-center">
                  <small className="text-muted me-3">
                    <i className="fas fa-sync-alt me-1"></i>
                    Auto-refresh every 5 seconds
                  </small>
                  <span className="badge bg-primary">{items.length} users</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body p-0">
            {items.length === 0 ? (
              <div className="text-center py-5">
                <i className="fas fa-users fa-3x text-muted mb-3"></i>
                <h5 className="text-muted">No users found</h5>
                <p className="text-muted">No users available in the system</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="text-center py-3" style={{width: '80px'}}>
                        <i className="fas fa-hashtag"></i>
                      </th>
                      <th className="py-3">
                        <i className="fas fa-user me-2"></i>
                        First Name
                      </th>
                      <th className="py-3">
                        <i className="fas fa-id-card me-2"></i>
                        Full Name
                      </th>
                      <th className="py-3">
                        <i className="fas fa-user-tag me-2"></i>
                        Last Name
                      </th>
                      <th className="text-center py-3" style={{width: '200px'}}>
                        <i className="fas fa-cogs me-2"></i>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.id} className="align-middle">
                        <td className="text-center">
                          <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                               style={{width: '35px', height: '35px', fontSize: '14px'}}>
                            {item.id}
                          </div>
                        </td>
                        <td className="fw-semibold">{item.firstname || '-'}</td>
                        <td>{item.fullname || '-'}</td>
                        <td>{item.lastname || '-'}</td>
                        <td className="text-center">
                          <div className="btn-group" role="group">
                            <Link 
                              href={`/admin/users/edit/${item.id}`} 
                              className="btn btn-outline-warning btn-sm"
                              title="Edit User"
                            >
                              <i className="fas fa-edit"></i>
                              <span className="d-none d-md-inline ms-1">Edit</span>
                            </Link>
                            <button 
                              className="btn btn-outline-danger btn-sm" 
                              type="button"
                              title="Delete User"
                              onClick={() => handleDelete(item.id, item.firstname || item.fullname)}
                              disabled={deleting === item.id}
                            >
                              {deleting === item.id ? (
                                <>
                                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                  <span className="d-none d-md-inline ms-1">Deleting...</span>
                                </>
                              ) : (
                                <>
                                  <i className="fas fa-trash"></i>
                                  <span className="d-none d-md-inline ms-1">Delete</span>
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="card-footer bg-light border-top-0 py-3">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <small className="text-muted">
                    Showing {items.length} user{items.length !== 1 ? 's' : ''}
                  </small>
                </div>
                <div className="col-md-6 text-md-end">
                  <small className="text-muted">
                    Last updated: {new Date().toLocaleTimeString('th-TH')}
                  </small>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}